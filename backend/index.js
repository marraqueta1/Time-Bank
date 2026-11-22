const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

// ==========================================
// SEGURIDAD: CORS RESTRINGIDO Y RATE LIMIT
// ==========================================
const origenesPermitidos = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:8100',
    'http://localhost:3000'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origenesPermitidos.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origen no permitido por CORS'));
    },
    credentials: true
}));

app.use(express.json());

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Demasiados intentos de inicio de sesión. Intenta nuevamente en 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false
});

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_timebank_2026';

// ==========================================
// ESQUEMAS DE VALIDACIÓN (ZOD)
// ==========================================
const registroSchema = z.object({
    nombre: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(80, 'El nombre es demasiado largo'),
    correo: z.string().trim().toLowerCase().email('El formato del correo no es válido'),
    contrasena: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').max(100, 'La contraseña es demasiado larga')
});

const loginSchema = z.object({
    correo: z.string().trim().toLowerCase().email('El formato del correo no es válido'),
    contrasena: z.string().min(1, 'La contraseña es obligatoria')
});

const ofertaCrearSchema = z.object({
    titulo: z.string().trim().min(3, 'El título debe tener al menos 3 caracteres').max(100, 'Máximo 100 caracteres'),
    descripcion: z.string().trim().min(5, 'La descripción debe tener al menos 5 caracteres').max(500, 'Máximo 500 caracteres'),
    categoria: z.string().trim().min(2, 'La categoría es obligatoria').max(50),
    puntos: z.coerce.number().int('Los puntos deben ser un número entero').min(1, 'Mínimo 1 punto').max(1000, 'Máximo 1000 puntos'),
    tipo: z.enum(['ofrezco', 'busco', '1-a-1', 'sala'], { errorMap: () => ({ message: 'Tipo de oferta inválido' }) }),
    cupoMaximo: z.coerce.number().int('El cupo debe ser un número entero').min(2, 'El cupo mínimo es 2 personas').max(100, 'Máximo 100 personas').optional().nullable()
});

const ofertaEditarSchema = ofertaCrearSchema.partial();

const perfilEditarSchema = z.object({
    nombre: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(80).optional(),
    descripcion: z.string().trim().max(300, 'La descripción no puede superar los 300 caracteres').optional().or(z.literal('')),
    fotoUrl: z.string().trim().url('fotoUrl debe ser una URL válida (ej: https://...)').optional().or(z.literal(''))
});

const propuestaSchema = z.object({
    ofertaId: z.coerce.number().int().positive('ID de oferta inválido'),
    mensaje: z.string().trim().max(300).optional()
});

const mensajeSchema = z.object({
    destinatarioId: z.coerce.number().int().positive('ID de destinatario inválido'),
    contenido: z.string().trim().min(1, 'El mensaje no puede estar vacío').max(500, 'Máximo 500 caracteres')
});

const validar = (schema, data, res) => {
    const resultado = schema.safeParse(data);
    if (!resultado.success) {
        const errores = resultado.error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
        res.status(400).json({ error: 'Datos inválidos', detalles: errores });
        return null;
    }
    return resultado.data;
};

app.get('/', (req, res) => {
    res.json({ mensaje: '¡API de TimeBank funcionando correctamente!' });
});

// ==========================================
// RUTAS DE AUTENTICACIÓN Y REGISTRO
// ==========================================
app.post('/api/usuarios', async (req, res) => {
    try {
        const datos = validar(registroSchema, req.body, res);
        if (!datos) return;

        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(datos.contrasena, salt);

        await prisma.usuario.create({
            data: {
                nombre: datos.nombre,
                correo: datos.correo,
                contrasena: contrasenaEncriptada
            }
        });

        res.status(201).json({ mensaje: 'Usuario creado con éxito' });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Este correo ya está registrado.' });
        }
        res.status(500).json({ error: 'Error interno al crear el usuario.' });
    }
});

app.post('/api/usuarios/login', loginLimiter, async (req, res) => {
    try {
        const datos = validar(loginSchema, req.body, res);
        if (!datos) return;

        const usuario = await prisma.usuario.findUnique({ where: { correo: datos.correo } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const passwordValida = await bcrypt.compare(datos.contrasena, usuario.contrasena);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            rol: usuario.rol,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                saldo: usuario.saldo
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// ==========================================
// MIDDLEWARES DE SEGURIDAD Y ROLES
// ==========================================
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
    }

    try {
        const verificado = jwt.verify(token, JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};

// ==========================================
// RUTAS PARA PUBLICACIONES (OFERTAS)
// ==========================================
app.post('/api/ofertas', verificarToken, async (req, res) => {
    try {
        const datos = validar(ofertaCrearSchema, req.body, res);
        if (!datos) return;

        const nuevaOferta = await prisma.oferta.create({
            data: {
                titulo: datos.titulo,
                descripcion: datos.descripcion,
                categoria: datos.categoria,
                puntos: datos.puntos,
                tipo: datos.tipo,
                cupoMaximo: datos.tipo === 'sala' ? (datos.cupoMaximo || 10) : null,
                creadorId: req.usuario.id
            }
        });

        res.status(201).json({ mensaje: 'Publicación creada con éxito', oferta: nuevaOferta });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la publicación en la base de datos' });
    }
});

app.put('/api/ofertas/:id', verificarToken, async (req, res) => {
    try {
        const ofertaId = parseInt(req.params.id);
        if (isNaN(ofertaId)) return res.status(400).json({ error: 'ID de oferta inválido' });

        const datos = validar(ofertaEditarSchema, req.body, res);
        if (!datos) return;

        const oferta = await prisma.oferta.findUnique({ where: { id: ofertaId } });
        if (!oferta) return res.status(404).json({ error: 'Publicación no encontrada' });

        if (oferta.creadorId !== req.usuario.id) {
            return res.status(403).json({ error: 'No tienes permiso para editar esta publicación' });
        }

        const ofertaActualizada = await prisma.oferta.update({
            where: { id: ofertaId },
            data: datos
        });

        res.json({ mensaje: 'Publicación actualizada', oferta: ofertaActualizada });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
});

app.delete('/api/ofertas/:id', verificarToken, async (req, res) => {
    try {
        const ofertaId = parseInt(req.params.id);
        if (isNaN(ofertaId)) return res.status(400).json({ error: 'ID de oferta inválido' });

        const oferta = await prisma.oferta.findUnique({ where: { id: ofertaId } });
        const usuarioActual = await prisma.usuario.findUnique({ where: { id: req.usuario.id } });

        if (!oferta) return res.status(404).json({ error: 'Publicación no encontrada' });

        if (oferta.creadorId !== req.usuario.id && usuarioActual?.rol !== 'admin') {
            return res.status(403).json({ error: 'No tienes permiso para borrar esta publicación' });
        }

        await prisma.oferta.delete({ where: { id: ofertaId } });
        res.json({ mensaje: 'Publicación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
});

app.get('/api/ofertas', verificarToken, async (req, res) => {
    try {
        const [ofertas, conteos] = await Promise.all([
            prisma.oferta.findMany({
                orderBy: { fechaCreacion: 'desc' },
                include: {
                    creador: {
                        select: { id: true, nombre: true }
                    }
                }
            }),
            prisma.propuesta.groupBy({
                by: ['ofertaId'],
                where: { estado: { notIn: ['cancelada', 'rechazada'] } },
                _count: { id: true }
            })
        ]);

        const mapaInscritos = new Map(conteos.map(c => [c.ofertaId, c._count.id]));
        const resultado = ofertas.map(oferta => ({
            ...oferta,
            inscritos: mapaInscritos.get(oferta.id) || 0
        }));

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
});

// ==========================================
// RUTAS PARA EL PERFIL DE USUARIO
// ==========================================
app.get('/api/usuarios/perfil', verificarToken, async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: req.usuario.id },
            select: {
                id: true,
                nombre: true,
                correo: true,
                saldo: true,
                rol: true,
                descripcion: true,
                fotoUrl: true
            }
        });

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
});

app.put('/api/usuarios/perfil', verificarToken, async (req, res) => {
    try {
        const datos = validar(perfilEditarSchema, req.body, res);
        if (!datos) return;

        const usuarioActualizado = await prisma.usuario.update({
            where: { id: req.usuario.id },
            data: datos,
            select: { id: true, nombre: true, correo: true, saldo: true, descripcion: true, fotoUrl: true }
        });

        res.json({ mensaje: 'Perfil actualizado con éxito', usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
});

// ==========================================
// RUTAS PARA WALLET (SALDO Y TRANSACCIONES)
// ==========================================
app.get('/api/wallet', verificarToken, async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: req.usuario.id },
            select: { saldo: true }
        });
        const transacciones = await prisma.transaccion.findMany({
            where: { usuarioId: req.usuario.id },
            orderBy: { fechaCreacion: 'desc' }
        });
        res.json({ saldo: usuario?.saldo ?? 0, transacciones });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de la Wallet' });
    }
});

app.post('/api/wallet/movimiento', verificarToken, async (req, res) => {
    try {
        const { tipo, monto, descripcion } = req.body;
        const cantidad = parseInt(monto);
        if (!['ingreso', 'egreso'].includes(tipo) || isNaN(cantidad) || cantidad <= 0 || !descripcion) {
            return res.status(400).json({ error: 'Datos de movimiento inválidos' });
        }

        const usuario = await prisma.usuario.findUnique({ where: { id: req.usuario.id } });
        if (tipo === 'egreso' && usuario.saldo < cantidad) {
            return res.status(400).json({ error: 'Saldo insuficiente' });
        }

        const [usuarioActualizado, transaccion] = await prisma.$transaction([
            prisma.usuario.update({
                where: { id: req.usuario.id },
                data: { saldo: tipo === 'ingreso' ? { increment: cantidad } : { decrement: cantidad } },
                select: { saldo: true }
            }),
            prisma.transaccion.create({
                data: { usuarioId: req.usuario.id, tipo, monto: cantidad, descripcion }
            })
        ]);

        res.status(201).json({ saldo: usuarioActualizado.saldo, transaccion });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el movimiento' });
    }
});

// ==========================================
// RUTAS PARA PROPUESTAS / INSCRIPCIONES
// ==========================================
app.get('/api/propuestas', verificarToken, async (req, res) => {
    try {
        const propuestas = await prisma.propuesta.findMany({
            where: {
                OR: [
                    { solicitanteId: req.usuario.id },
                    { oferta: { creadorId: req.usuario.id } }
                ]
            },
            include: {
                oferta: { include: { creador: { select: { id: true, nombre: true } } } },
                solicitante: { select: { id: true, nombre: true } }
            },
            orderBy: { fechaCreacion: 'desc' }
        });
        res.json(propuestas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las propuestas' });
    }
});

app.post('/api/propuestas', verificarToken, async (req, res) => {
    try {
        const datos = validar(propuestaSchema, req.body, res);
        if (!datos) return;

        const oferta = await prisma.oferta.findUnique({ where: { id: datos.ofertaId } });
        if (!oferta) return res.status(404).json({ error: 'Oferta no encontrada' });
        if (oferta.creadorId === req.usuario.id) {
            return res.status(400).json({ error: 'No puedes postular a tu propia oferta' });
        }

        const yaExiste = await prisma.propuesta.findFirst({
            where: {
                ofertaId: datos.ofertaId,
                solicitanteId: req.usuario.id,
                estado: { notIn: ['cancelada', 'rechazada'] }
            }
        });
        if (yaExiste) {
            return res.status(409).json({ error: 'Ya tienes una inscripción o propuesta activa en esta publicación.' });
        }

        if (oferta.tipo === 'sala' && oferta.cupoMaximo) {
            const inscritosActuales = await prisma.propuesta.count({
                where: {
                    ofertaId: oferta.id,
                    estado: { notIn: ['cancelada', 'rechazada'] }
                }
            });
            if (inscritosActuales >= oferta.cupoMaximo) {
                return res.status(400).json({ error: 'Esta sala ya alcanzó su cupo máximo.' });
            }
        }

        const nueva = await prisma.propuesta.create({
            data: {
                ofertaId: datos.ofertaId,
                solicitanteId: req.usuario.id,
                mensaje: datos.mensaje
            }
        });
        res.status(201).json({ mensaje: 'Propuesta enviada', propuesta: nueva });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la propuesta' });
    }
});

app.patch('/api/propuestas/:id', verificarToken, async (req, res) => {
    try {
        const propuestaId = parseInt(req.params.id);
        const { estado } = req.body;
        if (!['aceptada', 'rechazada', 'completada', 'cancelada'].includes(estado)) {
            return res.status(400).json({ error: 'Estado inválido' });
        }

        const propuesta = await prisma.propuesta.findUnique({
            where: { id: propuestaId },
            include: { oferta: true }
        });
        if (!propuesta) return res.status(404).json({ error: 'Propuesta no encontrada' });
        if (propuesta.oferta.creadorId !== req.usuario.id && propuesta.solicitanteId !== req.usuario.id) {
            return res.status(403).json({ error: 'No tienes permiso para modificar esta propuesta' });
        }

        if (estado === 'completada' && propuesta.estado !== 'completada') {
            const puntos = propuesta.oferta.puntos;
            await prisma.$transaction([
                prisma.usuario.update({ where: { id: propuesta.solicitanteId }, data: { saldo: { decrement: puntos } } }),
                prisma.usuario.update({ where: { id: propuesta.oferta.creadorId }, data: { saldo: { increment: puntos } } }),
                prisma.transaccion.create({
                    data: { usuarioId: propuesta.solicitanteId, tipo: 'egreso', monto: puntos, descripcion: `Pago por: ${propuesta.oferta.titulo}` }
                }),
                prisma.transaccion.create({
                    data: { usuarioId: propuesta.oferta.creadorId, tipo: 'ingreso', monto: puntos, descripcion: `Cobro por: ${propuesta.oferta.titulo}` }
                }),
                prisma.propuesta.update({ where: { id: propuestaId }, data: { estado } })
            ]);
            return res.json({ mensaje: 'Propuesta completada y puntos transferidos' });
        }

        const actualizada = await prisma.propuesta.update({
            where: { id: propuestaId },
            data: { estado }
        });
        res.json({ mensaje: 'Estado actualizado', propuesta: actualizada });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la propuesta' });
    }
});

// ==========================================
// RUTAS PARA CHATS
// ==========================================
app.get('/api/chats', verificarToken, async (req, res) => {
    try {
        const mensajes = await prisma.mensaje.findMany({
            where: {
                OR: [
                    { remitenteId: req.usuario.id },
                    { destinatarioId: req.usuario.id }
                ]
            },
            include: {
                remitente: { select: { id: true, nombre: true, fotoUrl: true } },
                destinatario: { select: { id: true, nombre: true, fotoUrl: true } }
            },
            orderBy: { fechaCreacion: 'asc' }
        });
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
});

app.post('/api/chats', verificarToken, async (req, res) => {
    try {
        const datos = validar(mensajeSchema, req.body, res);
        if (!datos) return;

        const nuevoMensaje = await prisma.mensaje.create({
            data: {
                remitenteId: req.usuario.id,
                destinatarioId: datos.destinatarioId,
                contenido: datos.contenido
            },
            include: {
                remitente: { select: { id: true, nombre: true } },
                destinatario: { select: { id: true, nombre: true } }
            }
        });
        res.status(201).json(nuevoMensaje);
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

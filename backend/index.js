
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_timebank_2026';

app.get('/', (req, res) => {
    res.json({ mensaje: '¡API de TimeBank funcionando correctamente!' });
});


app.post('/api/usuarios', async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        const nuevoUsuario = await prisma.usuario.create({
            data: { 
                nombre, 
                correo, 
                contrasena: contrasenaEncriptada 
            }
        });
        
        res.status(201).json({ mensaje: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el usuario. El correo podría ya estar registrado.' });
    }
});

app.post('/api/usuarios/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const usuario = await prisma.usuario.findUnique({ where: { correo } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({ 
            mensaje: 'Inicio de sesión exitoso', 
            token,
            rol: usuario.rol
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



// ... (Aquí irían los GET, PUT y DELETE para usuarios, servicios y transacciones, siguiendo la misma estructura de manejo de errores y validación de JWT)

// ==========================================
// MIDDLEWARE DE SEGURIDAD (Verifica el Token)
// ==========================================
const verificarToken = (req, res, next) => {
    // El token llega en el formato: "Bearer eyJhbGci..."
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
    }

    try {
        const verificado = jwt.verify(token, JWT_SECRET);
        req.usuario = verificado; // Guardamos el ID del usuario en la petición
        next(); // El token es válido, continúa a la ruta
    } catch (error) {
        res.status(400).json({ error: 'Token inválido o expirado.' });
    }
};

// ==========================================
// RUTAS PARA PUBLICACIONES (OFERTAS)
// ==========================================

// 1. CREAR una nueva publicación
app.post('/api/ofertas', verificarToken, async (req, res) => {
    try {
        const { titulo, descripcion, categoria, puntos, tipo } = req.body;
        
        const nuevaOferta = await prisma.oferta.create({
            data: {
                titulo,
                descripcion,
                categoria,
                puntos: parseInt(puntos),
                tipo,
                creadorId: req.usuario.id // Sacamos el ID directamente del token de seguridad
            }
        });
        
        res.status(201).json({ mensaje: 'Publicación creada con éxito', oferta: nuevaOferta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la publicación en la base de datos' });
    }
});

// 2. MODIFICAR una publicación existente
app.put('/api/ofertas/:id', verificarToken, async (req, res) => {
    try {
        const ofertaId = parseInt(req.params.id);
        const { titulo, descripcion, categoria, puntos, tipo } = req.body;

        // Primero verificamos que la oferta exista y que el usuario sea el dueño
        const oferta = await prisma.oferta.findUnique({ where: { id: ofertaId } });
        
        if (!oferta) return res.status(404).json({ error: 'Publicación no encontrada' });
        if (oferta.creadorId !== req.usuario.id) {
            return res.status(403).json({ error: 'No tienes permiso para editar esta publicación' });
        }

        const ofertaActualizada = await prisma.oferta.update({
            where: { id: ofertaId },
            data: { titulo, descripcion, categoria, puntos: parseInt(puntos), tipo }
        });

        res.json({ mensaje: 'Publicación actualizada', oferta: ofertaActualizada });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
});

// 3. ELIMINAR una publicación
app.delete('/api/ofertas/:id', verificarToken, async (req, res) => {
    try {
        const ofertaId = parseInt(req.params.id);

        // Buscamos la oferta y los datos del usuario que intenta borrar
        const oferta = await prisma.oferta.findUnique({ where: { id: ofertaId } });
        const usuarioActual = await prisma.usuario.findUnique({ where: { id: req.usuario.id } });
        
        if (!oferta) return res.status(404).json({ error: 'Publicación no encontrada' });

        // La regla de oro: Solo pasa si es el creador O si tiene rol 'admin'
        if (oferta.creadorId !== req.usuario.id && usuarioActual.rol !== 'admin') {
            return res.status(403).json({ error: 'No tienes permiso de administrador para borrar esto' });
        }

        await prisma.oferta.delete({ where: { id: ofertaId } });
        res.json({ mensaje: 'Publicación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
});

// 4. LEER todas las publicaciones (Para el Feed/Inicio)
app.get('/api/ofertas', verificarToken, async (req, res) => {
    try {
        const ofertas = await prisma.oferta.findMany({
            orderBy: { fechaCreacion: 'desc' }, // Mostramos las más nuevas primero
            include: {
                creador: {
                    select: { nombre: true } // Traemos el nombre de la persona que lo creó
                }
            }
        });
        res.json(ofertas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
});


// ==========================================
// RUTAS PARA EL PERFIL DE USUARIO
// ==========================================

// 1. OBTENER los datos del perfil del usuario logueado
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
                // No seleccionamos la contraseña por seguridad
            }
        });
        
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
});

// 2. ACTUALIZAR el perfil (Nombre, Descripción y Foto)
app.put('/api/usuarios/perfil', verificarToken, async (req, res) => {
    try {
        const { nombre, descripcion, fotoUrl } = req.body;

        const usuarioActualizado = await prisma.usuario.update({
            where: { id: req.usuario.id },
            data: { 
                nombre, 
                descripcion, 
                fotoUrl 
            },
            select: { id: true, nombre: true, descripcion: true, fotoUrl: true } // Devolvemos solo lo actualizado
        });

        res.json({ mensaje: 'Perfil actualizado con éxito', usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/actividades
router.post('/', async (req, res, next) => {
  try {
    const { nombre, descripcion, cupo_maximo, horario, id_centro } = req.body;
    const result = await pool.query(
      `INSERT INTO actividad (nombre, descripcion, cupo_maximo, horario, id_centro)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion, cupo_maximo, horario, id_centro]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/actividades/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM actividad WHERE id_actividad = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    res.json({ message: 'Actividad eliminada', actividad: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

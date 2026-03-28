const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/reservas
router.post('/', async (req, res, next) => {
  try {
    const { id_cliente, id_actividad, fecha } = req.body;
    const result = await pool.query(
      `INSERT INTO reserva (id_cliente, id_actividad, fecha)
       VALUES ($1, $2, $3) RETURNING *`,
      [id_cliente, id_actividad, fecha]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/reservas/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM reserva WHERE id_reserva = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.json({ message: 'Reserva eliminada', reserva: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

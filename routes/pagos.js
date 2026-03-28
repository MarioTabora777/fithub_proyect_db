const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/pagos
router.post('/', async (req, res, next) => {
  try {
    const { id_reserva, monto, metodo_pago, fecha_pago } = req.body;
    const result = await pool.query(
      `INSERT INTO pago (id_reserva, monto, metodo_pago, fecha_pago)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_reserva, monto, metodo_pago, fecha_pago || new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/pagos/:id_reserva/:num_pago
router.delete('/:id_reserva/:num_pago', async (req, res, next) => {
  try {
    const { id_reserva, num_pago } = req.params;
    const result = await pool.query(
      'DELETE FROM pago WHERE id_reserva = $1 AND num_pago = $2 RETURNING *',
      [id_reserva, num_pago]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }

    res.json({ message: 'Pago eliminado', pago: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

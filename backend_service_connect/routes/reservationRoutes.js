const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.post('/', reservationController.createReservation);
router.delete('/:reservationId', reservationController.deleteReservation);
router.get('/user/:userId', reservationController.findReservationsByUserId);

module.exports = router;

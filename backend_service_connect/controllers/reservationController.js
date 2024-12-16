const reservationService = require('../services/reservationService');

const createReservation = async (req, res) => {
  try {
    const { senderId, receiverId, date } = req.body;

    const reservation = await reservationService.createReservation(senderId, receiverId, date);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const response = await reservationService.deleteReservation(reservationId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findReservationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const reservations = await reservationService.findReservationsByUserId(userId);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  deleteReservation,
  findReservationsByUserId,
};

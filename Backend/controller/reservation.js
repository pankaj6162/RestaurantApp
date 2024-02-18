import ErrorHandler from '../error/error.js';
import { Reservation } from '../models/reservationSchema.js';

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, time, date } = req.body;
  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler('Please fill out the entire reservation form', 400));
  }
  try {
    // Create a new reservation document using Reservation.create()
    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      time,
      date
    });
    res.status(200).json({
      success: true,
      message: 'Reservation sent successfully!',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // If validation error occurs, extract error messages and return
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    // If other error occurs, pass it to the global error handler
    return next(error);
  }
};

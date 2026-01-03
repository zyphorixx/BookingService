const { BookingRepository } = require('../repository');
const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { StatusCodes } = require('http-status-codes');
const { ServiceError } = require('../utils/error/index');

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    let booking;
    try {
      // 1️⃣ Fetch flight
      const flightId = data.flightId;
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;

      // 2️⃣ Seat validation
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          'Insufficient seats available',
          StatusCodes.BAD_REQUEST
        );
      }

      // 3️⃣ Cost calculation
      const totalCost = flightData.price * data.noOfSeats;

      // 4️⃣ Create booking (PENDING)
      booking = await this.bookingRepository.create({
        ...data,
        totalCost,
        status: 'PENDING'
      });

      // 5️⃣ Reduce totalSeats in Flight Service
      const updateFlightRequestURL =`${FLIGHT_SERVICE_PATH}/flights/${booking.flightId}`;

      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats
      });

      // 6️⃣ Update booking status → BOOKED
      const finalBooking = await this.bookingRepository.update(booking.id,{ status: 'BOOKED' });
      return finalBooking;
    } 
    catch (error) {
      // Rollback booking if seat update fails
      if (booking) {
        await this.bookingRepository.destroy(booking.id);
      }

      throw new ServiceError(
        'Failed to create booking',
        error?.response?.status || StatusCodes.INTERNAL_SERVER_ERROR,
        error?.response?.data?.explanation || error.message
      );
    }
  }
}

module.exports = BookingService;
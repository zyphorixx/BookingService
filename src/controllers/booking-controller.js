const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services/index');

const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);

        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: 'Successfully created booking',
            err: {}
        });
    } 
    catch (error) {
        console.log("ACTUAL ERROR >>>", error);

        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation || error
        });
    }
}

module.exports = {
    create
};
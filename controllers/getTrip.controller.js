const Trip = require('../models/Trip')


const getAvailableTrips = async(req,res)=>{
    try {
        const trips = await Trip.find({status: "loading"})
        .populate('bus') // Because I referenced the bus model, the populate keyword fetches me things from that collection
        .populate('route')// same thing for the route model


        const formattedTrips = trips.map(trip=>{
            return {
                id: trip._id,
                busNumber: trip.bus.busNumber,
                routeName: trip.route.name,
                from: trip.route.fromStation,
                to: trip.route.toStation,
                price: trip.price,
                departureTime: trip.departureTime,
                seats: trip.bookedSeats,
                capacity: trip.bus.capacity,
                status: trip.status
            }
        })

        res.status(200).json({sucess: true, trips: formattedTrips})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error"})
        
    }
}


module.exports = getAvailableTrips
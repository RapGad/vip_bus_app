const Bus = require('../models/Bus')
const Station = require('../models/Station')
const Route = require('../models/Route')



const addBus = async(req,res)=>{
    try {
        const {busNumber, capacity,} = req.body

        if(!busNumber || !capacity ) return res.status(400).json({message: "All fields are required"})

        const findBus = await Bus.findOne({busNumber})
        if(findBus) return res.status(400).json({message: "Bus already exist in the system"})

        const newBus = new Bus({
            busNumber, capacity
        })

        await newBus.save()

        return res.status(200).json({success: true, message: "Bus added successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Add bus error"})
    }
}


const addStation = async(req,res)=>{
    try {
        const {name} = req.body

        if(!name) return res.status(400).json({message: "All fields are required"})
        
        const newStation = new Station({
            name
        })

        await newStation.save()

        return res.status(200).json({success: true, message: "Station added successfully"})

    } catch (error) {
        
    }
}

const addRoute = async(req,res)=>{
    try {
        const { from, to,price } = req.body

        const newRoute = new Route({
            from,
            to,
            price
        })
        
        await newRoute.save()

        return res.status(200).json({success: true, message: "Route added successfully"})
        
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Add route error"}) 
        
    }
}


const getRoute = async(req,res)=>{
    try {
        const routes = await Route.find().populate('from', 'name').populate('to', 'name')
        return res.status(200).json({success: true, routes})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Get route error"})
        
    }
}


module.exports = {addBus,addStation,addRoute,getRoute}
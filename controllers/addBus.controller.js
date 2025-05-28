const Bus = require('../models/Bus')



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


module.exports = addBus
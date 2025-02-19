const Doctor = require('../models/Doctor')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getdoctor = asyncHandler(async(req,res)=>{
    const doctors = await Doctor.find().lean()
    if (!doctors?.length){
        return res.status(400).json({message:"some errro occured"})
    }
    res.json(doctors)
})

const createdoctor = asyncHandler(async(req,res)=>{
        const {name,password,specialization} = req.body
        if(!password || !name || !specialization){
            return res.status(400).json({message:"creating error!"})
        }
        const duplicate = await Doctor.findOne({name}).lean().exec()
        if (duplicate){
            return res.status(409).json({message:"duplicate error!"})
        }

        const hashedPwd = await bcrypt.hash(password,10)
        const doctorObj = {name,"password":hashedPwd,specialization}
        const doctor = await Doctor.create(doctorObj)
        if (doctor){
            return res.status(200).json({message:`new doctor ${name} created!`});
        }
        else{
            return res.status(409).json({message:"invalid data error!"})
        }

    
})


const updatedoctor = asyncHandler(async(req,res)=>{
    
    const {id, name, specialization, password} = req.body
    if (!id || !name || !specialization){
        return res.status(400).json({message:"update error all fields needed!"})
    }

    const doctor = await  Doctor.findById(id).exec()
    if (!doctor){
        return res.status(400).json({message:"doctor not found error!"})
    }
    const duplicate = await Doctor.findOne({name}).lean().exec()
    if (duplicate && duplicate._id.toString()!==id ){
        return res.status(409).json({message:"duplicate doctor name!"})
    }
    doctor.name=name
    doctor.specialization=specialization
    if (password){
        doctor.password = await bcrypt.hash(password,10)
    }

    const updatedDoc =  await doctor.save()
    return res.json({message:`doctor ${updatedDoc.name} updated`})
    

})

const deletedoctor = asyncHandler(async(req,res)=>{
        const {id} = res.body()
        if (!id){
            return res.status(400).json({message:"doctor id not given!"})            
        }
        const doctor = await Doctor.findById(id).exec()
        
        if (!doctor){
            return res.status(400).json({message:"doctor not found error!"})
        }
        const deleted = await Doctor.deleteOne(doctor);
        return res.json({message:`doctor ${deleted.name} deleted!`})
})

module.exports={
    getdoctor,
    createdoctor,
    updatedoctor,
    deletedoctor
}
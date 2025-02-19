const express = require('express')
const router = express.Router()
const doctorController  = require('../controllers/doctorController')
router.route('/')
.get(doctorController.getdoctor)
.post(doctorController.createdoctor)
.patch(doctorController.updatedoctor)
.delete(doctorController.deletedoctor)

module.exports = router

const express = require('express')
const tourController = require('../controllers/tourController')

const router = express.Router()
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour)

router
    .route('/:id/:y?')
    .get(tourController.getTourbyID)
    .patch(tourController.updateTourbyID)
    .delete(tourController.deleteTourbyID)


module.exports = router
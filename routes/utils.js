const courseSchema = require('../models/course');
const promotionSchema = require('../models/promotion');

exports.getAllCourse = (req, res) => {
    courseSchema.find({}, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}

exports.getAllPromotion = (req, res) => {
    promotionSchema.find({}, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}
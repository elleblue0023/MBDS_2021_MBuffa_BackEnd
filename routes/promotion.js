const promotionSchema = require('../models/promotion');

exports.create = (req, res) => {
    let newPromotion = new promotionSchema({
        name: req.body.name
    });

    newPromotion.save((error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.status(200).json({ message: 'Promotion saved.', data: data });
        }
    });
}

exports.getById = (req, res) => {
    promotionSchema.findById(req.params.id, (error,data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}

exports.getAll = (req, res) => {
    promotionSchema.find({}, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}

exports.update = (req, res) => {
    promotionSchema.findByIdAndUpdate(req.body.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.status(200).json({message: "Promotion has been updated"})
        }
    })
}

exports.delete = (req, res) => {
    promotionSchema.findByIdAndRemove(req.params.id, (error, promotion) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        }
        res.json({message: `${promotion.name} deleted`});
    })
}
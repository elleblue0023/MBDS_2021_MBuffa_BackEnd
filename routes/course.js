const courseSchema = require('../models/course');

exports.create = (req, res) => {
    let newCourse = new courseSchema({
        name: req.body.name
    });

    newCourse.save((error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.status(200).json({ message: 'Course saved.', data: data });
        }
    });
}

exports.getById = (req, res) => {
    courseSchema.findById(req.params.id, (error,data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}

exports.getAll = (req, res) => {
    courseSchema.find({}, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}

exports.update = (req, res) => {
    courseSchema.findByIdAndUpdate(req.body.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.status(200).json({message: "Course has been updated"})
        }
    })
}

exports.delete = (req, res) => {
    courseSchema.findByIdAndRemove(req.params.id, (error, course) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        }
        res.json({message: `${course.name} deleted`});
    })
}
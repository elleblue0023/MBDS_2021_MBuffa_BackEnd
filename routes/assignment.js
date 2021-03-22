const assignmentSchema = require('../models/assignment');

exports.create = (req, res) => {
    let newAssignment = new assignmentSchema({
        student: req.body.student,
        promotionName: req.body.promotionName,
        courseName: req.body.courseName,
        note: req.body.note,
        projectUrl: req.body.projectUrl,
        doneDate: req.body.doneDate,
        name: req.body.name,
        isDone: req.body.isDone
    });

    newAssignment.save((error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.status(200).json({ message: 'Assignment saved.', data: data });
        }
    });
}

exports.getById = (req, res) => {
    assignmentSchema.findById(req.params.id, (error,data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}

exports.getAll = (req, res) => {
    assignmentSchema.find({}, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}

exports.update = (req, res) => {
    assignmentSchema.findByIdAndUpdate(req.body.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.status(200).json({message: "Assignment has been updated"})
        }
    })
}

exports.delete = (req, res) => {
    assignmentSchema.findByIdAndRemove(req.params.id, (error, assignment) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        }
        res.json({message: `${assignment.name} deleted`});
    })
}
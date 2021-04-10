let assignmentSchema = require('../models/assignment');
let jwt = require('../middlewares/verifyToken');

exports.create = (req, res) => {
    let currentUser = jwt.decode(req, res);
    let newAssignment = new assignmentSchema({
        student: currentUser._id,
        publication: req.body.publicationid,
        note: req.body.note,
        remark: req.body.remark,
        doneDate: req.body.doneDate,
        name: req.body.name,
        depositUrl: req.body.depositUrl,
        isMarked: req.body.isMarked
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
    assignmentSchema.find()
      .populate({
        path: "publication"
      })
      .exec((error, data) => {
        if (error) {
          res.status(500).send({ message: 'Internal server error' });
        } else {
          res.status(200).json(data);
        }
      });
  }

  exports.update = (req, res) => {
    assignmentSchema.findByIdAndUpdate(req.body.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        res.status(500).send({ message: 'Internal server error' });
      } else {
        res.status(200).json({ message: "Assignment has been updated" })
      }
    })
  }


  exports.findByStudentId = (req, res) => {
    let currentUser = jwt.decode(req, res);
    assignmentSchema.find({
      student: currentUser._id
    })
    .populate({
      path: "student",
      match: {
        _id: currentUser._id
      }
    })
    .populate({
      path: "publication",
      populate: { path: 'professor' }
    })
    .exec((error, data) => {
      if (error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(200).json(data);
      }
    });
  }

exports.delete = (req, res) => {
    assignmentSchema.findByIdAndRemove(req.params.id, (error, assignment) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        }
        res.json({message: `${assignment.name} deleted`});
    })
}
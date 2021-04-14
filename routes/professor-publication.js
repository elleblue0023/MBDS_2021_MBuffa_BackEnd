let publicationSchema = require('../models/publication');
let jwt = require('../middlewares/verifyToken');

exports.create = (req, res) => {
  let currentUser = jwt.decode(req, res);
  let newPublication = new publicationSchema({
    professor: currentUser._id,
    name: req.body.name,
    message: req.body.message,
    promotionName: req.body.promotion,
    courseName: req.body.course,
    deadline: req.body.deadline
  });

  //console.log(newPublication);

  newPublication.save((error, data) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Professor saved.', data: data });
    }
  });
}

exports.getById = (req, res) => {
  publicationSchema.findById(req.params.id, (error, data) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error here' });
    } else {
      res.json(data);
    }
  })
}

exports.getAll = (req, res) => {
  publicationSchema.find()
    .populate({
      path: "professor"
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
  publicationSchema.findByIdAndUpdate(req.body.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: "Professor has been updated" })
    }
  })
}

/*
exports.findByPromotion = (req, res) => {
  publicationSchema.findById({
    professor: req.body.professor._id,
    promotionName: req.body.promotion
  }, (error, data) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.json(data);
    }
  })
}
*/

exports.findByCourse = (req, res) => {
  publicationSchema.findById({
    professor: req.body.professor._id,
    courseName: req.body.cours
  }, (error, data) => {
    if (error) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.json(data);
    }
  })
}

exports.getPublicationsByPromotion = async function (req, res) {
  await getPublicationsByPromotionPaged(req,res);
}

function getPublicationsByPromotionPaged(req,res) {

  let query = { promotionName: { $regex: new RegExp(req.params.promotion), $options: "i" } };

  let options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 2,
      populate: ['professor'],
  };
  return publicationSchema.paginate(query, options, function (err, result) {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).json(result);
    }
  });
}

exports.findByProfessorId = (req, res) => {
  let currentUser = jwt.decode(req, res);
  
  publicationSchema.find({
    professor: currentUser._id
  })
  .sort({deadline: -1})
  .populate({
    path: "professor",
    match: {
      _id: currentUser._id
    }
  })
  .exec((error, data) => {
    if (error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(200).json(data);
    }
  });
}

exports.getPublicationsProfessorId = async function (req, res) {
  console.log('go');
  await getPublicationsProfessorIdPaged(req,res);
}

function getPublicationsProfessorIdPaged(req,res) {
  let currentUser = jwt.decode(req, res);
  console.log('go');

  let query = { professor: currentUser._id };
  console.log(query);

  let options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 2,
      populate: ['professor'],
  };
  return publicationSchema.paginate(query, options, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).json(result);
    }
  });
}

exports.findByPromotion = (req, res) => {
  let currentUser = jwt.decode(req, res);
  publicationSchema.find({
    promotionName: req.params.promotion
  })
  .sort({deadline: 1})
  .populate({
    path: "professor"
  })
  .exec((error, data) => {
    if (error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(200).json(data);
    }
  });
}

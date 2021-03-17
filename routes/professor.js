const professorSchema = require('../models/professor');
const bcrypt = require('bcryptjs');

exports.create = (req, res) => {
    let newProfessor = new professorSchema({
        lastname: req.body.lastname,
        surname: req.body.surname,
        email: req.body.email,
        isConnected: true,
        occupation: req.body.occupation,
        password: req.body.password
    });

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newProfessor.password, salt, (error, hash) => {
            if(error) {
                res.status(500).send({ message: 'Internal server error' });
            }
            // Set the hashed password and save the model
            newProfessor.password = hash;
            newProfessor.save((error, data) => {
                if (error) {
                    res.status(500).send({ message: 'Internal server error'});
                } else {
                    res.status(200).json({ message: 'Professor saved.', data: data });
                }
            });
        })
     });
}

exports.login = (request, response) => {
    professorSchema.findOne({ email: request.body.email }, function (error, user) { 
        if (user == null) {
            return res.status(400).send({ message : "User not found."
            });
        } else {
            bcrypt.compare(request.body.password, user.password, function(err, res) {
                if (res === true) {
                    professorSchema.findByIdAndUpdate(user._id, {
                        $set: { isConnected : true }
                    }, (error, data) => {
                        if (error) {
                            res.status(500).send({ message: 'Internal server error'});
                        } else {
                            return response.status(201).send({ message : "User Logged In"})
                        }
                    })
                } else {
                    return response.status(400).send({ message : "Wrong Password"}); 
                }
            });
        }
    })
}

exports.getById = (req, res) => {
    professorSchema.findById(req.params.id, (error,data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}

exports.getAll = (req, res) => {
    professorSchema.find({}, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.json(data);
        }
    })
}

exports.update = (req, res) => {
    professorSchema.findByIdAndUpdate(req.body.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.status(200).json({message: "Professor has been updated"})
        }
    })
}

exports.logout = (req, res) => {
    professorSchema.findByIdAndUpdate(req.params.id, {
        $set: { isConnected : false }
    }, (error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error'});
        } else {
            res.status(200).json({message: "Professor has been updated"})
        }
    })
}
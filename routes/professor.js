const professorSchema = require('../models/professor');


exports.create = (req, res) => {
    let professor = new Professor({
        lastname: req.body.lastname,
        surname: req.body.surname,
        email: req.body.email,
        password: professor.setPassword(req.body.password),
        isConnected: true,
        occupation: req.body.occupation
    });

    professorSchema.save((error, data) => {
        if (error) {
            res.status(500).send({ message: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Professor saved.', data: professor });
        }
    });
}

exports.login = (req, res) => {
    professorSchema.findOne({ email: req.body.email }, function (error, user) { 
        if (user == null) {
            return res.status(400).send({ message : "User not found."
            });
        } else {
            const user_password = user.setPassword(req.body.password); 
            if (user.password == user_password) {
                return res.status(201).send({ 
                    message : "User Logged In", 
                }) 
            }else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        }
    })
}
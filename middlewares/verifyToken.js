const jwt = require('jsonwebtoken');
const privateKey = "Uv,fJysbPLZxdrj";

exports.sign = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, privateKey, { expiresIn: '1h' }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })
  })
}

exports.verify = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, privateKey);
    next();
  } catch (error) {
    res.status(401).json({ message: "Not Authorized" });
  }
}

exports.decode = (req, res) => {
  try{
    let token = req.headers.authorization.split(' ')[1];
    const decodedToken= jwt.decode(token);
    return decodedToken.payload._doc;
  } catch(error) {
    res.status(401).json({ message: "Not Authorized" });
  }
}
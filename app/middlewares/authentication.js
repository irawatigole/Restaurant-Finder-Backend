const { User } = require('../models/user');

// const autheticateUser = function (req, res, next) {
//     let token = req.header('x-auth');
//     console.log(req.header)
//     User.findByToken(token).then((user) => {
//         req.locals = {                      // for getting user variable available across all files
//             user,
//             token
//         }
//         next();
//     }).catch((err) => {
//         res.status(401).send(err);            // we can also send back empty object, if user is not unauthenticated
//     });
// }

const authorizeUser = function (req, res, next) {
    // role might be of following types too:moderators, customer service, logistics, finance
    if (req.user.role == 'admin') {
        next();
    } else {
        res.status(403).send('you are not authorized to access this page');
    }
}

module.exports = {
    // autheticateUser,
    authorizeUser
}
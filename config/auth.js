// var LocalStrategy = require('passport-local').Strategy;
// var db = require('../models/index'),
//     User = db.User;
//
// module.exports = function(passport) {
//   /* Passport Session
//   * - persistent login sessions
//   * - serialize sessions and deserialize users
//   */
//   // serialize sessions
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
//
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });
//
//   /* LOCAL SIGNUP
//   * By default, strategy name is 'local'
//   * But we have multiple strategies: local signup and login
//   */
//   passport.use('local-signup', new LocalStrategy({
//     // By default, local uses username and password
//     // Customize for login by email
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true // allows us to pass back the entire request to the callback
//   },
//     function(req, email, password, done) {
//       if (req.body.confirmPassword != password) {
//         console.log("Passwords do not match.");
//         return done(null, false, { 'confirmPassword': 'Passwords do not match. Try again.'})
//       }
//       // asynchronous
//       // User.findOne wont fire unless data is sent back
//       process.nextTick(function() {
//         User.findOne({ 'email': email }, function(err, user) {
//           if (err) { return done(err); }
//           if (user) {
//             return done(null, false, {'message': 'That email is already taken.'});
//           } else {
//             var newUser = new User();
//             newUser.username = req.body.username;
//             newUser.email = email;
//             newUser.password = password;
//             newUser.save(function(err) {
//               if (err){ throw err; }
//             });
//           }
//         });
//       });
//     })
//   );
//   /* LOCAL LOGIN */
//   passport.use('local-login', new LocalStrategy({
//     // By default, local ususes uername and password
//     // Customize to use email
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true // allows us to pass entire request to the callback
//   },
//     function(req, email, password, done) {
//       User.findOne({ 'email': email }, function(err, user) {
//         // if there are any errors, return the error before saying anything else
//         if (err) { return done(err); }
//         // if no user is found, return the message
//         if (!user)
//           return done(null, false, { 'message': 'No user found.' });
//         // if the user is found but the password is wrong
//         if (!user.validPassword(password))
//           return done(null, false, { 'message': 'Oops! Wrong password.'});
//
//         // return successful user
//         return done(null, user);
//       });
//     })
//   );
//
// };

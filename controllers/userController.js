const userModel = require("../models/userModel").userModel;
const { database } = require("../models/userModel");

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

function findOrCreate(profile) {
  //will first find if user is in DB, and if not then user will be added to DB
  // console.log(
  //   "\nthe name of profile is --------- " + JSON.stringify(profile._json.name)
  // );
  let user = userModel.findById(parseInt(profile.id));
  if (user) {
    return user;
  } else {
    database.push({
      // if there is no user found in the DB, add user to DB then check again and return user
      id: parseInt(profile.id),
      name: profile.displayName,
      email: profile.emails[0].value,
      isAdmin: true, // just making myself and anyone who signs it with github as admin for testing
    });
    user = userModel.findById(parseInt(profile.id)); //this will find user again after they have been added to DB
    return user;
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate,
};

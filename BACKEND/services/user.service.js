const userModel = require("../models/user.model");
module.exports.createUser = async ({   //it will create a new user
  firstname,lastname,email,password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("all feild are required");
  } 
  //else
  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  return user;
};

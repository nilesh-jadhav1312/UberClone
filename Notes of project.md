Install dotenv to setup the envrionment varibales  and require it 
npm i dotenv cors  ............
CORS is a security mechanism that allows a server to specify which external origins are permitted to access its resources.

in package.json file addd main as a server.js

//------------2 
creatin models of database
install mongoose
npm i mongoose

then in DB folder db,js requireing mongo
and iin db.js we will connect to thw 

install nodemon to run seerver automatically
npx nodemone ----------command to run it 


to hash password we require bcrypt

for authentication we need jwtwebtoken

--------------------------------------------------------
Express Validator is a middleware library for Express.js used to validate and sanitize incoming request data (like req.body, req.params, req.query) before your backend processes it.

npm i express-validator

In that line of code, body is a middleware function (specifically a validation chain creator) provided by the express-validator library.

It is used to target and validate data specifically coming from the HTTP request body (e.g., data sent via a POST request in JSON or URL-encoded format).

================================================== registration done successfully
=========================================
creating login logout route in routes,and controller

next → A function used to pass control to the next middleware (for error handling or other processing).  ------------- //in controller

const errors = validationResult(req); -------//in controller
validationResult comes from express-validator (a popular library to validate user input).

select('+password'):

By default, sensitive fields like password are often not selected in queries (usually marked asselect: false in the schema).

const token = user.generateAuthToken();
What is happening?

This line creates an authentication token for the logged-in user.
generateAuthToken() is usually a custom method defined in the User model.
What is a token?
A token is a secure string (usually a JWT – JSON Web Token) that proves:
“This user is authenticated (logged in).”
Instead of sending the email & password again and again, the client sends this token.
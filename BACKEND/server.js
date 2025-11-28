// const http=require('http')
// const app=require('./app')
// const dotenv = require('dotenv');
// dotenv.config();

// const ports=process.env.PORT || 8080;

// const server=http.createServer(app);
// server.listen(PORT,()=>{
//   console.log(`server runnring oon port${port}`);
 
// })

const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;  // <-- FIXED

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import dependencies and initialize the express app
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require("cors")
const path = require('path')
const port = process.env.PORT || 4000



app.use(express.urlencoded({extended : true}));
app.use(cors({
  methods: ['GET','POST'],
  credentials: true,            
}));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
    console.log("Hello from the server!");
  res.send('turci')
})


// start the express server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const express = require('express')
// require('dotenv').config()
// const morgan = require('morgan')
// const {connectDB} = require('./db/connection')

// // process.env.PORT to use in .env file
// const PORT = 4000 || process.env.PORT
// // to execute express
// const app = express()

// // Middleware
// // We start seeing JSON(data)
// app.use(express.json())
// app.use(morgan("dev"))




// app.listen(PORT, ()=>{
//     console.log(`Server successfully running at port:${PORT}`)
// })

const express = require('express');
const morgan = require('morgan')
require('dotenv').config();
const {connectDB} = require('./db/connection')
const productRoutes = require('./routes/productRoutes')

const PORT = 4000 || process.env.PORT;
connectDB()
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res)=>{
    res.send("We are connected to DataBase!")
})
// to connect to route
app.use('/api/products', productRoutes)



app.listen(PORT, () => {
    console.log(`Server successfully running at port: ${PORT}`);
    
})
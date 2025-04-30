//password:- 2npps70yajmpiK2q

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./utils/errorHandler');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

<<<<<<< HEAD
mongoose.connect("mongodb+srv://admin:2npps70yajmpiK2q@cluster0.gf62g.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(() => {
   app.listen(5000);
})
.catch ((err)=> console.log((err)));
=======
// Routes
app.use('/api/auth', require('./Route/auth'));
app.use('/api/users', require('./Route/users'));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
>>>>>>> c4aa4c97ca44d353cf7a6bffb7b9de3aecda8563

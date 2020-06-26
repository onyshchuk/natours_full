const mongoose = require('mongoose');
const dotenv = require('dotenv');

// UNCOMENT IN PRODUCTION
// process.on('uncaughtException', err => {
//    console.log('UNCAUGHT EXCEPTION! Shutting down...'); // eslint-disable-line
//    console.log(err.name, err.message); // eslint-disable-line
//    process.exit(1);
// });

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
   '<PASSWORD>',
   process.env.DATABASE_PASSWORD
);

mongoose
   .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
   })
   .then(() => console.log('DB connection successfull')); // eslint-disable-line

const port = process.env.PORT || 3000;

// listening to the port
const server = app.listen(port, () => {
   console.log(`App running on port ${port}...`); // eslint-disable-line
});

// UNCOMENT IN PRODUCTION
// process.on('unhandledRejection', err => {
//    console.log('UNHANDLED REJECTION! Shutting down...'); // eslint-disable-line
//    console.log(err.name, err.message); // eslint-disable-line
//    server.close(() => {
//       process.exit(1);
//    });
// });

process.on('SIGTERM', () => {
   console.log('SIGTERM RECIEVED. Shutting down gracefully'); // eslint-disable-line
   server.close(() => {
      console.log('Process terminated!'); // eslint-disable-line
   });
});

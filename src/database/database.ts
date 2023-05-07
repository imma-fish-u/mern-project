import mongoose from 'mongoose';

console.log(process.env.DB_USER);
mongoose
  .connect(`mongodb://localhost:27017/Thullo`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Connexion failed to MongoDB : ' + err);
  });

import mongoose from 'mongoose';

console.log(process.env.DB_USER)
mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nodeapi.0g88p.mongodb.net/thullo`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Connexion failed to MongoDB : ' + err);
    })

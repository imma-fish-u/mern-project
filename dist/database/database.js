"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
console.log(process.env.DB_USER);
mongoose_1.default
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

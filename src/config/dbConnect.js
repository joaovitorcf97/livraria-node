import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://joao:4550@cluster0.liuly4s.mongodb.net/alura-node');

const db = mongoose.connection;

export default db;
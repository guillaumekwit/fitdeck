import express from "express";
import bodyParser from "body-parser";
import mongodb from "mongodb"
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./Routes/posts.js";
import userRoutes from "./Routes/users.js";
import exercises from "./api/exercise.route.js"
import ExerciseDAO from "./dao/exercisedao.js";
import WorkoutsDAO from "./dao/WorkoutsDAO.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes)
app.use("/api/v1/exercise", exercises)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

app.get('/', (req,res) => {
    res.send("APP IS RUNNING.")
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT.toString())))
    .catch((error) => console.log(error.message));

//mongoose.set("useFindAndModify", false);

const MongoClient = mongodb.MongoClient

const port = 8080

MongoClient.connect(
    "mongodb+srv://JayJacelli:FitDeck3980@cluster0.aj1wl.mongodb.net/FitDeck?retryWrites=true&w=majority",
    {
        maxpoolSize: 200,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})

.then(async client => {
    await ExerciseDAO.injectDB(client)
    await WorkoutsDAO.injectDB(client)
    app.listen(port, () => {
        console.log('listening on port ' + port)
    })
})
import express from "express"
import cors from "cors"
import exercises from "./api/exercise.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/exercise", exercises)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app 
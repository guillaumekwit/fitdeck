import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ExerciseDAO from "./dao/exercisedao.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT 

MongoClient.connect(
    process.env.FITDECKIO_DB_URI,
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
    app.listen(port, () => {
        console.log('listening on port ' + port)
    })
})


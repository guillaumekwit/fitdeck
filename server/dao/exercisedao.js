import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let exercises

export default class ExerciseDAO {
    static async injectDB(conn) {
        if (exercises) {
            return
        }
        try {
            exercises = await conn.db(process.env.FITDECKIO_NS).collection("Exercises")
        } catch (e) {
            console.error(
                'Unable to establish a collection handle in restaurantsDAO: ' + e, 
            )
        }
    }

    static async getExercises({
        filters = null,
        page = 0,
        exercisesPerPage = 20,
    } = {}) {
        let query
        if(filters) {
            if ("name" in filters) {
                query = {$text: { $search: filters["name"] } }
            } else if ("area" in filters) {
                query = { "area": { $eq: filters["area"]}}
            }
        }

        let cursor

        try{
            cursor = await exercises
                .find(query)
        } catch (e) {
            console.error('Unable to issue command, ' + e)
            return { exercisesList: [], totalNumExercises: 0 }
        }

        const displayCursor = cursor.limit(exercisesPerPage).skip(exercisesPerPage * page)

        try { 
            const exercisesList = await displayCursor.toArray()
            const totalNumExercises = await exercises.countDocuments(query)

            return { exercisesList, totalNumExercises }
        } catch (e) {
            console.error(
                'Unable to convert to array or problme counting documents, ' + e
            )
            return { exercisesList: [], totalNumExercises: 0 }
        }
    } 
    static async modifyexercise(exerciseId, weight, set_to_reps, date) {
        try {
          const updateResponse = await exercises.updateOne(
            { _id: ObjectId(exerciseId)},
            { $set: { weight: weight, set_to_reps: set_to_reps, date: date  } },
          )
    
          return updateResponse
        } catch (e) {
          console.error(`Unable to update exercise: ${e}`)
          return { error: e }
        }
      }



    static async getarea() {
        let area = []
        try {
          area = await exercises.distinct("area")
          return area
        } catch (e) {
          console.error(`Unable to get area, ${e}`)
          return area
        }
      }
    
}




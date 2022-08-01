import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let workouts

export default class WorkoutsDAO {
    static async injectDB(conn) {
        if (workouts) {
            return
        }
        try {
            workouts = await conn.db(process.env.FITDECKIO_NS).collection("workouts")
        } catch (e) {
            console.error('Unable to establish collection handles in userDAO: ' + e)
        }
    }

    static async getWorkouts({
        filters = null,
        page = 0,
        workoutsPerPage = 20,
    } = {}) {
        let query
        if(filters) {
            if ("num_exercises_completed" in filters) {
                query = {"num_exercises_completed": { $search: filters["num_exercises_completed"] } }
            } else if ("date" in filters) {
                query = { "date": { $eq: filters["date"]}}
            }
                else if ("notes" in filters) {
                query = { "notes": { $eq: filters["notes"]}}
            }
        }

        let cursor

        try{
            cursor = await workouts
                .find(query)
        } catch (e) {
            console.error('Unable to issue command, ' + e)
            return { workoutsList: [], totalNumWorkouts: 0 }
        }

        const displayCursor = cursor.limit(workoutsPerPage).skip(workoutsPerPage * page)

        try { 
            const workoutsList = await displayCursor.toArray()
            const totalNumWorkouts = await workouts.countDocuments(query)

            return { workoutsList, totalNumWorkouts }
        } catch (e) {
            console.error(
                'Unable to convert to array or problme counting documents, ' + e
            )
            return { workoutsList: [], totalNumWorkouts: 0 }
        }
    } 

    static async addWorkouts(num_exercises_completed, notes, time_spent_exercising, date) {
        try {
            const WorkoutsDoc = {
                num_exercises_completed: num_exercises_completed,
                notes: notes,
                time_spent_exercising: time_spent_exercising,
                date: date,
                calories: time_spent_exercising*3, } 

            return await workouts.insertOne(WorkoutsDoc)
        } catch (e) {
            console.error('Unable to post notes: ' + e)
            return { error: e }
        }
    }

    static async deleteWorkouts(workoutsId) {

        try {
            const deleteWorkouts = await workouts.deleteOne({
                _id: ObjectId(notesId),
            })

            return deleteWorkouts
        } catch (e) {
            console.error('Unable to delete workout: ' + e)
            return { error: e}
        }
    }
}
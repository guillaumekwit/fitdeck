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

    static async addWorkouts(num_exercises_completed, notes, time_spent_exercising, date) {
        try {
            const WorkoutsDoc = {
                num_exercises_completed: num_exercises_completed,
                notes: notes,
                time_spent_exercising: time_spent_exercising,
                date: date,
                calories: time_spent_exercising*90, } 

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
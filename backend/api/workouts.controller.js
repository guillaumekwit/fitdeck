import WorkoutsDAO from "../dao/WorkoutsDAO.js"

export default class WorkoutsController {
    static async apiPostWorkout(req, res, next) {
        try {
            const num_exercises_completed = req.body.num_exercises_completed
            const notes = req.body.notes
            const time_spent_exercising = req.body.time_spent_exercising
            const date = new Date()

            const WorkoutsResponse = await WorkoutsDAO.addWorkouts(
                num_exercises_completed,
                notes,
                time_spent_exercising,
                date,
            )
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteWorkout(req, res, next) {
        try {
            const workoutsId = req.query.id
            console.log(workoutsId)
            const WorkoutsResponse = await WorkoutsDAO.deleteWorkouts(
                workoutsId,
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({ error: e.message})
        }
    }
    
}
import WorkoutsDAO from "../dao/WorkoutsDAO.js"

export default class WorkoutsController {
    static async apiGetWorkout(req, res, next) {
        const workoutsPerPage = req.query.workoutsPerPage ? parseInt(req.query.workoutsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.num_exercises_completed) {
            filters.num_exercises_completed = req.query.num_exercises_completed
        }else if (req.query.date) {
            filters.date = req.query.date
        }else if (req.query.time_spent_exercising) {
            filters.date = req.query.time_spent_exercising
        }else if (req.query.calories) {
            filters.date = req.query.calories
        }



        const { workoutsList, totalNumWorkouts } = await WorkoutsDAO.getWorkouts({
            filters,
            page,
            workoutsPerPage
        })
        
        let response = {
            workouts: workoutsList,
            page: page,
            filters: filters,
            entries_per_page: workoutsPerPage,
            total_results: totalNumWorkouts,
        }
        res.json(response)
    }

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
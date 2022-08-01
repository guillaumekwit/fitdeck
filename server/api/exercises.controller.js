import ExerciseDAO from "../dao/exercisedao.js"

export default class ExercisesController {
    static async apiGetExercises(req, res, next) {
        const exercisesPerPage = req.query.exercisesPerPage ? parseInt(req.query.exercisesPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.area) {
            filters.area = req.query.area
        }else if (req.query.name) {
            filters.name = req.query.name
        }

        const { exercisesList, totalNumExercises } = await ExerciseDAO.getExercises({
            filters,
            page,
            exercisesPerPage
        })
        
        let response = {
            exercises: exercisesList,
            page: page,
            filters: filters,
            entries_per_page: exercisesPerPage,
            total_results: totalNumExercises,
        }
        res.json(response)
    }

    static async apiModifyExercise(req, res, next) {
        try {
          const exerciseId = req.body.exerciseId
          const weight = req.body.weight
          const set_to_reps = req.body.set_to_reps
          const date = new Date()
    
          const exerciseResponse = await ExerciseDAO.modifyexercise(
            exerciseId,
            weight,
            set_to_reps,
            date,
          )
    
          var { error } = exerciseResponse
          if (error) {
            res.status(400).json({ error })
          }
    
          if (exerciseResponse.modifiedCount === 0) {
            throw new Error(
              "unable to update exercise - exercise not found",
            )
          }
    
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }
    
    static async apiGetExerciseArea(req, res, next) {
        try {
            let area = await ExerciseDAO.getarea()
            res.json(area)
        } catch (e) {
            console.log('api. ' + e)
            res.status(500).json({ error: e })
        }
    }
}
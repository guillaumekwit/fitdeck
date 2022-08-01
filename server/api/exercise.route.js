import express from "express"
import ExercisesController from "./exercises.controller.js"
import WorkoutsController from "./workouts.controller.js"

const router = express.Router()

router.route("/").get(ExercisesController.apiGetExercises)
router.route("/area").get(ExercisesController.apiGetExerciseArea)

router
    .route("/")
    .put(ExercisesController.apiModifyExercise)

router
    .route("/workouts")
    .get(WorkoutsController.apiGetWorkout)
    .post(WorkoutsController.apiPostWorkout)
    .delete(WorkoutsController.apiDeleteWorkout)

export default router
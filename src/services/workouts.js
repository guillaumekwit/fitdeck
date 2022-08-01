import http from "../http-common";

class WorkoutDataService {
  getAll(page = 0) {
    return http.get(`workouts?page=${page}`);
  }

  find(query, by = "calories", page = 0) {
    return http.get(`workouts?${by}=${query}&page=${page}`);
  } 

  find(query, by = "num_exercise_completed", page = 0) {
    return http.get(`workouts?${by}=${query}&page=${page}`);
  } 
  createWorkout(data) {
    return http.post("/workouts", data);
  }

}

export default new WorkoutDataService();
import http from "../http-common";

class WorkoutDataService {
  getAll(page = 0) {
    return http.get(`workouts?page=${page}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`workouts?${by}=${query}&page=${page}`);
  } 


  createWorkout(data) {
    return http.post("/workouts", data);
  }

  getAreas(id) {
    return http.get(`/area`);
  }

}

export default new WorkoutDataService();
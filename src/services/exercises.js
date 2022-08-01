import http from "../http-common";

class ExerciseDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  } 


  updateExercise(data) {
    return http.put("/exercise-edit", data);
  }

  getAreas(id) {
    return http.get(`/area`);
  }

}

export default new ExerciseDataService();
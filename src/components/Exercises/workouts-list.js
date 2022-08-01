import React, { useState, useEffect } from "react";
import WorkoutDataService from "../../services/workouts";
import { Link } from "react-router-dom";

const WorkoutsList = props => {
  const [workouts, setWorkouts] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchNumComplete, setSearchNumCompleted ] = useState("");
  const [searchTimeSpent, setSearchTime ] = useState("");
  

  useEffect(() => {
    retrieveWorkouts();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchNumComplete = e => {
    const searchNumComplete = e.target.value;
    setSearchNumCompleted(searchNumComplete);
  };

  const onChangeSearchTimeSpent = e => {
    const searchTimeSpent = e.target.value;
    setSearchTime(searchTimeSpent);
  };

  const retrieveWorkouts = () => {
    WorkoutDataService.getAll()
      .then(response => {
        console.log(response.data);
        setWorkouts(response.data.workouts);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveWorkouts();
  };

  const find = (query, by) => {
   WorkoutDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setWorkouts(response.data.workouts);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByNumCompleted = () => {
    find(searchNumComplete, "num_exercises_completed")
  };

  const findByTimeSpent = () => {
      find(searchTimeSpent, "time_spent_exercising")
    }

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Number of Exercises"
            value={searchNumComplete}
            onChange={onChangeSearchNumComplete}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNumCompleted}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Time Spent Exercising"
            value={searchTimeSpent}
            onChange={onChangeSearchTimeSpent}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTimeSpent}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {workouts.map((workout) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">
                    <strong> Notes: </strong>{workout.notes}<br/>
                    Date:{workout.date}
                  </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <strong> Time Spent Exercising: </strong>{workout.time_spent_exercising}</li>
                    <li className="list-group-item"><strong>Total Exercises Completed</strong>{workout.num_exercises_completed}</li>
                    <li className="list-group-item"><strong>Calories Burned: </strong>{workout.calories}</li>
                  </ul>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default WorkoutsList;
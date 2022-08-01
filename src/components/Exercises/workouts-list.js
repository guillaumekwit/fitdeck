import React, { useState, useEffect } from "react";
import WorkoutDataService from "../../services/workouts";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const WorkoutsList = props => {
  const [workouts, setWorkouts] = useState([]);
  const [searchCalories, setSearchCalories ] = useState("");
  const [searchNumComplete, setSearchNumCompleted ] = useState("");
  const [searchTimeSpent, setSearchTime ] = useState("");
  

  useEffect(() => {
    retrieveWorkouts();
  }, []);

  const onChangeSearchCalories = e => {
    const searchCalories = e.target.value;
    setSearchCalories(searchCalories);
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

  const findByCalories = () => {
    find(searchCalories, "calories")
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
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Calories Burned"
            value={searchCalories}
            onChange={onChangeSearchCalories}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCalories}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {workouts.map((workout) => {
          return (
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Date Completed: {workout.date}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Calories Burned: {workout.calories}
                </Typography>
                <Typography variant="body2">
                    <strong> Time Spent Exercising (minutes): </strong>{workout.time_spent_exercising}
                  <br />
                  <strong>Total Exercises Completed: </strong>{workout.num_exercises_completed}
                  <br />
                  <strong> Notes: </strong> {workout.notes}
                </Typography>
              </CardContent>
            </Card>
            ); 
        })}


      </div>
    </div>
  );
};

export default WorkoutsList;
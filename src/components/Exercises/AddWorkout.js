import React, { useState } from "react";
import WorkoutDataService from "../../services/workouts";
import { Link } from "react-router-dom";

const AddWorkout = props => {

  const [submitted, setSubmitted] = useState(false);
  const[num_exercises_completed, setNum] = useState("");
  const[notes, setText] = useState("");
  const[time_spent_exercising, setTE] = useState("");

  const handleInputChangene = event => {
    setNum(event.target.value);
  };

  const handleInputChangeST = event => {
    setText(event.target.value);
  };

  const handleInputChangeTSE = event => {
    setTE(event.target.value);
  };

  const saveWorkout = () => {
    var data = {
      num_exercises_completed: num_exercises_completed,
      notes: notes,
      time_spent_exercising: time_spent_exercising,
    };

      WorkoutDataService.createWorkout(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }


  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/workouts"} className="btn btn-success">
              Back to Workouts
            </Link>
          </div>
        ) : (
          <div>
            <label htmlFor="description"><strong>Create Workout</strong></label>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="NumExercises">Number of Exercises Completed</label>
                <input type="text" className="form-control" id="text" placeholder="Please enter total number of different exercises used" value={num_exercises_completed} onChange={handleInputChangene}></input>
              </div>
              <div class="form-group col-md-6">
                <label for="notes">Notes</label>
                <input type="text" class="form-control" id="text" placeholder="This workout was Hard. 7/10" value={notes} onChange={handleInputChangeST}></input>
              </div>
              <div class="form-group col-md-6">
                <label for="time">Total Time Spent Exercising (in minutes)</label>
                <input type="text" class="form-control" id="text" placeholder="30" value={time_spent_exercising} onChange={handleInputChangeTSE}></input>
              </div>
              </div>
            <button onClick={saveWorkout} className="btn btn-success">
              Submit
            </button>
            </div>
      )} 
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddWorkout;
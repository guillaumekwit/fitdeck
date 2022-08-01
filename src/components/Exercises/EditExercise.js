import React, { useState } from "react";
import ExerciseDataService from "../../services/exercises";
import { Link } from "react-router-dom";

const EditExercise = props => {

  const user = useState(JSON.parse(localStorage.getItem("profile")));
  const [submitted, setSubmitted] = useState(false);
  const[Weight, setWeight] = useState("");
  const[set_to_reps, setToREPS] = useState("");

  const handleInputChangew = event => {
    setWeight(event.target.value);
  };

  const handleInputChangeSTR = event => {
    setToREPS(event.target.value);
  };

  const editExercise = () => {
    var data = {
        exerciseId: ,
      weight: Weight,
      set_to_reps: set_to_reps,
    };

      ExerciseDataService.updateExercise(data)
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
      {user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/exercise"} className="btn btn-success">
              Back to Exercises
            </Link>
          </div>
        ) : (
          <div>
            <label htmlFor="description"><strong>Edit Exercise</strong></label>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="NumExercises"></label>
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
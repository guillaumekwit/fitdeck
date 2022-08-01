import React, { useState, useEffect } from "react";
import ExerciseDataService from "../../services/exercises.js";

const ExercisesList = props => {
  const [exercises, setExercises] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchArea, setSearchArea ] = useState("");
  const [areas, setArea] = useState(["All Areas"]);

  useEffect(() => {
    retrieveExercises();
    retrieveAreas();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchArea = e => {
    const searchArea = e.target.value;
    setSearchArea(searchArea);
  };

  const retrieveExercises = () => {
    ExerciseDataService.getAll()
      .then(response => {
        console.log(response.data);
        setExercises(response.data.exercises);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveAreas = () => {
    ExerciseDataService.getAreas()
      .then(response => {
        console.log(response.data);
        setArea(["All Areas"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveExercises();
  };

  const find = (query, by) => {
    ExerciseDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setExercises(response.data.exercises);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByArea = () => {
    if (searchArea == "All Areas") {
      refreshList();
    } else {
      find(searchArea, "area")
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">

          <select onChange={onChangeSearchArea}>
             {areas.map(area => {
               return (
                 <option value={area}> </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByArea}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {exercises.map((exercise) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{exercise.name}</h5>
                  <p className="card-text">
                    <strong>Focus Area: </strong>{exercise.area}<br/>
                    <strong>Max Weight: </strong>{exercise.weight}
                    <strong>Sets To Reps: </strong>{exercise.set_to_reps}
                  </p>
                  <a target="_blank" href={exercise.description_video} className="btn btn-primary col-lg-5 mx-1 mb-1">View Video</a>
                  </div>
                </div>
              </div>
          );
        })}


      </div>
    </div>
  );
};

export default ExercisesList;
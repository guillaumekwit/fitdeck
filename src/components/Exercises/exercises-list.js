import React, { useState, useEffect } from "react";
import ExerciseDataService from "../../services/exercises.js";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
        <div className="input-group col-lg-2">
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
              onClick={findByName}>
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-2">

          <select onChange={onChangeSearchArea}  onClick={findByArea}>
             {areas.map(area => {
               return (
                 <option value={area}> {area} </option>
               )
             })}
          </select>

        </div>
      </div>
  

      <div className="container">
      <div className="row-mt-5">
        {exercises.map((exercise) => {
          return (
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {exercise.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Focus Area: {exercise.area}
                </Typography>
                <Typography variant="body2">
                  Max Weight: {exercise.weight}
                  <br />
                  Sets to Reps: {exercise.set_to_reps}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={exercise.description_video}>Video</Button>
              </CardActions>
            </Card>
            ); 
        })}

    </div>
    </div>
  </div>
  );
};

export default ExercisesList;
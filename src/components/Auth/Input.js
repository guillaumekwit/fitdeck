import React from 'react';
import { TextField, Grid, InputAdornment, IconButton, Icon } from "@material-ui/core";

import Visibilty from "@material-ui/icons/Visibility";
import VisibiltyOff from "@material-ui/icons/VisibilityOff";

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
    <Grid item xs={12} sm={6}>
        <TextField 
            name={name} 
            onChange={handleChange} 
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={ name === "password" ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ? <Visibilty /> : <VisibiltyOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : null}
        />
    </Grid>
)

export default Input;
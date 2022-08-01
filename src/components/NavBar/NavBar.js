import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const logout = () => {
        dispatch({ type: "LOGOUT"});

        history.push("/")

        setUser(null);
    }

    useEffect(() => {
        const token = user?.decoded.token;

        if (token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [location]);

    return (
        <AppBar position="static" color="inherit">
            <div>
                <Typography component={Link} to="/" variant="h2" align="center">FitDeck.fun</Typography>
            </div>
            <Toolbar>
                {user ? (
                    <div>
                        <Avatar alt={user.decoded.name} src={user.decoded.picture}>{user.decoded.name.charAt(0)}</Avatar>
                        <Typography variant="h6">{user.decoded.given_name}</Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
            <Typography component={Link} to="/OneRepMaxCalculator" variant="body1">Rep Calculator</Typography>
            <Typography component={Link} to="/exercises" variant="body1">Exercises</Typography>
            <Typography component={Link} to="/workouts" variant="body1">workouts</Typography>
        </AppBar>
    )
}

export default Navbar
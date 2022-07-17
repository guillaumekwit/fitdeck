import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";

const Navbar = () => {
    const user = null;

    return (
        <AppBar position="static" color="inherit">
            <div>
                <Typography component={Link} to="/" variant="h2" align="center">FitDeck.io</Typography>
            </div>
            <Toolbar>
                {user ? (
                    <div>
                        <Avatar alt={user.result.name} src={user.result.imageURL}>{user.result.name.charAt(0)}</Avatar>
                        <Typography variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" color="secondary">Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
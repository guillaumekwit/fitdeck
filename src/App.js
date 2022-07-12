import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

import Posts from "./components/Posts/Posts";
import SearchBar from "./components/Form/SearchBar";

import TempData from "./TempData.json";

const App = () => {
    return (
        <Container maxWidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">FitDeck.io</Typography>
                
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <SearchBar data={TempData}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;
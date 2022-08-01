import React, { useEffect} from "react";
import { Card, Typography } from "@material-ui/core";

const Home = () => {
    return (
        <Card>
            <Typography variant="body1">
                Hello! Welcome to FitDeck.FUN!

                This website was built by a Team of 3 computer sciense students and gym lovers.{'\n'}

                Our goal was to design a site which allowed the user to control their own gym path without being
                confused or overwhelmed by influencer culture.

                Here you will find 20 recommended exercises to start your journey. Along with a simple workout tracker
                and calorie counter. 

                Explore the site and remember have fun :D
            </Typography>
        </Card>
    );
}

export default Home;
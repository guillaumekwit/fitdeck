import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import Home from "./components/Home/Home"
import Navbar from "./components/NavBar/NavBar";
import Auth from "./components/Auth/Auth";
import OnRMCalc from "./components/OneRMCalc/OnRMCalc";



const App = () => {
    return (
        <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth} />
                <Route path="/OneRepMaxCalculator" exact component={OnRMCalc} />
            </Switch>
        </Container>
        </BrowserRouter>
    )
}

export default App;
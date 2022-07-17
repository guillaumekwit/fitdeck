import React, { useEffect} from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import SearchBar from "../Form/SearchBar";
import TempData from "../Home/TempData.json";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
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
    );
}

export default Home;
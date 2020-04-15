import React from 'react';
import Feed from '../../components/feed';
import Fab_newRecipe from '../../components/fab_newRecipe';

function Home() {
    return (
        <div className="Home">
            <Feed />
            <Fab_newRecipe/>
        </div>
    );
}

export default Home;

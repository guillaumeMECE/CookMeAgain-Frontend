import React from 'react';
import Recipe from '../../components/recipe';

function RecipePage(props) {
    return (
        <div className="RecipePage">
            <Recipe rid={props.match.params.rid} />
        </div>
    );
}

export default RecipePage;

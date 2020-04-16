import React, { Component, useEffect } from 'react'
import "./style.css"

import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'

import Cookies from 'js-cookie'
import axios from 'axios';

import { connect } from 'react-redux'
import { fetchRecipes } from '../../redux'

import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router-dom'
import Row from 'react-bootstrap/Row';


class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log("RECIPE DATA : ", this.state.recipeData);

        // useEffect(() => {
        this.props.fetchRecipes(Cookies.get('umid'))
        //   }, [])
        // this.fetchData();
    }


    async fetchData() {
        try {
            const { data } = await axios.post("https://cook-me-again-backend.herokuapp.com/api/recipe/read", {
                userUID: Cookies.get('umid')
            });
            this.setState({ Data: data });
            this.setState({ isLoad: true });

        } catch (error) {
            console.log('ERROR MESSAGE :', error.message);
            console.log('ERROR :', error);
        }
    };

    redirectToRecipe(recipe) {
        console.log("Click on : ", this.props.history);
        this.props.history.push(`/recipe/${recipe._id}`)

    }

    renderRecipeInRow(recipe) {
        return (
            <div className="w-100 h-100">
                <Image className="thumbnailRecipe float-left" src={recipe.img} roundedCircle />
                {recipe.title}
            </div>
        )
    }

    renderFeedForSmartphone() {
        return (
            <div className="d-lg-none">
                    <h2 className="mt-2 ml-3" style={{textAlign:"left"}}>My Recipes</h2>
                    <ListGroup variant="flush" >
                        {this.props.Data.map((recipe, index) => (
                            <ListGroup.Item key={index} onClick={() => { this.redirectToRecipe(recipe) }} action className="item justify-content-start">
                                {/* <Link to={() => { this.redirectToRecipe(recipe) }} style={{ color: 'inherit', textDecoration: 'inherit'}}> */}
                                <Image className="thumbnailRecipe mr-2" src={recipe.img} roundedCircle />
                                <h3  >{recipe.title}</h3>
                                {/* </Link> */}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
            </div>)
    }

    renderFeed() {
        console.log(this.props.Data);

        return (
            <div className="inner_content">
                {this.renderFeedForSmartphone()}
                {/* {this.renderRecipeTablet()} */}
            </div>
        );
    }

    render() {
        console.log("RECIPE DATA : ", this.props.Data);
        console.log("LOAD DATA : ", this.props.isLoad);

        return (

            <div className="Feed" >
                {this.props.isLoad ?
                    this.renderFeed()
                    :
                    <Spinner className="my-5" animation="border" />
                }

            </div>
        );
    }
}


const mapStateToProps = state => {
    console.log("mapStateToProps : ", state.recipe);

    return {
        Data: state.recipe.recipes,
        isLoad: !state.recipe.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRecipes: (umid) => dispatch(fetchRecipes(umid))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed))

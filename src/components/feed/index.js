import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./style.css"


import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import Cookies from 'js-cookie'
import axios from 'axios';

const CARD_PER_ROW = 5;
const ROW_PER_LOADING = 10;

export default class GridList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "https://www.marmiton.org/recettes/recette_pate-a-crepes-simple_27121.aspx",
            Data: {},
            PokemonToShow: [],
            isLoad: false,
            isRedirect: false,
            redirectPath: null
        };
        // this.loadNewRecipe = this.loadNewRecipe.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        // document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        // document.removeEventListener('scroll', this.trackScrolling);
    }

    async fetchData() {
        try {
            console.log("STATE : ", Cookies.get('umid'));

            const { data } = await axios.post("http://192.168.0.22:3030/api/recipe/read", {
                userUID: Cookies.get('umid')
            });
            console.log("Data FEED ", data);
            this.setState({ Data: data });

            // this.loadPokemonToShow();
            this.setState({ isLoad: true });

        } catch (error) {
            console.log('ERROR MESSAGE :', error.message);
            console.log('ERROR :', error);
        }
    };

    loadPokemonToShow() {
        console.log("x1");
        this.setState({ isLoad: false });
        this.setState({ Page: this.state.Page + 1 })
        console.log("PAGE", this.state.Page);
        console.log("x2");
        this.setState({ PokemonToShow: this.state.Pokemon.slice(0, CARD_PER_ROW * ROW_PER_LOADING * this.state.Page) });
        console.log("x3");
        console.log("DataToShow", this.state.PokemonToShow);
        console.log("DataNOTToShow", this.state.Pokemon);
        console.log("x4");
        this.createGridRender();
    }

    createGridRender() {
        const items = []
        const rowNumber = this.state.PokemonToShow.length / CARD_PER_ROW;

        for (let index = 0; index < rowNumber; index++) {
            items.push(this.state.PokemonToShow.slice(index * CARD_PER_ROW, index * CARD_PER_ROW + CARD_PER_ROW));
        }
        this.setState({ PokemonToShow: items });
        this.setState({ isLoad: true });
        console.log("DataToShow : ", this.state.PokemonToShow);
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('grid_list');
        if (this.isBottom(wrappedElement)) {
            console.log('header bottom reached');
            // document.removeEventListener('scroll', this.trackScrolling);
            this.loadPokemonToShow();
        }
    }

    redirectToPokemonInfo(name) {
        console.log("WORKKKK");
        this.setState({
            isRedirect: true,
            redirectPath: name
        })
    }

    loadNewRecipe = (event) => {
        console.log("EVENT : ", event.target.value);

        this.setState({ url: event.target.value });
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
                <ListGroup variant="flush">
                    {this.state.Data.map((recipe, index) => (
                        <ListGroup.Item key={index} className="item justify-content-start">
                            <Image className="thumbnailRecipe mr-2" src={recipe.img} roundedCircle />
                            <h3  >{recipe.title}</h3>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>)
    }

    renderFeed() {
        console.log(this.state.Data);

        return (
            <div className="inner_content">
                {this.renderFeedForSmartphone()}
                {/* {this.renderRecipeTablet()} */}
            </div>
        );
    }

    render() {

        return (

            <div className="GridList" id="grid_list">
                {this.state.isLoad ?
                    this.renderFeed()
                    :
                    <Spinner className="my-5" animation="border" />
                }

            </div>
        );
    }
}

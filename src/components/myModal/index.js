import React, { Component } from 'react'
import "./style.css"

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import Cookies from 'js-cookie'
import axios from 'axios';

import { connect } from 'react-redux'
import { fetchRecipes } from '../../redux'




class MyVerticallyCenteredModal extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  async addNewRecipe() {
    try {
      const { data } = await axios.post("http://192.168.0.22:3030/api/recipe", {
        url: document.getElementById("urlInput").value,
        userUID: Cookies.get('umid')
      });
      this.props.fetchRecipes(Cookies.get('umid'));
      this.props.onHide()
      // console.log("PROPS MODAL : ", props);
  
    } catch (error) {
      console.log('ERROR MESSAGE :', error.message);
      console.log('ERROR :', error);
    }
  }
  render() {

    return (
      <Modal
        // {...props}
        show={this.props.show} onHide={this.props.onHide} animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a new Recipe
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-2">
            <FormControl id="urlInput" type="text" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="url" />
          </InputGroup>
          <Nav variant="pills" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link eventKey="/home"><FontAwesomeIcon icon={faLink} /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1"><FontAwesomeIcon icon={faFileImage} /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disabled">
                <FontAwesomeIcon icon={faEdit} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtn" variant="outline-danger" onClick={this.props.onHide}>Close</Button>
          <Button className="modalBtn" variant="primary" onClick={() => { this.addNewRecipe() }}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// const mapStateToProps = state => {
//   console.log(" MODAL mapStateToProps : ",state.recipe);

//   return {
//       Data: state.recipe.recipes,
//       isLoad: !state.recipe.loading
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipes: (umid) => dispatch(fetchRecipes(umid))
  }
}

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(MyVerticallyCenteredModal)
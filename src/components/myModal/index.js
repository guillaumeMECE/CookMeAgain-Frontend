import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import "./style.css"

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'

import "./style.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
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
          <FormControl type="text" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="url" />
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
        <Button className="modalBtn" variant="outline-danger" onClick={props.onHide}>Close</Button>
        <Button className="modalBtn" variant="primary" onClick={props.onHide}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}
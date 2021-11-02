import React, { Component } from 'react';
import { 
  Row, 
  Col, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button,
  FormFeedback,
  FormText
} from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      roles: '',
      notes: '',
      img: '',
      validate: {
        emailState: '',
        firstNameState: '',
        lastNameState: '',
        phoneNumberState: '',
        rolesState: '',
        notesState: ''
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { validate } = this.state;

    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }

    this.setState({ validate });
  }

  validateUsername(e) {
    const usernameRex = 
    /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    
    const { validate } = this.state;

    if (e.target.name === 'firstName') {
      if (usernameRex.test(e.target.value)) {
        validate.firstNameState = 'has-success' 
      } else {
        validate.firstNameState = 'has-danger' 
      }
    } else if (e.target.name === 'lastName') {
      if (usernameRex.test(e.target.value)) {
        validate.lastNameState = 'has-success' 
      } else {
        validate.lastNameState = 'has-danger' 
      }
    }

    this.setState({ validate })
  }

  validatePhoneNumber(e) {
    const phoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){8,14}(\s*)?$/
  
    const { validate } = this.state;

    if (phoneRegex.test(e.target.value)) {
      validate.phoneNumberState = 'has-success'
    } else {
      validate.phoneNumberState = 'has-danger'
    }

    this.setState({ validate })
  }

  validateRoles(e) {  
    const { validate } = this.state;

    if (e.target.value == 'Chouse your role' || e.target.value == '') {
      validate.rolesState = 'has-danger'
    } else {
      validate.rolesState = 'has-success'
    }

    this.setState({ validate })
  }

  validateNotes(e) {  
    const { validate } = this.state;

    if (e.target.value.length <= 5 || e.target.value === '') {
      validate.notesState = 'has-danger'
    } else {
      validate.notesState = 'has-success'
    }

    this.setState({ validate })
  }

  submitForm(e) {
    e.preventDefault();
    console.log(`firstName: ${this.state.firstName}`);
    console.log(`lastName: ${this.state.lastName}`);
    console.log(`phoneNumber: ${this.state.phoneNumber}`);
    console.log(`email: ${this.state.email}`);
    console.log(`roles: ${this.state.roles}`);
    console.log(`notes: ${this.state.notes}`);
  }
  
  render() {
    return (
      <div>
        <Row className="justify-content-md-center text-center">
          <Col md={6}>
            <div className="home-hero">
              <h1>Create User</h1>
            </div>
          </Col>
        </Row>
        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
          <Row className="justify-content-md-center" form>
            <Col md={4}>
              <FormGroup>
                <Label for='firstName'>First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First name ..."
                  valid={this.state.validate.firstNameState === "has-success"}
                  invalid={this.state.validate.firstNameState === "has-danger"}
                  value={this.firstName}
                  onChange={(e) => {
                    this.validateUsername(e);
                    this.handleChange(e);
                  }}
                />
                <FormFeedback>
                  Looks like your input is'n correct.
                </FormFeedback>
                <FormFeedback valid>
                  That's a correct first name.
                </FormFeedback>
                <FormText>Your first name must be not less than 2 simvols.</FormText>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='lastName'>Last Name:</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last name ..."
                  valid={this.state.validate.lastNameState === "has-success"}
                  invalid={this.state.validate.lastNameState === "has-danger"}
                  value={this.lastName}
                  onChange={(e) => {
                    this.validateUsername(e);
                    this.handleChange(e);
                  }}
                />
                <FormFeedback>
                  Looks like your input is'n correct.
                </FormFeedback>
                <FormFeedback valid>
                  That's a correct last name.
                </FormFeedback>
                <FormText>Your last name must be not less than 2 simvols.</FormText>
              </FormGroup>
            </Col>
          </Row>
          
          <Row className="justify-content-md-center" form>
            <Col md={4}>
              <FormGroup>
                <Label for='phoneNumber'>Phone Number:</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone number ..."
                  valid={this.state.validate.phoneNumberState === "has-success"}
                  invalid={this.state.validate.phoneNumberState === "has-danger"}
                  value={this.phoneNumber}
                  onChange={(e) => {
                    this.validatePhoneNumber(e);
                    this.handleChange(e);
                  }}
                />
                <FormFeedback>
                  Looks like your input is'n correct.
                </FormFeedback>
                <FormFeedback valid>
                  That's a correct phone number.
                </FormFeedback>
                <FormText>Your phone number must be not less than 8 simvols.</FormText>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='email'>Email:</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email ..."
                  valid={this.state.validate.emailState === "has-success"}
                  invalid={this.state.validate.emailState === "has-danger"}
                  value={this.email}
                  onChange={(e) => {
                    this.validateEmail(e);
                    this.handleChange(e);
                  }}
                />
                <FormFeedback>
                  Looks like your input is'n correct.
                </FormFeedback>
                <FormFeedback valid>
                  That's a correct email.
                </FormFeedback>
                <FormText>Your email must be with '@'.</FormText>
              </FormGroup>
            </Col>
          </Row>

          <Row className="justify-content-md-center" form>
            <Col md={4}>
              <FormGroup>
                <Label for='roles'>Roles:</Label>
                <Input
                  type="select"
                  name="roles"
                  id="roles"
                  valid={this.state.validate.rolesState === "has-success"}
                  invalid={this.state.validate.rolesState === "has-danger"}
                  value={this.roles}
                  onChange={(e) => {
                    this.validateRoles(e);
                    this.handleChange(e);
                  }}
                >
                  <option>
                    Chouse your role
                  </option>
                  <option>
                    Admin
                  </option>
                  <option>
                    Regular
                  </option>
                </Input>
                <FormFeedback>
                  Looks like your input is'n correct.
                </FormFeedback>
                <FormFeedback valid>
                  Your choused role.
                </FormFeedback>
                <FormText>Your need to chouse role.</FormText>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup row>
                <Label for="form__img">Image(avatar):</Label>
                <Input
                  value={this.state.img}
                  onChange={this.changeHandler}
                  id="form__img"
                  name="form__img"
                  placeholder="Your image ..."
                  type="file"
                  className="form-control"
                />
                <FormText>Chouse your avatar.</FormText>
              </FormGroup>
            </Col>
          </Row>

          <Row className="justify-content-md-center" form>
            <Col md={6}>
              <FormGroup>
                <Label for='notes'>Notes:</Label>
                <Input
                  type="textarea"
                  name="notes"
                  id="notes"
                  placeholder="Notes ..."
                  valid={this.state.validate.notesState === "has-success"}
                  invalid={this.state.validate.notesState === "has-danger"}
                  value={this.notes}
                  onChange={(e) => {
                    this.validateNotes(e);
                    this.handleChange(e);
                  }}
                />
                <FormFeedback>
                  Your type less than 5 simvols.
                </FormFeedback>
                <FormFeedback valid>
                  That's a correct notes.
                </FormFeedback>
                <FormText>Your note must be not less than 5 simvols.</FormText>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center" form>
            <Button>Create</Button>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Dashboard;

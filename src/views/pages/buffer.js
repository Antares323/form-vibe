import React, { Component } from 'react';
import { 
  Row, 
  Col, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button,
  FormFeedback
} from 'reactstrap';

const regexValidators = {
  regEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  regUsername: /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
  regPhone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){8,14}(\s*)?$/
}

class Dashboard extends Component {
  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    roles: '',
    notes: '',
    img: ''
  }


  validate = (event) => {
    let errors = {}
    let isValid = true
    let element = event
    console.log(element)

    switch (element.name) {
      case 'firstName':
        if (!regexValidators.regUsername.test(element.value) && element.value !== '') {
          isValid = false
          errors['firstName'] = "Plese enter your first name correct! "
        } else if (element.value.lenght <= 2) {
          isValid = false
          errors['firstName'] = "Plese enter your first name more than 2 simvols! "
        }
        break
      case 'lastName':
        if (!regexValidators.regUsername.test(element.value) && element.value !== '') {
          isValid = false
          errors['lastName'] = "Plese enter your name correct! "
        } else if (element.value.lenght <= 2) {
          isValid = false
          errors['lastName'] = "Plese enter your last name more than 2 simvols! "
        }
        break
      case 'phoneNumber':
        if (!regexValidators.regPhone.test(element.value) && element.value !== '') {
          isValid = false
          errors['phoneNumber'] = "Plese enter your phone correct! "
        } else if (element.value.lenght <= 8) {
          isValid = false
          errors['phoneNumber'] = "Plese enter your phone more than 8 simvols! "
        }
        break
      case 'email':
        if (!regexValidators.regEmail.test(element.value) && element.value !== '') {
          isValid = false
          errors['email'] = "Plese enter your email correct correct! "
        } else if (element.value.lenght <= 4) {
          isValid = false
          errors['email'] = "Plese enter your email more than 4 simvols! "
        }
        break
      case 'roles':
        if (element.value !== '') {
          isValid = false
          errors['roles'] = "Plese chouse role! "
        }
        break
      case 'notes':
        if (element.value !== '') {
          isValid = false
          errors['notes'] = "Plese enter your notes! "
        } else if (element.value.lenght <= 5) {
          isValid = false
          errors['notes'] = "Plese enter your notes more than 5 simvols! "
        }
        break
      default:
        break
    }

    this.setState({
      errors: errors
    })

    return isValid
  }

  submitHandler = event => {
    event.preventDefault()
    event.target.className += ' was-validated'

    if(this.validate(event)) {
      console.log('Ok')
    }
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value})
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
        <Form onSubmit={this.submitHandler}>
          <Row className="justify-content-md-center justify-content-md-around" form>
            <Col md={4}>
              <FormGroup row>
                <Label
                  for="firstName"
                >
                  First Name:
                </Label>
                <Input
                  value={this.state.firstName}
                  onChange={this.changeHandler}
                  id="firstName"
                  name="firstName"
                  placeholder="Your first name ..."
                  type="text"
                  className="form-control" 
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup row>
                <Label
                  for="lastName"
                >
                  Last Name:
                </Label>
                  <Input
                    value={this.state.lastName}
                    onChange={this.changeHandler}
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name ..."
                    type="text"
                    className="form-control"
                  />
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center justify-content-md-around" form>
            <Col md={4}>
              <FormGroup row>
                <Label
                  for="phoneNumber"
                >
                  Phone Number:
                </Label>
                <Input
                  value={this.state.phoneNumber}
                  onChange={this.changeHandler}
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Your phone number ..."
                  type="text"
                  className="form-control"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup row>
                <Label
                  for="email"
                >
                  Email:
                </Label>
                <Input
                  value={this.state.email}
                  onChange={this.changeHandler}
                  id="email"
                  name="email"
                  placeholder="Your email ..."
                  type="email"
                  className="form-control"
                />
                <FormFeedback>
                  Uh oh! Looks like there is an issue with your email. Please input a correct email.
                </FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center justify-content-md-around" form>
            <Col md={4}>
              <FormGroup row>
                <Label
                  for="roles"
                >
                  Role:
                </Label>
                <Input
                  value={this.state.roles}
                  onChange={this.changeHandler}
                  id="roles"
                  name="roles"
                  type="select"
                  className="form-control"
                  required
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
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup row>
                <Label
                  for="form__img"
                >
                  Image(avatar):
                </Label>
                <Input
                  value={this.state.img}
                  onChange={this.changeHandler}
                  id="form__img"
                  name="form__img"
                  placeholder="Your image ..."
                  type="file"
                  className="form-control"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center" form>
            <Col md={6}>
            <FormGroup>
              <Label for="notes">
                Notes:
              </Label>
              <Input
                id="notes"
                name="text"
                type="textarea"
              />
            </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center" >
            <Button
              color="primary"
            >
              Create
            </Button>
          </Row>
          
        </Form>
      </div>
    );
  }
}

export default Dashboard;

import React, { Component } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row, Table } from 'reactstrap';

import { token } from '../../assets/token.json'

const url = 'http://crm.local'
const userId = 1

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      adress: '',
      phone: '',
      head_name: '',
      activity: '',
      createdAt: '',
      updatedAt: '',
      validate: {
        nameState: '',
        adressState: '',
        phoneState: '',
        head_nameState: '',
        activityState: ''
      },
      fields: {
        nameField: '',
        adressField: '',
        phoneField: '',
        head_nameField: '',
        activityField: ''
      }
    }
  }

  validation = (e) => {
    const { validate } = this.state
    const regex = {
        name: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){8,14}(\s*)?$/
    }

    switch (e.target.name) {
        case 'name':
            if (regex.name.test(e.target.value)) {
                validate.nameState = 'has-success' 
            } else validate.nameState = 'has-danger'
            this.setState(validate)
            break
        case 'adress':
            if (e.target.value.length < 8 && e.target.value !== '') {
                validate.adressState = 'has-danger'
            } else validate.adressState = 'has-success'
            this.setState(validate)
            break
        case 'phone':
            if (regex.phone.test(e.target.value && e.target.value !== '')) {
                validate.phoneState = 'has-success'
            } else validate.phoneState = 'has-danger'
            this.setState(validate)
            break
        case 'head_name':
            if (e.target.value.length < 4 && e.target.value !== '') {
                validate.head_nameState = 'has-danger'
            } else validate.head_nameState = 'has-success'
            this.setState(validate)
            break
        case 'activity':
            if (e.target.value.length <= 5 && e.target.value !== '') {
                validate.activityState = 'has-danger'
            } else validate.activityState = 'has-success'
            this.setState(validate)
            break
        default: 
          break
    }
  }

  submit = (e) => {
    e.preventDefault()
    const { validate } = this.state
    let countErrors = 0

    for (let key in validate) {
      console.log(countErrors)
      
      if(validate[key] === '' || validate[key] === 'has-danger') {
        countErrors++
      }
    }

    if (!countErrors > 0) {
      let { nameField, adressField, phoneField, head_nameField, activityField } = this.state.fields

      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'appleication/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: nameField,
          adress: adressField,
          phone: phoneField,
          head_name: head_nameField,
          activity: activityField,
        })
      }

      fetch(`${url}/api/customer/create/${userId}?access-token=${token}`, options)
      .then(response => {
        if (response.status === 200) {
          console.log('success')
          this.setState({
            name: this.state.fields.nameField,
            adress: this.state.fields.adressField,
            phone: this.state.fields.phoneField,
            head_name: this.state.fields.head_nameField,
            activity: this.state.fields.activityField,
          })
        } else console.loh('error')
      })
    } else console.log('valid error: ', countErrors)
  }

  getCustomers = async () => {
   await fetch(`${url}/api/customers?acess-token=${token}`)
    .then(response => response.json())
    .then(customersData => {
      let customer = customersData[0].filter(el => el.id === userId)
      console.log(customer)
      // this.setState({
      //   name: this.state.fields.nameField,
      //   adress: this.state.fields.adressField,
      //   phone: this.state.fields.phoneField,
      //   head_name: this.state.fields.head_nameField,
      //   activity: this.state.fields.activityField,
      // })
    })
  }
  
  handleChange = (event) => {
    const { target } = event
    const value = target.value
    const { name } = target

    this.setState({
        [name]: value,
    })
  }

  render() {
    let { name, adress, phone, head_name, activity } = this.state
    let { nameState, adressState, phoneState, head_nameState, activityState } = this.state.validate

    return (
      <div>
        <Row className="justify-content-md-center text-center">
          <Col md={6}>
              <div className="home-hero">
              <h1>Create User</h1>
              </div>
          </Col>
          </Row>
          <Form className="form" onSubmit={(e) => this.submit(e)}>
          <Row className="justify-content-md-center">
              <Col md={4}>
                  <FormGroup>
                      <Label for='name'>Name:</Label>
                      <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="First name ..."
                          valid={nameState === "has-success"}
                          invalid={nameState === "has-danger"}
                          value={name}
                          onChange={(e) => {
                              this.validation(e);
                              this.handleChange(e);
                          }}
                      />
                      <FormFeedback>
                          Looks like your input is'n correct.
                      </FormFeedback>
                      <FormFeedback valid>
                          That's a correct name.
                      </FormFeedback>
                      <FormText>
                          Name must be not less than 2 simvols.
                      </FormText>
                  </FormGroup>
              </Col>
              <Col md={4}>
                  <FormGroup>
                      <Label for='adress'>Adress:</Label>
                      <Input
                          type="text"
                          name="adress"
                          id="adress"
                          placeholder="Last name ..."
                          valid={adressState === "has-success"}
                          invalid={adressState === "has-danger"}
                          value={adress}
                          onChange={(e) => {
                              this.validation(e);
                              this.handleChange(e);
                          }}
                      />
                      <FormFeedback>
                          Looks like your input is'n correct.
                      </FormFeedback>
                      <FormFeedback valid>
                          That's a correct last name.
                      </FormFeedback>
                      <FormText>
                          Last name must be not less than 2 simvols.
                      </FormText>
                  </FormGroup>
              </Col>
          </Row>
          
          <Row className="justify-content-md-center">
              <Col md={4}>
                  <FormGroup>
                      <Label for='phone'>Phone Number:</Label>
                      <Input
                          type="text"
                          name="phone"
                          id="phoneNumber"
                          placeholder="Phone number ..."
                          valid={phoneState === "has-success"}
                          invalid={phoneState === "has-danger"}
                          value={phone}
                          onChange={(e) => {
                              this.validation(e);
                              this.handleChange(e);
                          }}
                      />
                      <FormFeedback>
                          Looks like your input is'n correct.
                      </FormFeedback>
                      <FormFeedback valid>
                          That's a correct phone number.
                      </FormFeedback>
                      <FormText>
                          Phone number must be not less than 8 simvols.
                      </FormText>
                  </FormGroup>
              </Col>
              <Col md={4}>
                  <FormGroup>
                      <Label for='head_name'>Head Name:</Label>
                      <Input
                          type="text"
                          name="head_name"
                          id="head_name"
                          placeholder="Head name ..."
                          valid={head_nameState === "has-success"}
                          invalid={head_nameState === "has-danger"}
                          value={head_name}
                          onChange={(e) => {
                              this.validation(e);
                              this.handleChange(e);
                          }}
                      />
                      <FormFeedback>
                          Looks like your input is'n correct.
                      </FormFeedback>
                      <FormFeedback valid>
                          That's a correct email.
                      </FormFeedback>
                      <FormText>
                          Email must be with '@'.
                      </FormText>
                  </FormGroup>
              </Col>
          </Row>

          <Row className="justify-content-md-center">
              <Col md={4} className='my-2'>
                  <FormGroup>
                      <Label for='activity'>Activity:</Label>
                      <Input
                          type="text"
                          name="activity"
                          id="activity"
                          valid={activityState === "has-success"}
                          invalid={activityState === "has-danger"}
                          value={activity}
                          onChange={(e) => {
                              this.validation(e);
                              this.handleChange(e);
                          }}
                      />
                      <FormFeedback>
                          Looks like your input is'n correct.
                      </FormFeedback>
                      <FormFeedback valid>
                          Your choused role.
                      </FormFeedback>
                      <FormText>
                          Need to chouse role.
                      </FormText>
                  </FormGroup>
              </Col>
              {/* <Col md={4}>
                  <FormGroup row>
                      <Label for="form__img">
                          Image(avatar):
                          <img src={dataUser.img} alt="" width='36px' height='36px'/>
                      </Label>
                      <Input
                          onChange={(e) => {
                              handleImg(e)
                          }}
                          accept=".png, .jpg, .jpeg"
                          id="form__img"
                          name="form__img"
                          placeholder="Your image ..."
                          type="file"
                          className="form-control"
                      />
                      <FormText>
                          Chouse your avatar.
                      </FormText>
                  </FormGroup>
              </Col> */}
          </Row>
          <Row className="justify-content-md-center">
              <Button>Create</Button>
          </Row>
      </Form>

      <Row className='mt-5'>
        <Table dark>
            <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Adress</th>
                  <th>Phone</th>
                  <th>Head Name</th>
                  <th>Activity</th>
                </tr>
            </thead>
            <tbody>
                {/* {
                  dataPost.map(user => (
                    <tr key={user.id}>
                        <th>{user.id}</th>
                        <th><img src={user.img} width='26px'/></th>
                        <th>{user.firstName}</th>
                        <th>{user.lastName}</th>
                        <th>{user.phoneNumber}</th>
                        <th>{user.email}</th>
                        <th>{user.roles}</th>
                    </tr>
                  ))
                } */}
              </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}

export default Account;
import React, { Component, } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row, Table } from 'reactstrap';

let option = true

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roles: '',
      notes: '',
      img: '',
      validate: {
        firstNameState: '',
        lastNameState: '',
        emailState: '',
        phoneState: '',
        rolesState: '',
        notesState: ''
      },
      customersData: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  validation = (e) => {
    const { validate } = this.state
    const regex = {
        mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        username: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){8,14}(\s*)?$/
    }
    switch (e.target.name) {
        case 'firstName':
            if (regex.username.test(e.target.value)) {
              validate.firstNameState = 'has-success' 
            } else validate.firstNameState = 'has-danger'
            this.setState(validate)
            break
        case 'lastName':
            if (regex.username.test(e.target.value)) {
              validate.lastNameState = 'has-success' 
            } else validate.lastNameState = 'has-danger'
            this.setState(validate)
            break
        case 'phone':
            if (regex.phone.test(e.target.value)) {
              validate.phoneState = 'has-success'
            } else validate.phoneState = 'has-danger'
            this.setState(validate)
            break
        case 'email':
            if (regex.mail.test(e.target.value)) {
              validate.emailState = 'has-success'
            } else validate.emailState = 'has-danger'
            this.setState(validate)
            break
        case 'roles':
            if (e.target.value === 'Chouse your role' || e.target.value === '') {
              validate.rolesState = 'has-danger'
            } else validate.rolesState = 'has-success'
            this.setState(validate)
            break
        case 'notes':
            if (e.target.value.length <= 5 || e.target.value === '') {
              validate.notesState = 'has-danger'
            } else validate.notesState = 'has-success'
            this.setState(validate)
            break
        default: 
        break
    }
  }

  submit = (e) => {
    e.preventDefault()
    const { validate } = this.state
    let { firstName, lastName, email, phone, roles, notes, img } = this.state
    let countErrors = 0

    for (let key in validate) {
      
      if(validate[key] === '' || validate[key] === 'has-danger') {
        countErrors++
      }
    }

    if (!countErrors > 0) {
        var data = new FormData()
            data.append('firstName', firstName)
            data.append('lastName', lastName)
            data.append('phoneNumber', phone)
            data.append('email', email)
            data.append('notes', roles)
            data.append('roles', notes)
            data.append('img', img)

        fetch('db.json', {
            method: 'POST',
            body: data
        })
        .then(response => response.json)
        .then(data => console.log(data))
        this.createTableRow({id: 7, firstName, lastName, email, phone, roles, notes, img})
    } else console.log('valid error: ', countErrors)
    this.setState(prev => ({...prev, data}))
  }
  
  handleChange = (event) => {
    const { target } = event
    const value = target.value
    const { name } = target

    this.setState({
        [name]: value,
    })
  }

  handleImg = (e) => {
    let { img } = this.state;
    if(e.target.files) {
        img = URL.createObjectURL(e.target.files[0])  
    } 
    
    this.setState({ img })
  } 

  createTableRow = (data) => {
    let { customersData } = this.state
    let table = document.querySelector('.customerTable')
    let customer = (
        `<tr key=${data.id}>
            <th>${data.id}</th>
            <th><img src='${data.img}' width='32px' height='32px'/></th>
            <th>${data.firstName}</th>
            <th>${data.lastName}</th>
            <th>${data.email}</th>
            <th>${data.phone}</th>
            <th>${data.roles}</th>
        </tr>`
    )
    table.innerHTML += customer
    customersData = customer
    this.setState(prev => ({...prev, customersData: customer}))
    console.log(customersData)
  }

  getCustomers = async () => {
    await fetch('db.json')
    .then(response => response.json())
    .then(customers => {
        let data = customers.usersData
        data.map(d => this.createTableRow(d))
    })
  }

  uploadImage = async (e) => {
    const file = e.target.files[0]
    const base64 = await this.convertToBase64(file)
    this.setState({ img: base64 })
    console.log(this.state.img)
  }

  convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (err) => {
        reject(err)
      }
    })
  }


  render() {
    let { firstName, lastName, email, phone, roles, notes, img } = this.state
    const { firstNameState, lastNameState, emailState, phoneState, rolesState, notesState } = this.state.validate
    return(
    <div>
        <Row className="justify-content-md-center text-center">
          <Col md={6}>
              <div className="home-hero">
              <h1>Create User</h1>
              </div>
          </Col>
        </Row>
        <Form className="form" onSubmit={(e) => {this.submit(e)}}>
          <Row className="justify-content-md-center">
              <Col md={4}>
                  <FormGroup>
                      <Label for='firstName'>First Name:</Label>
                      <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First name ..."
                          valid={firstNameState === "has-success"}
                          invalid={firstNameState === "has-danger"}
                          value={firstName}
                          onChange={(e) => {
                              this.validation(e);
                              this.handleChange(e);
                          }}
                      />
                      <FormFeedback>
                          Looks like your input is'n correct.
                      </FormFeedback>
                      <FormFeedback valid>
                          That's a correct first name.
                      </FormFeedback>
                      <FormText>
                          First name must be not less than 2 simvols.
                      </FormText>
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
                          valid={lastNameState === "has-success"}
                          invalid={lastNameState === "has-danger"}
                          value={lastName}
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
                          id="phone"
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
                      <Label for='email'>Email:</Label>
                      <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email ..."
                          valid={emailState === "has-success"}
                          invalid={emailState === "has-danger"}
                          value={email}
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
                      <Label for='roles'>Roles:</Label>
                      <Input
                          type="select"
                          name="roles"
                          id="roles"
                          valid={rolesState === "has-success"}
                          invalid={rolesState === "has-danger"}
                          value={roles}
                          onChange={(e) => {
                            this.validation(e);
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
                      <FormText>
                          Need to chouse role.
                      </FormText>
                  </FormGroup>
              </Col>
              <Col md={4}>
                  <FormGroup row>
                      <Label for="form__img">
                          Image(avatar):
                          <img src={img} alt="" width='36px' height='36px'/>
                      </Label>
                      <Input
                          onChange={(e) => {
                            this.handleImg(e)
                            this.uploadImage(e)
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
              </Col>
          </Row>

          <Row className="justify-content-md-center">
              <Col md={6}>
              <FormGroup>
                  <Label for='notes'>Notes:</Label>
                  <Input
                      type="textarea"
                      name="notes"
                      id="notes"
                      placeholder="Notes ..."
                      valid={notesState === "has-success"}
                      invalid={notesState === "has-danger"}
                      value={notes}
                      onChange={(e) => {
                        this.validation(e);
                        this.handleChange(e);
                      }}
                  />
                  <FormFeedback>
                      Your type less than 5 simvols.
                  </FormFeedback>
                  <FormFeedback valid>
                      That's a correct notes.
                  </FormFeedback>
                  <FormText>
                      Notes must be not less than 5 simvols.
                  </FormText>
              </FormGroup>
              </Col>
          </Row>
          <Row className="justify-content-md-center">
              <Button>Create</Button>
          </Row>
        </Form>

        <Row className='mt-5'>
            <h2>Customers Table</h2>
            <Table dark>
                <thead>
                    <tr>
                      <th>#</th>
                      <th>Avatar</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                </thead>
                <tbody className='customerTable'>
                    
                </tbody>
            </Table>
        </Row>
        <Button onClick={(e) => {
            let table = document.querySelector('.customerTable')
            if (option) {
              option = false
              this.getCustomers()  
              e.target.textContent = 'Remove Customers'
            } else {
              option = true
              while (table.firstChild) {
                table.removeChild(table.firstChild)
              }
              e.target.textContent = 'Get Customers'
            }
        }}>Get Customers</Button>
      </div>
    );
  }
}

export default Account;
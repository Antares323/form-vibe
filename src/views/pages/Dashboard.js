import React, { Component, useEffect } from 'react';
import { Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row, Table } from 'reactstrap';

const token = 'VkYrrFC-Ha8SU2YqfOrj1ug5iBH7MujnnaubuYJYNe79ePtz4Exswc7PJdZxQXYG'
const url = 'http://crm.local'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      adress: '',
      phone: '',
      head_name: '',
      activity: '',
      createdAt: '',
      updatedAt: '',
      validate: {
        nameState: '',
        emailState: '',
        adressState: '',
        phoneState: '',
        head_nameState: '',
        activityState: ''
      },
      customersData: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  validation = (e) => {
    const { validate } = this.state
    const regex = {
        name: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){8,14}(\s*)?$/,
        mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }

    switch (e.target.name) {
        case 'name':
            if (regex.name.test(e.target.value)) {
                validate.nameState = 'has-success' 
            } else validate.nameState = 'has-danger'
            this.setState(validate)
            break
        case 'email':
            if (regex.mail.test(e.target.value)) {
                validate.emailState = 'has-success'
            } else validate.emailState = 'has-danger'
            this.setState(validate)
            break
        case 'adress':
            if (e.target.value.length < 8 && e.target.value !== '') {
                validate.adressState = 'has-danger'
            } else validate.adressState = 'has-success'
            this.setState(validate)
            break
        case 'phone':
            if (regex.phone.test(e.target.value) && e.target.value !== '') {
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
      
      if(validate[key] === '' || validate[key] === 'has-danger') {
        countErrors++
      }
    }

    if (!countErrors > 0) {
      let { name, email, adress, phone, head_name, activity } = this.state
        console.log(this.state)
        var data = new FormData()
            data.append('name', name)
            data.append('email', email)
            data.append('phone', phone)
            data.append('address', adress)
            data.append('activity', head_name)
            data.append('head_name', activity)

        fetch(`${url}/api/customer/create?access-token=${token}`, {
            method: 'POST',
            body: data
        })
        .then(response => response.json)
        .then(data => console.log(data))
    } else console.log('valid error: ', countErrors)
  }
  
  handleChange = (event) => {
    const { target } = event
    const value = target.value
    const { name } = target

    this.setState({
        [name]: value,
    })
  }

  createTableRow = (data) => {
    let { customersData } = this.state
    let customer = (
        `<tr key=${data.id}>
            <th>${data.id}</th>
            <th>${data.name}</th>
            <th>${data.email}</th>
            <th>${data.address}</th>
            <th>${data.phone}</th>
            <th>${data.head_name}</th>
            <th>${data.activity}</th>
        </tr>`
    )
    customersData.push(customer)
    this.setState(customersData)
  }

  getCustomers = async () => {
    await fetch(`${url}/api/customer?access-token=${token}`)
    .then(response => response.json())
    .then(customers => {
        let data = customers[0]
        return data.map(d => this.createTableRow(d))
    })
    useEffect(() => {
        this.getCustomers()
    }, [])
  }


  render() {
    let { name, adress, phone, head_name, activity, email } = this.state
    let { nameState, adressState, phoneState, head_nameState, activityState, emailState } = this.state.validate
    
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
                          placeholder="Name ..."
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
                          That's a correct adress.
                      </FormFeedback>
                      <FormText>
                          Adress must be not less than 8 simvols.
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
                            That's a correct.
                      </FormFeedback>
                      <FormText>
                            Head name must be not less than 2 simvols.
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
                          placeholder="Activity ..."
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
                            That's a correct.
                      </FormFeedback>
                      <FormText>
                            Need to chouse role.
                      </FormText>
                  </FormGroup>
              </Col>
              <Col md={4} className='my-2'>
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
                            Email must be include @.
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
            <h2>Customers Table</h2>
            <Table dark>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Adress</th>
                    <th>Phone</th>
                    <th>Head Name</th>
                    <th>Activity</th>
                    </tr>
                </thead>
                <tbody className='customerTable'>
                    
                </tbody>
            </Table>
        </Row>
        <Button onClick={() => {
            this.getCustomers()
        }}>Get Customers</Button>
      </div>
    );
  }
}

export default Dashboard;
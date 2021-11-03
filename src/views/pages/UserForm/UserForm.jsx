import React, { useState } from 'react'
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
import { postData } from '../LocalRequest/postUsers';
import { validation } from '../UserForm/module/validation'

const UserForm = () => {
    
    const [dataUser, setDataUser] = useState(
        {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            roles: '',
            notes: '',
            img: ''
        }
    )
    const [validate, setValidate] = useState(
        { 
            emailState: '',
            firstNameState: '',
            lastNameState: '',
            phoneNumberState: '',
            rolesState: '',
            notesState: ''
        }
    )

    const handleChange = (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;

        setDataUser({
            [name]: value,
        });
    };

    const handleImg = (e) => {
        let { img } = dataUser;
        if(e.target.files) {
            img = URL.createObjectURL(e.target.files[0])  
        } 
        
        setDataUser({ img })
    } 

    const submitForm = (e) => {
        e.preventDefault();
        const { validate } = validation
        let isValid = true

        for(let key in validate) {
            if (validate[key] === 'has-success' && validate[key] !== '') {
            isValid = true
            } else {
                isValid = false
            }
        }

        if (isValid) {
            let user = {
                id: 1,
                firstName: dataUser.firstName,
                lastName: dataUser.lastName,
                phoneNumber: dataUser.phoneNumber,
                email: dataUser.email,
                roles: dataUser.roles,
                notes: dataUser.notes,
                img: dataUser.img
            }
            console.log(dataUser)
            postData(user)
        }
    }

    return (
        <div>
            <Row className="justify-content-md-center text-center">
                <Col md={6}>
                    <div className="home-hero">
                    <h1>Create User</h1>
                    </div>
                </Col>
                </Row>
                <Form className="form" onSubmit={(e) => submitForm(e)}>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <FormGroup>
                            <Label for='firstName'>First Name:</Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="First name ..."
                                valid={validate.firstNameState === "has-success"}
                                invalid={validate.firstNameState === "has-danger"}
                                value={dataUser.firstName}
                                onChange={(e) => {
                                    validation(e, validate, setValidate);
                                    handleChange(e);
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
                                valid={validate.lastNameState === "has-success"}
                                invalid={validate.lastNameState === "has-danger"}
                                value={dataUser.lastName}
                                onChange={(e) => {
                                    validation(e, validate, setValidate);
                                    handleChange(e);
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
                            <Label for='phoneNumber'>Phone Number:</Label>
                            <Input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                placeholder="Phone number ..."
                                valid={validate.phoneNumberState === "has-success"}
                                invalid={validate.phoneNumberState === "has-danger"}
                                value={dataUser.phoneNumber}
                                onChange={(e) => {
                                    validation(e, validate, setValidate);
                                    handleChange(e);
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
                                valid={validate.emailState === "has-success"}
                                invalid={validate.emailState === "has-danger"}
                                value={dataUser.email}
                                onChange={(e) => {
                                    validation(e, validate, setValidate);
                                    handleChange(e);
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
                                valid={validate.rolesState === "has-success"}
                                invalid={validate.rolesState === "has-danger"}
                                value={dataUser.roles}
                                onChange={(e) => {
                                    validation(e, validate, setValidate);
                                    handleChange(e);
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
                            valid={validate.notesState === "has-success"}
                            invalid={validate.notesState === "has-danger"}
                            value={dataUser.notes}
                            onChange={(e) => {
                                validation(e, validate, setValidate);
                                handleChange(e);
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
        </div>
    )
}

export default UserForm

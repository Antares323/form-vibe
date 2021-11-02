export const validation = (e, state, setState) => {
    const validate = state
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
            setState(validate)
            break
        case 'lastName':
            if (regex.username.test(e.target.value)) {
                validate.lastNameState = 'has-success' 
            } else validate.lastNameState = 'has-danger'
            setState(validate)
            break
        case 'phoneNumber':
            if (regex.phone.test(e.target.value)) {
                validate.phoneNumberState = 'has-success'
            } else validate.phoneNumberState = 'has-danger'
            setState(validate)
            break
        case 'email':
            if (regex.mail.test(e.target.value)) {
                validate.emailState = 'has-success'
            } else validate.emailState = 'has-danger'
            setState(validate)
            break
        case 'roles':
            if (e.target.value === 'Chouse your role' || e.target.value === '') {
                validate.rolesState = 'has-danger'
            } else validate.rolesState = 'has-success'
            setState(validate)
            break
        case 'notes':
            if (e.target.value.length <= 5 || e.target.value === '') {
                validate.notesState = 'has-danger'
            } else validate.notesState = 'has-success'
            setState(validate)
            break
        default: 
        break
    }
  }
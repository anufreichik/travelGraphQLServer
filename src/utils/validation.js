export const REGEX = {
    email: /^(?!.{255})(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,255}$/,
    mongoHexId: /^(?=[a-f\d]{24}$)/i,
    content: /^.{0,120000}$/, //Comments, private messages, chats etc.
    singleInput: /^.{0,255}$/,  //Titles, short descriptions, email, password, links, etc:
    userSingleName: /^.{0,35}$/,  //First or Last name
    message: /^[\S\s]{0,4999}$/,  //Comments, private messages, chats etc.
}

export const Validate = {
    email: {
        check: (value) => REGEX.email.test(value),
        error: "Email validation error"
    },

    password: {
        check: (value) => REGEX.password.test(value),
        error: 'Password must include at least: 6 characters, 1 uppercase, 1 lowercase, 1 numeric or 1 special character.'
    },

    mongoId: {
        check: (id) => REGEX.mongoHexId.test(id),
        error: 'Id is not a valid mongo ObjectId'
    },

    content: {
        check: (value) => REGEX.content.test(value),
        error: 'Max length is 120000 characters'
    },

    singleInput: {
        check: (value) => REGEX.singleInput.test(value),
        error: 'Max length is 255 characters'
    },

    userSingleName: {
        check: (value) => REGEX.userSingleName.test(value),
        error: 'Max length is 35 characters'
    },

    message: {
        check: (value) => REGEX.message.test(value),
        error: 'Max length is 5000 characters'
    },

    defaultError: 'Validation error'
}


export const validateRegisterInput=( firstName, email, password)=>{
    const errors = {};
    if (firstName.trim() === '') {
        errors.firstName = 'First Name must not be empty';
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    } else {
        if (!email.match(REGEX.email)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password==='')
    {
        errors.password = 'Password must not be empty';
    }
    else{
        if(!password.match(REGEX.password)){
            errors.password = 'Password must include at least: 6 characters, 1 uppercase, 1 lowercase, 1 numeric or 1 special character.';
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };

}

export const validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === '') {
        errors.username = 'Email must not be empty';
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

export const objectHasProp = (obj, propName) => Object.hasOwnProperty.bind(obj)(propName);



// "values" argument is all of the <Field />'s values under their respective "title" attribute
// EX: { firstName: 'minh', lastName: 'lu' }

// This validate function will be automatically called by redux-form whenever any values of the fields change
var validate =  values => {
    var errors = {};

    /* FormFirstPage */
    if (!values.firstName) {
        errors.firstName = "Required";
    }
    
    if (!values.lastName) {
        errors.lastName = "Required";
    }

    if (!values.email) {
        errors.email = "Required";
    }

    /* FormSecondPage */
    if (!values.phoneNumber) {
        // We'll stick an "error" object within the Field (with the specified title)'s "meta" object
        errors.phoneNumber = "Required";
    }

    if (!values.sex) {
        errors.sex = "Required";
    }

    if (!values.location) {
        errors.location = "Required";
    }

    return errors;
}

export default validate
export default function Validate(values) {
    let errors = {};

    if (!values.firstname) {
        errors.firstname = 'First Name is required';
    }

    if (!values.lastname) {
        errors.lastname = 'Last Name is required';
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.phone) {
        errors.phone = 'Phone number is required';
    } else if (values.phone.length < 10) {
        errors.phone = 'Phone must be of the format starting with area code';
    }

    return errors;
};

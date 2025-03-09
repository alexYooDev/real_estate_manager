export const validateForm = (formData) => {
    let errors = {};

    if (!formData.name.trim()) {
        errors.name = "You must enter your name";
    }

    if (!formData.email) {
        errors.email = "You must enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "You must enter a valid email format";
    }

    const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.password) {
        errors.password = "You must enter your password";
    } else if (!PASS_REGEX.test(formData.password)) {
        errors.password = "Your password must be at least 8 characters long and contain uppercase, lowercase, number, and special character."
    }

    if (!formData.role) {
        errors.role = "You must select who you are joining us as"
    }

    return errors;
}
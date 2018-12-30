const validateLogin = (data) => {
    const { username, password } = data;
    let errors = {};

    if (username.length <= 6) {
        errors.username = 'Username length should be greater than 6';
    }
    if (password.length <= 6) {
        errors.password = 'Password length should be greater than 6';
    }
    return errors;
};
module.exports = validateLogin;

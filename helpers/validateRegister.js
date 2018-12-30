const validateRegister = (data) => {
    const { name, username, password, role } = data;
    let errors = {};
    if(name.split(' ')<2){
        errors.username = 'Fullname should be separated by space';
    }
    if (username.trim().length <= 6) {
        errors.username = 'Username length should be greater than 6';
    }
    if (password.trim().length <= 6) {
        errors.password = 'Password length should be greater than 6';
    }
    return errors;
};

module.exports = validateRegister;

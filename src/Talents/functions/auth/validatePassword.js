export default function  validatePassword(password, userEmail = "", userFirstName = "", userLastName = "") {
    const commonPasswords = [
        'password', '123456', '123456789', 'qwerty', 'abc123', 'password1', 'admin',
        // Add more common passwords as needed
    ];

    const minLength = 8;
    const maxLength = 12;
    const specialCharacters = /[@$!%*?&#]/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /\d/;

    if (password.length < minLength || password.length > maxLength) {
        return `Password must be between ${minLength} and ${maxLength} characters long.`;
    }

    if (!uppercase.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }

    if (!lowercase.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }

    if (!number.test(password)) {
        return "Password must contain at least one number.";
    }

    if (!specialCharacters.test(password)) {
        return "Password must contain at least one special character.";
    }

    if (userEmail && password.toLowerCase().includes(userEmail.split('@')[0].toLowerCase())) {
        return "Password must not contain parts of your email address.";
    }

    if (userFirstName && password.toLowerCase().includes(userFirstName.toLowerCase())) {
        return "Password must not contain your first name.";
    }

    if (userLastName && password.toLowerCase().includes(userLastName.toLowerCase())) {
        return "Password must not contain your last name.";
    }

    if (commonPasswords.includes(password.toLowerCase())) {
        return "Password is too common.";
    }

    return ""; // Password is valid
}
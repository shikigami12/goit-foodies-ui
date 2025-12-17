/**
 * Validation utilities for form fields
 */

// Minimum character limits - exported for use in form inputs
export const MIN_NAME_LENGTH = 2;
export const MIN_PASSWORD_LENGTH = 6;

// Maximum character limits - exported for use in form inputs
export const MAX_NAME_LENGTH = 50;
export const MAX_EMAIL_LENGTH = 100;
export const MAX_PASSWORD_LENGTH = 50;

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = (email) => {
  if (!email?.trim()) {
    return 'Email is required';
  }
  const trimmedEmail = email.trim();
  if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
    return `Email must be no more than ${MAX_EMAIL_LENGTH} characters`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return 'Enter a valid email address';
  }
  return null;
};

/**
 * Validates password
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return `Password must be no more than ${MAX_PASSWORD_LENGTH} characters`;
  }
  return null;
};

/**
 * Validates name
 * @param {string} name - Name to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateName = (name) => {
  if (!name?.trim()) {
    return 'Name is required';
  }
  const trimmedName = name.trim();
  if (trimmedName.length < MIN_NAME_LENGTH) {
    return `Name must be at least ${MIN_NAME_LENGTH} characters`;
  }
  if (trimmedName.length > MAX_NAME_LENGTH) {
    return `Name must be no more than ${MAX_NAME_LENGTH} characters`;
  }
  return null;
};

/**
 * Validates sign in form
 * @param {Object} values - Form values
 * @param {string} values.email - Email
 * @param {string} values.password - Password
 * @returns {Object} Object with field errors
 */
export const validateSignIn = ({ email, password }) => {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};

/**
 * Validates sign up form
 * @param {Object} values - Form values
 * @param {string} values.name - Name
 * @param {string} values.email - Email
 * @param {string} values.password - Password
 * @returns {Object} Object with field errors
 */
export const validateSignUp = ({ name, email, password }) => {
  const errors = {};
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};


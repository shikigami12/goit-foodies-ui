import * as yup from 'yup';

/**
 * Validation utilities for form fields using Yup
 */

// Minimum character limits - exported for use in form inputs
export const MIN_NAME_LENGTH = 2;
export const MIN_PASSWORD_LENGTH = 6;

// Maximum character limits - exported for use in form inputs
export const MAX_NAME_LENGTH = 50;
export const MAX_EMAIL_LENGTH = 100;
export const MAX_PASSWORD_LENGTH = 50;

/**
 * Yup schema for email validation
 */
const emailSchema = yup
  .string()
  .trim()
  .required('Email is required')
  .max(MAX_EMAIL_LENGTH, `Email must be no more than ${MAX_EMAIL_LENGTH} characters`)
  .email('Enter a valid email address');

/**
 * Yup schema for password validation
 */
const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
  .max(MAX_PASSWORD_LENGTH, `Password must be no more than ${MAX_PASSWORD_LENGTH} characters`);

/**
 * Yup schema for name validation
 */
const nameSchema = yup
  .string()
  .trim()
  .required('Name is required')
  .min(MIN_NAME_LENGTH, `Name must be at least ${MIN_NAME_LENGTH} characters`)
  .max(MAX_NAME_LENGTH, `Name must be no more than ${MAX_NAME_LENGTH} characters`);

/**
 * Yup schema for sign in form
 */
export const signInSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Yup schema for sign up form
 */
export const signUpSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Validates a single field using Yup schema
 * @param {yup.Schema} schema - Yup schema to validate against
 * @param {*} value - Value to validate
 * @returns {string|null} Error message or null if valid
 */
const validateField = (schema, value) => {
  try {
    schema.validateSync(value);
    return null;
  } catch (error) {
    return error.message;
  }
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = (email) => validateField(emailSchema, email);

/**
 * Validates password
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePassword = (password) => validateField(passwordSchema, password);

/**
 * Validates name
 * @param {string} name - Name to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateName = (name) => validateField(nameSchema, name);

/**
 * Validates sign in form
 * @param {Object} values - Form values
 * @param {string} values.email - Email
 * @param {string} values.password - Password
 * @returns {Object} Object with field errors
 */
export const validateSignIn = ({ email, password }) => {
  const errors = {};

  try {
    signInSchema.validateSync({ email, password }, { abortEarly: false });
  } catch (error) {
    if (error.inner) {
      error.inner.forEach((err) => {
        if (err.path && !errors[err.path]) {
          errors[err.path] = err.message;
        }
      });
    }
  }

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

  try {
    signUpSchema.validateSync({ name, email, password }, { abortEarly: false });
  } catch (error) {
    if (error.inner) {
      error.inner.forEach((err) => {
        if (err.path && !errors[err.path]) {
          errors[err.path] = err.message;
        }
      });
    }
  }

  return errors;
};


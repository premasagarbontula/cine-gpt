// Check only name
export const checkValidName = (name = "") => {
  const trimmed = name.trim();
  const namePattern = /^[a-zA-Z\s]+$/;

  if (!trimmed) return "Name is required.";
  if (!namePattern.test(trimmed))
    return "Name can only contain letters and spaces.";
  return undefined;
};

// Check only email
export const checkValidEmail = (email = "") => {
  const trimmed = email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmed) return "Email is required.";
  if (!emailPattern.test(trimmed)) return "Email is not valid.";
  return undefined;
};

// Check only password
export const checkValidPassword = (password = "") => {
  const trimmed = password.trim();
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!trimmed) return "Password is required.";
  if (!passwordPattern.test(trimmed)) {
    return "Password must be at least 8 characters long and include uppercase, lowercase letters, and a number.";
  }
  return undefined;
};

// Full form validation (used on submit)
export const checkValidDataFields = (
  email = "",
  password = "",
  name = undefined
) => {
  const errors = {};

  const emailError = checkValidEmail(email);
  const passwordError = checkValidPassword(password);
  const nameError = name !== undefined ? checkValidName(name) : undefined;

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (nameError) errors.name = nameError;

  return errors;
};

// Blur handlers

export const handleNameInputError = (nameRef, setFormErrors) => {
  const name = nameRef.current.value;
  const error = checkValidName(name);

  setFormErrors((prev) => ({
    ...prev,
    name: error || undefined,
  }));
};

export const handleEmailInputError = (emailRef, setFormErrors) => {
  const email = emailRef.current.value;
  const error = checkValidEmail(email);

  setFormErrors((prev) => ({
    ...prev,
    email: error || undefined,
  }));
};

export const handlePasswordInputError = (passwordRef, setFormErrors) => {
  const password = passwordRef.current.value;
  const error = checkValidPassword(password);

  setFormErrors((prev) => ({
    ...prev,
    password: error || undefined,
  }));
};

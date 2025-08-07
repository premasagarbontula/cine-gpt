// Check only name
export const checkValidName = (name = "", t) => {
  const trimmed = name.trim();
  const namePattern = /^[a-zA-Z\s]+$/;

  if (!trimmed) return t.nameRequired;
  if (!namePattern.test(trimmed)) return t.nameInvalid;
  return undefined;
};

// Check only email
export const checkValidEmail = (email = "", t) => {
  const trimmed = email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmed) return t.emailRequired;
  if (!emailPattern.test(trimmed)) return t.emailInvalid;
  return undefined;
};

// Check only password
export const checkValidPassword = (password = "", t) => {
  const trimmed = password.trim();
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!trimmed) return t.passwordRequired;
  if (!passwordPattern.test(trimmed)) {
    return t.passwordInvalid;
  }
  return undefined;
};

// Full form validation (used on submit)
export const checkValidDataFields = (
  email = "",
  password = "",
  name = undefined,
  t
) => {
  const errors = {};

  const emailError = checkValidEmail(email, t);
  const passwordError = checkValidPassword(password, t);
  const nameError = name !== undefined ? checkValidName(name, t) : undefined;

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (nameError) errors.name = nameError;

  return errors;
};

// Blur handlers

export const handleNameInputError = (nameRef, setFormErrors, t) => {
  const name = nameRef.current.value;
  const error = checkValidName(name, t);

  setFormErrors((prev) => ({
    ...prev,
    name: error || undefined,
  }));
};

export const handleEmailInputError = (emailRef, setFormErrors, t) => {
  const email = emailRef.current.value;
  const error = checkValidEmail(email, t);

  setFormErrors((prev) => ({
    ...prev,
    email: error || undefined,
  }));
};

export const handlePasswordInputError = (passwordRef, setFormErrors, t) => {
  const password = passwordRef.current.value;
  const error = checkValidPassword(password, t);

  setFormErrors((prev) => ({
    ...prev,
    password: error || undefined,
  }));
};

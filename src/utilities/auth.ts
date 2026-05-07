export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export const validatePassword = (
  password: string,
): {
  valid: boolean;
  message?: string;
} => {
  if (!password) {
    return { valid: false, message: "Password is required." };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  if (!/(?=.*[0-9])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one numeric value.",
    };
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one special character.",
    };
  }

  return { valid: true };
};

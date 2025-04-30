export const validatePassword = (password: string) => {
  let errorMessage = '';

  switch (true) {
    case !/[A-Z]/.test(password):
      errorMessage = 'Пароль має містити принаймні одну велику літеру';
      break;

    case !/\d/.test(password):
      errorMessage = 'Пароль має містити принаймні одну цифру';
      break;

    case !/[!@#$%^&*()_+\-=[\]{};:"'<>,.?/]/.test(password):
      errorMessage = 'Пароль має містити принаймні один спеціальний символ';
      break;

    case password.length < 8:
      errorMessage = 'Пароль має бути щонайменше 8 символів довжиною';
      break;

    default:
      return { isValid: true, message: '' };
  }

  return { isValid: false, message: errorMessage };
};

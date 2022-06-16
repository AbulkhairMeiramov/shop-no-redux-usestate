export function required(message) {
  return message || "Обязательное поле";
}

export function validatePassword(value) {
  if (value.length < 8) return "Minimum 8 symbols";
}

export function validateCPassword(password) {
  return function (value) {
    if (value !== password) {
      return "Passwords are not same";
    }
  };
}

export function authValues(values) {
  const login = JSON.parse(localStorage.getItem("users"));
  if (login) {
    for (let i = 0; i < login.length; i++) {
      if (login[i].email === values.email) {
        if (login[i].password === values.password) {
          return true;
        }
      }
    }
  }
}

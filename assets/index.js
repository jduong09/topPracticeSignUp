document.addEventListener('DOMContentLoaded', () => {
  const formNewUser = document.getElementById('form-create-user');
  const formElements = formNewUser.elements;

  formNewUser.addEventListener('submit', (e) => {
    e.preventDefault();
    // index 0 - 4 are elements that need to be validated. 5th/last one is submit button.
    for (let i = 0; i < 5; i++) {
      if (!formElements[i].validity.valid) {
        return false;
      }
    }
    // form is valid, run logic for signing up user...
  });

  // Event Listener for each input, checking validity on input.
  for (let i = 0; i < 5; i++) {
    const formInput = formElements[i];

    formInput.addEventListener('input', (e) => {
      e.preventDefault();
      checkValidity(formInput);
    });
  }
});

const checkValidity = (input) => {
  const parentElement = input.parentElement;
  const spanChildElement = parentElement.children[parentElement.children.length - 1];

  // separate check for input zip code because input validity pattern mismatch does not work.
  // Input zip code uses text but the pattern regex takes in numbers as digits, not string digits.
  if (input.id === 'zipcode') {
    const regex = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
    if (!regex.test(input.value)) {
      spanChildElement.innerHTML = 'Error: Input does not match pattern: xxxxx or xxxxx-xxxx';
      spanChildElement.classList.add('active');
    } else {
      spanChildElement.innerHTML = '';
      spanChildElement.classList.remove('active');
    }
    return;
  }

  // Separate check for password input.
  if (input.id === 'password') {
    checkPasswordValidity();
    return;
  }

  // Separate check if password confirmation matches password.
  if (input.id === 'password-confirmation' && checkPasswordValidity()) {
    const password = document.getElementById('password').value;

    if (input.value !== password) {
      spanChildElement.innerHTML = 'Error: Passwords do not match.';
      spanChildElement.classList.add('active');
    } else {
      spanChildElement.innerHTML = '';
      spanChildElement.classList.remove('active');
    }
    return;
  }

  // Input that is required and is missing.
  if (input.validity.valueMissing) {
    spanChildElement.innerHTML = 'Error: Input is missing.';
    spanChildElement.classList.add('active');
  } else if (input.validity.typeMismatch) {
    // Input that does not match email format.
    spanChildElement.innerHTML = 'Error: Invalid email format ex: xxx@email.com';
    spanChildElement.classList.add('active');
  } else if (input.validity.tooLong) {
    // Input that is longer than maxLength attribute.
    spanChildElement.innerHTML = `Error: Input is ${input.value.length} characters. Should be ${input.max} characters.`;
    spanChildElement.classList.add('active');
  } else {
    // Valid input, remove error message.
    spanChildElement.innerHTML = '';
    spanChildElement.classList.remove('active');
  }
};


const checkPasswordValidity = () => {
  const spanPasswordError = document.getElementById('error-password');
  const divPasswordRequirement = document.getElementById('password-requirements');

  const password = document.getElementById('password').value;
  if (password.length < 8) {
    spanPasswordError.innerHTML = 'Error: Password not longer than 8 characters';
    spanPasswordError.classList.add('active');
    divPasswordRequirement.classList.remove('hide');
    return false;
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);
  if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 3) {
    spanPasswordError.innerHTML = 'Error: Password does not meet requirements.';
    spanPasswordError.classList.add('active');
    divPasswordRequirement.classList.remove('hide');
    return false;
  }

  spanPasswordError.innerHTML = '';
  spanPasswordError.classList.remove('active');
  divPasswordRequirement.classList.add('hide');
  return true;
};
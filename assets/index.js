document.addEventListener('DOMContentLoaded', () => {
  const formNewUser = document.getElementById('form-create-user');
  const formElements = formNewUser.elements;

  formNewUser.addEventListener('submit', (e) => {
    e.preventDefault();
    // index 0 - 4 are elements that need to be validated. 5th/last one is submit button.

    console.log(formElements);

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

  console.log(input.validity);
  // Required input that is empty.
  if (input.validity.valueMissing) {
    spanChildElement.innerHTML = 'Error: Input is missing.';
    spanChildElement.classList.add('active');
  } else if (input.validity.typeMismatch) {
    spanChildElement.innerHTML = 'Error: Invalid email format ex: xxx@email.com';
    spanChildElement.classList.add('active');
  } else {
    spanChildElement.innerHTML = '';
    spanChildElement.classList.remove('active');
  }
};
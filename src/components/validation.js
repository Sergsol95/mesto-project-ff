const getErrorElement = (form, input) => form.querySelector(`.${input.id}-error`);

const showError = (form, input, { inputErrorClass, errorClassActive }) => {
  input.classList.add(inputErrorClass);
  const errorEl = getErrorElement(form, input);
  errorEl.textContent = input.validationMessage;
  errorEl.classList.add(errorClassActive);
};

const hideError = (form, input, { inputErrorClass, errorClassActive }) => {
  input.classList.remove(inputErrorClass);
  const errorEl = getErrorElement(form, input);
  errorEl.textContent = '';
  errorEl.classList.remove(errorClassActive);
};

const checkValidity = (form, input, settings) => {
  const { patternMismatch } = input.validity;
  input.setCustomValidity(patternMismatch ? input.dataset.errorMessage : '');

  input.validity.valid
    ? hideError(form, input, settings)
    : showError(form, input, settings);
};

const hasInvalidInput = inputs => inputs.some(input => !input.validity.valid);

const toggleButtonState = (inputs, button, { inactiveButtonClass }) => {
  if (!button) return;
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (form, settings) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkValidity(form, input, settings);
      toggleButtonState(inputs, button, settings);
    });
  });
};

const enableValidation = settings => {
  document.querySelectorAll(settings.formSelector).forEach(form => {
    setEventListeners(form, settings);
  });
};

const clearValidation = (form, settings) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  inputs.forEach(input => hideError(form, input, settings));
  toggleButtonState(inputs, button, settings);
};

export { enableValidation, clearValidation };

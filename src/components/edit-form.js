import { closeModal } from "./modal.js";

export const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
jobInput.value = profileDescription.textContent;
nameInput.value = profileName.textContent;

export const handleEditFormSubmit = (evt, popup) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popup);
};

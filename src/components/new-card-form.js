import { createCardElement, removeCard, handleCardLike } from './card.js';
import { showFullImage } from './full-image.js';
import { closeModal } from './modal.js';

export const newPlaceForm = document.forms["new-place"];
const placeInput = newPlaceForm.elements["place-name"];
const linkInput = newPlaceForm.elements["link"];

export const handleAddPlaceSubmit = (evt, popup) => {
  evt.preventDefault();

  const cardObject = {
    name: placeInput.value,
    link: linkInput.value,
  };

  const newCard = createCardElement(
    cardObject,
    removeCard,
    handleCardLike,
    showFullImage
  );

  document.querySelector(".places__list").prepend(newCard);
  closeModal(popup);
  newPlaceForm.reset();
};

import { toggleLike } from "./card.js";
import { showFullImage } from "./full-image.js";
import { closeModal } from "./modal.js";
import { createCard } from "./card.js";
import { deleteCard } from "./card.js";
export const newCardForm = document.forms["new-place"];
const placeInput = newCardForm.elements["place-name"];
const linkInput = newCardForm.elements["link"];

export const addCard = (evt, popup) => {
  evt.preventDefault();
  const cardObject = {
    name: placeInput.value,
    link: linkInput.value,
  };
  const newCard = createCard(cardObject, deleteCard, toggleLike, showFullImage);
  document.querySelector(".places__list").prepend(newCard);
  closeModal(popup);
  newCardForm.reset();
};

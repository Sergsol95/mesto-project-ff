import "/src/index.css";

import { initialCards } from "./components/cards.js";
import { openModal, addListener } from "./components/modal.js";
import { editForm, handleEditFormSubmit } from "./components/edit-form.js";
import { newCardForm, addCard } from "./components/new-card-form.js";
import { createCard, toggleLike, deleteCard } from "./components/card.js";
import { showFullImage } from "./components/full-image.js";

const cardList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupFullImage = document.querySelector(".popup_type_image");

const closeButtons = {
  edit: popupEdit.querySelector(".popup__close"),
  newCard: popupNewCard.querySelector(".popup__close"),
  fullImage: popupFullImage.querySelector(".popup__close"),
};

function renderInitialCards(cards) {
  cards.forEach((cardData) => {
    const card = createCard(cardData, deleteCard, toggleLike, showFullImage);
    cardList.append(card);
  });
}

function setEventListeners() {
  editButton.addEventListener("click", () => openModal(popupEdit));
  addButton.addEventListener("click", () => openModal(popupNewCard));

  addListener(popupEdit, closeButtons.edit);
  addListener(popupNewCard, closeButtons.newCard);
  addListener(popupFullImage, closeButtons.fullImage);

  editForm.addEventListener("submit", (evt) => handleEditFormSubmit(evt, popupEdit));
  newCardForm.addEventListener("submit", (evt) => addCard(evt, popupNewCard));
}

function init() {
  renderInitialCards(initialCards);
  setEventListeners();
}

init();

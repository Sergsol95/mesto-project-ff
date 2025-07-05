import "/src/index.css";

import { initialCards } from "./components/cards.js";
import { openModal } from "./components/modal.js";
import { addCloseListeners } from "./components/modal.js";
import { editForm as profileForm, handleProfileFormSubmit } from "./components/edit-form.js";
import { newPlaceForm, handleAddPlaceSubmit } from "./components/new-card-form.js";
import { createCardElement, removeCard, handleCardLike } from "./components/card.js";

const cardsContainer = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addPlacePopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
export { imagePopup };

const popupCloseControls = {
  edit: editProfilePopup.querySelector(".popup__close"),
  add: addPlacePopup.querySelector(".popup__close"),
  image: imagePopup.querySelector(".popup__close"),
};

function renderInitialCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCardElement(
      cardData,
      removeCard,
      handleCardLike,
      showImagePopup
    );
    cardsContainer.append(cardElement);
  });
}

function showImagePopup(cardObject) {
  openModal(imagePopup);
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = cardObject.link;
  popupImage.alt = cardObject.name;
  popupCaption.textContent = cardObject.name;
}

function attachEventListeners() {
  editProfileButton.addEventListener("click", () => openModal(editProfilePopup));
  addPlaceButton.addEventListener("click", () => openModal(addPlacePopup));

  addCloseListeners(editProfilePopup, popupCloseControls.edit);
  addCloseListeners(addPlacePopup, popupCloseControls.add);
  addCloseListeners(imagePopup, popupCloseControls.image);

  profileForm.addEventListener(
    "submit",
    (evt) => handleProfileFormSubmit(evt, editProfilePopup)
  );
  newPlaceForm.addEventListener(
    "submit",
    (evt) => handleAddPlaceSubmit(evt, addPlacePopup)
  );
}

function initializeApp() {
  renderInitialCards(initialCards);
  attachEventListeners();
}

initializeApp();


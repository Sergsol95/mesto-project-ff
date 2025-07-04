import "/src/index.css";

import { initialCards } from "./components/cards.js";
import { openModal, addListener } from "./components/modal.js";
import { editForm as profileForm, handleEditFormSubmit } from "./components/edit-form.js";
import { newCardForm, addCard as handleNewPlaceFormSubmit } from "./components/new-card-form.js";
import { createCard, deleteCard, toggleLike } from "./components/card.js";

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addPlacePopup = document.querySelector(".popup_type_new-card");
const popupFullImage = document.querySelector(".popup_type_image");
export { popupFullImage };

const popupCloseButtons = {
  editProfile: editProfilePopup.querySelector(".popup__close"),
  addPlace: addPlacePopup.querySelector(".popup__close"),
  fullImage: popupFullImage.querySelector(".popup__close"),
};

function renderInitialCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      toggleLike,
      handleImageClick
    );
    placesList.append(cardElement);
  });
}

function handleImageClick(evt) {
  const { src: link, alt: name } = evt.target;
  openModal(popupFullImage);
  const popupImage = popupFullImage.querySelector(".popup__image");
  const popupCaption = popupFullImage.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

function setEventListeners() {
  editProfileButton.addEventListener("click", () => openModal(editProfilePopup));
  addPlaceButton.addEventListener("click", () => openModal(addPlacePopup));

  addListener(editProfilePopup, popupCloseButtons.editProfile);
  addListener(addPlacePopup, popupCloseButtons.addPlace);
  addListener(popupFullImage, popupCloseButtons.fullImage);

  profileForm.addEventListener("submit", (evt) => handleEditFormSubmit(evt, editProfilePopup));
  newCardForm.addEventListener("submit", (evt) => handleNewPlaceFormSubmit(evt, addPlacePopup));
}

function init() {
  renderInitialCards(initialCards);
  setEventListeners();
}

init();

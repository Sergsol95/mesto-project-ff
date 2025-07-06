import "../pages/index.css";
import { createCard, handleLikeClick } from "../components/card.js";
import {
  openPopup,
  closePopupButtonAndOverlay,
  closePopup,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addCard,
  updateAvatar,
} from "./api.js";
import { configEl } from "../utils/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);

  const renderLoading = (formEl, isLoading, text = "Сохранение...") => {
    const btn = formEl.querySelector(".popup__button");
    if (!btn) return;
    btn.dataset.oldText ??= btn.textContent;
    btn.textContent = isLoading ? text : btn.dataset.oldText;
  };

  const renderResultError = (resultEl, errorEl) => ({
    success: (text) => {
      resultEl.textContent = text;
      errorEl.textContent = "";
    },
    failure: (err) => {
      errorEl.textContent = err;
      resultEl.textContent = "";
    },
  });

  const popups             = document.querySelectorAll(".popup");
  const profileTitle       = $(".profile__title");
  const profileDesc        = $(".profile__description");
  const profileImage       = $(".profile__image");
  const avatarContainer    = $(".profile__avatar-container");
  const placesList         = $(".places__list");

  const popupEditProfile   = $(".popup_type_edit");
  const popupAddCard       = $(".popup_type_new-card");
  const popupChangeAvatar  = $(".popup_type_avatar");
  const popupImage         = $(".popup_type_image");
  const popupImgEl         = $(".popup__image");
  const popupCaption       = $(".popup__caption");

  const editBtn            = $(".profile__edit-button");
  const addBtn             = $(".profile__add-button");

  const nameInput          = popupEditProfile.querySelector(".popup__input_type_name");
  const descInput          = popupEditProfile.querySelector(".popup__input_type_description");
  const postForm           = popupAddCard.querySelector(".popup__form");
  const postNameInput      = popupAddCard.querySelector(".popup__input_type_card-name");
  const postUrlInput       = popupAddCard.querySelector(".popup__input_type_url");

  const avatarInput        = popupChangeAvatar.querySelector(".popup__input_type_url-avatar");

  const { success, failure } = renderResultError(
    $(".content__result"),
    $(".content__error")
  );

  let currentUserId = "";

  enableValidation(configEl);

  popups.forEach((popup) =>
    popup.addEventListener("click", (e) =>
      closePopupButtonAndOverlay(e, popup)
    )
  );

  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id;
      profileTitle.textContent = userData.name;
      profileDesc.textContent = userData.about;
      profileImage.src = userData.avatar;

      cards.forEach((card) => {
        placesList.prepend(createCard(card, openImagePopup, currentUserId));
      });
    })
    .catch((err) =>
      console.error("Ошибка при загрузке данных карточек:", err)
    );

  function openEditPopup() {
    nameInput.value = profileTitle.textContent;
    descInput.value = profileDesc.textContent;
    clearValidation(popupEditProfile, configEl);
    openPopup(popupEditProfile);
  }

  function openAddPopup() {
    clearValidation(popupAddCard, configEl);
    openPopup(popupAddCard);
  }

  function openAvatarPopup() {
    clearValidation(popupChangeAvatar, configEl);
    openPopup(popupChangeAvatar);
  }

  function openImagePopup(cardData) {
    popupImgEl.src = cardData.link;
    popupImgEl.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(popupImage);
  }

  editBtn.addEventListener("click", openEditPopup);
  addBtn.addEventListener("click", openAddPopup);
  avatarContainer.addEventListener("click", openAvatarPopup);

  popupEditProfile.addEventListener("submit", (e) => {
    e.preventDefault();
    renderLoading(popupEditProfile, true);

    updateUserInfo(nameInput.value, descInput.value)
      .then((data) => {
        profileTitle.textContent = data.name;
        profileDesc.textContent = data.about;
        closePopup(popupEditProfile);
      })
      .catch((err) =>
        console.error("Ошибка при сохранении профиля:", err)
      )
      .finally(() => renderLoading(popupEditProfile, false));
  });

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    renderLoading(popupAddCard, true);

    addCard(postNameInput.value, postUrlInput.value)
      .then((newCard) => {
        placesList.prepend(createCard(newCard, openImagePopup, currentUserId));
        closePopup(popupAddCard);
        postForm.reset();
      })
      .catch(() => console.error("Ошибка добавления карточки"))
      .finally(() => renderLoading(popupAddCard, false));
  });

  popupChangeAvatar.addEventListener("submit", (e) => {
    e.preventDefault();
    renderLoading(popupChangeAvatar, true);

    updateAvatar(avatarInput.value)
      .then((data) => {
        profileImage.src = data.avatar;
        closePopup(popupChangeAvatar);
      })
      .catch((err) =>
        console.error("Ошибка при обновлении аватара:", err)
      )
      .finally(() => renderLoading(popupChangeAvatar, false));
  });
});

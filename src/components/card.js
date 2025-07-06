import { putLike, deleteLike, deleteCardApi } from "../scripts/api";

function createCard(cardData, handleImageClick, userID) {
  const { link, name, likes, _id: cardID, owner } = cardData;
  const template = document.querySelector("#card-template").content;
  const cardElement = template
    .querySelector(".places__item")
    .cloneNode(true);

  const imageEl = cardElement.querySelector(".card__image");
  const titleEl = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const likeCountEl = cardElement.querySelector(".card__number-likes");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  imageEl.src = link;
  imageEl.alt = name;
  titleEl.textContent = name;
  likeCountEl.textContent = likes.length;

  const isOwner = owner._id === userID;
  if (!isOwner) deleteBtn.remove();

  const isInitiallyLiked = likes.some(user => user._id === userID);
  if (isInitiallyLiked) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  function updateLike() {
    const action = likeBtn.classList.contains("card__like-button_is-active")
      ? deleteLike(cardID)
      : putLike(cardID);

    action
      .then(updatedCard => {
        likeCountEl.textContent = updatedCard.likes.length;
        likeBtn.classList.toggle("card__like-button_is-active");
      })
      .catch(err => console.error("Ошибка при обновлении лайка:", err));
  }

  likeBtn.addEventListener("click", updateLike);

  if (isOwner) {
    deleteBtn.addEventListener("click", () => {
      deleteCardApi(cardID)
        .then(() => cardElement.remove())
        .catch(err => console.error("Ошибка удаления карточки:", err));
    });
  }

  imageEl.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

export { createCard };

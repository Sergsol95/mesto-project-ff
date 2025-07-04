const cardsTemplate = document.querySelector("#card-template").content;
export function createCard(cardObject, deleteCallback, likeCallback, showFullImageCallback) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardTitle.textContent = cardObject.name;
  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;
  cardDeleteButton
    .addEventListener("click", (evt) => {
      const deleteCard = evt.target.closest(".card");
      deleteCallback(deleteCard);
    });
  cardLikeButton
    .addEventListener("click", likeCallback);
  cardImage.addEventListener("click", showFullImageCallback);
  return cardElement;
}

export function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

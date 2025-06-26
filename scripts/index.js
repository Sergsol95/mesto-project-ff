// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function deleteCard(cardEl) {
  cardEl.remove();
}

function createCard({ name, link }, onDelete) {
  const cardClone = cardTemplate.cloneNode(true);
  const titleElem = cardClone.querySelector('.card__title');
  const imgElem = cardClone.querySelector('.card__image');
  const deleteBtn = cardClone.querySelector('.card__delete-button');

  titleElem.textContent = name;
  imgElem.src = link;
  imgElem.alt = name;

  deleteBtn.addEventListener('click', () => {
    const cardElem = deleteBtn.closest('.card');
    onDelete(cardElem);
  });

  return cardClone;
}

initialCards.forEach(cardData => {
  const cardItem = createCard(cardData, deleteCard);
  placesList.appendChild(cardItem);
});

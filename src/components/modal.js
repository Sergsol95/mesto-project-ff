const ESC_KEY = 'Escape';

function openPopup(popup) {
  if (!popup) return;
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  if (!popup) return;
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupButtonAndOverlay(evt, popup) {
  const { target } = evt;
  if (target.classList.contains('popup__close') || target === popup) {
    closePopup(popup);
  }
}

function closePopupEsc(evt) {
  if (evt.key !== ESC_KEY) return;

  const opened = document.querySelector('.popup.popup_is-opened');
  if (opened) closePopup(opened);
}

export {
  openPopup,
  closePopup,
  closePopupEsc,
  closePopupButtonAndOverlay
};

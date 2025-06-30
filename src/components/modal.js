const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
};

export const addListener = (popupElement, closeBtn) => {
  closeBtn.addEventListener("click", () => {
    closeModal(popupElement);
  });

  popupElement.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(popupElement);
    }
  });
};

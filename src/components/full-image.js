import { openModal } from "./modal.js";
import { imagePopup } from "../index.js";

export function showFullImage(evt) {
  openModal(imagePopup);
  const imgElement = imagePopup.querySelector(".popup__image");
  const captionElement = imagePopup.querySelector(".popup__caption");
  imgElement.src = evt.target.src;
  imgElement.alt = evt.target.alt;
  captionElement.textContent = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;
}

import { openModal } from "./modal.js";
import { popupFullImage } from "../index.js";

export function showFullImage(evt) {
  openModal(popupFullImage);
  const imgElement = popupFullImage.querySelector(".popup__image");
  const captionElement = popupFullImage.querySelector(".popup__caption");
  imgElement.src = evt.target.src;
  imgElement.alt = evt.target.alt;
  captionElement.textContent = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;
}

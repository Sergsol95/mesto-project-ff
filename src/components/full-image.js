import { openModal } from "./modal.js";
import { imagePopup } from "../index.js";


export function showFullImage(cardObject) {
  openModal(imagePopup);
  const imgElement = imagePopup.querySelector(".popup__image");
  const captionElement = imagePopup.querySelector(".popup__caption");

  imgElement.src = cardObject.link;
  imgElement.alt = cardObject.name;
  captionElement.textContent = cardObject.name;
}
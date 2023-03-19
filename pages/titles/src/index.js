import cardsFactory from "./factories/cardsFactory.js";
import handGestureFactory from "./factories/handGestureFactory.js";

await cardsFactory.initalize();
await handGestureFactory.initalize();

const powerBtn = document.querySelector("#power-btn-gesture");

if (powerBtn.classList.value == "box-toggle-gesture-btn active") {
}

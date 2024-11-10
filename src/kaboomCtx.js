// File for the setup of Kaboom
import kaboom from "kaboom";

export const k = kaboom({
    global: false,
    // touchToMouse transforme les 'touch' sur le téléphone en 'click' de souris
    touchToMouse: true,
    // canvas import from index.html file
    canvas: document.getElementById("game"),
});
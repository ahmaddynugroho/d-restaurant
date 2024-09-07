import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";

/** @param {string} query */
const q = (query) => document.querySelector(query);
/** @param {string} query */
const qa = (query) => document.querySelectorAll(query);

/** @type {HTMLButtonElement} */
const showNavMenuButton = q("#show-menu");
/** @type {NodeListOf<HTMLAnchorElement>} */
const navLinks = qa("nav a");
showNavMenuButton.addEventListener("click", (e) => {
  navLinks.forEach((e) => {
    const currentDisplay = e.style.display;
    e.style.display =
      currentDisplay === "inline-block" ? "none" : "inline-block";
  });
});

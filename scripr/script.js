"use strict";
function menuActive() {
    const menuLink = Array.from(document.querySelectorAll(".menu__list-item-link"));
    menuLink.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.add("menu__list-item-link_active");
        });
    });
}
menuActive();

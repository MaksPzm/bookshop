function menuActive(): void {
    const menuLink: any = Array.from(document.querySelectorAll(".menu__list-item-link"));
    menuLink.forEach((item: HTMLLinkElement) => {
        item.addEventListener('click', () => {
            item.classList.add("menu__list-item-link_active");
        })
    })
}
menuActive()
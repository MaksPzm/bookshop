export default function mobilActiveMenu() {
    const mobillBtnMenu = document.querySelector(".header__mobil-menu");
    if (mobillBtnMenu === null) return;
    mobillBtnMenu.addEventListener('click', () => {
        const menuList = document.querySelector(".menu__mobil");
        menuList?.classList.toggle("menu__mobil_hidden");
    })
}
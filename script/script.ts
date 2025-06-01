import Sliders from "./slider";
function menuActive(): void {
    const menuLink: any = Array.from(document.querySelectorAll(".menu__list-item-link"));
    menuLink.forEach((item: HTMLLinkElement) => {
        item.addEventListener('click', () => {
            menuLink.forEach((value: HTMLLinkElement) => {
                value.classList.remove("menu__list-item-link_active")
            })
            item.classList.add("menu__list-item-link_active");
        })
    })
}
menuActive()

function slider(): void {
    const dots = [...document.querySelectorAll(".banner__slider-dots-dot")];
    const blockBanner: HTMLDivElement = <HTMLDivElement>document.querySelector(".baner__img");
    const img = ["/images/png/banner1.png", "/images/png/banner2.png", "/images/png/banner3.png"];
    const newSlider = new Sliders(dots, blockBanner, img);
    newSlider.slider()
    let indexDots = 0;
    const intervalSlider = new Sliders(dots, blockBanner, img, indexDots);
    intervalSlider.sliderInterval(5000);
}

slider()
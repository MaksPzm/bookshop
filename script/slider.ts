export default class Sliders {
    dots: Element[];
    blockBanner: HTMLDivElement;
    img: any[];
    indexDots?: number;
    constructor(dots: Element[], blockBanner: HTMLDivElement, img: any[], indexDots?: number){
        this.img = img;
        this.dots = dots;
        this.blockBanner = blockBanner;
        this.indexDots = indexDots;
    }
    slider() {
        this.dots.forEach((dot: Element, index: number) => {
            dot.addEventListener("click", () => {
                this.dots.forEach((value: Element) => {value.classList.remove("banner__slider-dots-dot_active")});
                dot.classList.add("banner__slider-dots-dot_active");
                if(this.img == undefined ) return;
                this.blockBanner.innerHTML = `<img src=${this.img[index]}>`;
            })
        })
    }
    sliderInterval(num: number) {
        let index: number = <number>this.indexDots;
        if(index == undefined) return;
        setInterval(() => {
            this.dots.forEach((value: Element) => {value.classList.remove("banner__slider-dots-dot_active")});
            if(index == this.dots.length) index = 0; 
            
            this.dots[index].classList.add("banner__slider-dots-dot_active");
            this.blockBanner.innerHTML = `<img src=${this.img[index]}>`;
            index += 1;
        }, num)
        
    }
}



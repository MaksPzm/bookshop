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

class Book {
    img;
    after;
    name; 
    rating;
    description;
    price;
    constructor(img, after, name, rating, description, price) {
        this.img = img;
        this.after = after;
        this.name = name;
        this.rating = rating;
        this.description = description;
        this.price = price;
    }
    showBooks(){

    }
}

 


const selectedCategory = (() => {
    const valueSelectedCategory: string[] = [ ];
    const categories = document.querySelectorAll(".containner__categories-list-item");
    categories.forEach((category) => {
        category.addEventListener('click', () => {
            const categoriesInputActive = document.querySelector(".containner__categories-list-item-submit_active")
            categories.forEach((value) => value.classList.remove("containner__categories-list-item_active"));
            categoriesInputActive?.classList.remove("containner__categories-list-item-submit_active");
            category.classList.add("containner__categories-list-item_active");
            category.querySelector(".containner__categories-list-item-submit")?.classList.add("containner__categories-list-item-submit_active");
            const valueCategory: null | HTMLInputElement = document.querySelector(".containner__categories-list-item-submit_active");
            if (valueCategory !== null) {
                valueSelectedCategory.pop();
                valueSelectedCategory.unshift(valueCategory.value);
                localStorage.setItem("category", JSON.stringify(valueSelectedCategory.join()))
            }
            console.log("value", valueSelectedCategory);
            API()
            saveCategoriesActive()
            location.reload()
        })
    })
    
})()

function saveCategoriesActive() {
    const categories = document.querySelectorAll(".containner__categories-list-item");
    // categories.forEach((value, index, array) => {
    //     let active = value.classList.contains("containner__categories-list-item_active");
    //     console.log("a", active);
        
    // }) 
    const activeCat = document.querySelector(".containner__categories-list-item_active")?.getAttribute("index");
    if (activeCat !== null) {
       localStorage.setItem("indexActive", JSON.stringify(activeCat))  
    }   
}

loadCategoriesActive()

function loadCategoriesActive() {
    let localIndexActive: number = localStorage.getItem("indexActive") ? parseInt(JSON.parse(<string>localStorage.getItem("indexActive"))) : +0;
    console.log("Мы здесь");
    const categories = document.querySelectorAll(".containner__categories-list-item");
    const categoriesInput = document.querySelectorAll(".containner__categories-list-item-submit");
    categories.forEach(category => category.classList.remove("containner__categories-list-item_active"));
    categoriesInput.forEach(categoryInput => categoryInput.classList.remove("containner__categories-list-item-submit_active"));
    if (localIndexActive === null) return;
    categories[localIndexActive].classList.add("containner__categories-list-item_active");
    categoriesInput[localIndexActive].classList.add("containner__categories-list-item-submit_active");
}



function API() {
    let category: string = localStorage.getItem("category") ? <string>localStorage.getItem("category") : "Architecture";
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=AIzaSyCvzFkuSjiZgJOh90lZaYuv9qUT2xypKNs&printType=books&startIndex=0&maxResults=6&langRestrict=en`)
        .then((response) => response.json())
        .then(displayResult)
        .catch((err) => console.log("ERROR"))
        
}
API()

function displayResult(data: any) {
    let resultAPI = data.items;
    const containerBooks: HTMLDivElement | null = document.querySelector(".container__books");
    console.log("22", resultAPI);
    for (let i = 0; i < resultAPI.length; i++) {
        let price: number | string = resultAPI[i].saleInfo.retailPrice ? "$" + (resultAPI[i].saleInfo.retailPrice.amount / 80).toFixed(2) : "free";
        console.log("pr", price);
        let averageRating: string = resultAPI[i].volumeInfo.averageRating ? resultAPI[i].volumeInfo.averageRating : "The rating is not";
        let ratingsCount: string = resultAPI[i].volumeInfo.ratingsCount ? resultAPI[i].volumeInfo.ratingsCount + " review" : " ";
        const showBook = `
            <div class="container__books-block" index=${i} id="book-${i}">
                <img class="container__books-block-img" src="${resultAPI[i].volumeInfo.imageLinks.thumbnail}">
                <div class="container__books-block-info">
                    <span class="container__books-block-info-autor">${resultAPI[i].volumeInfo.authors[0]}</span>
                    <h2 class="container__books-block-info-title">${resultAPI[i].volumeInfo.title}</h2>
                    <div class="container__books-block-info-rating">
                        <div class="container__books-block-info-rating-averageRating">${averageRating}</div>
                        <span class="container__books-block-info-rating-ratingsCount">${ratingsCount}</span>
                    </div>
                    <p class="container__books-block-info-description">${resultAPI[i].volumeInfo.description}</p>
                    <span class="container__books-block-info-price">${price}</span>
                </div>
            </div>
        `
        containerBooks?.insertAdjacentHTML("beforeend", showBook)
    }
    
}
import Sliders from "./slider";
import dataBook from "./dataBook";
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

const selectedCategory = (() => {
    const valueSelectedCategory: string[] = [ ];
    const categories = document.querySelectorAll(".containner__categories-list-item");
    categories.forEach((category) => {
        category.addEventListener('click', () => {
            const containerBooks = document.querySelectorAll(".container__books-block");
            if (containerBooks !== null) {
                containerBooks.forEach(books => {
                    books.remove()
                })
            }
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
            API()
            saveCategoriesActive()
        })
    })
    
})()

function saveCategoriesActive() {
    const categories = document.querySelectorAll(".containner__categories-list-item");
    const activeCat = document.querySelector(".containner__categories-list-item_active")?.getAttribute("index");
    if (activeCat !== null) {
       localStorage.setItem("indexActive", JSON.stringify(activeCat))  
    }   
}

loadCategoriesActive()

function loadCategoriesActive() {
    let localIndexActive: number = localStorage.getItem("indexActive") ? parseInt(JSON.parse(<string>localStorage.getItem("indexActive"))) : +0;
    const categories = document.querySelectorAll(".containner__categories-list-item");
    const categoriesInput = document.querySelectorAll(".containner__categories-list-item-submit");
    categories.forEach(category => category.classList.remove("containner__categories-list-item_active"));
    categoriesInput.forEach(categoryInput => categoryInput.classList.remove("containner__categories-list-item-submit_active"));
    if (localIndexActive === null) return;
    categories[localIndexActive].classList.add("containner__categories-list-item_active");
    categoriesInput[localIndexActive].classList.add("containner__categories-list-item-submit_active");
}

function API(startIndex = 0, maxResults = 6) {
    let category: string = localStorage.getItem("category") ? <string>localStorage.getItem("category") : "Architecture";
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=AIzaSyCvzFkuSjiZgJOh90lZaYuv9qUT2xypKNs&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`)
        .then((response) => response.json())
        .then(displayResult)
        .then(dataBook)
        .catch((err) => console.log("ERROR"))
}
API()

function displayResult(data: any) {

    let resultAPI = data.items;
    const containerBooks: HTMLDivElement | null = document.querySelector(".container__books");
    for (let i = 0; i < resultAPI.length; i++) {
        let img = resultAPI[i].volumeInfo.imageLinks.thumbnail ? resultAPI[i].volumeInfo.imageLinks.thumbnail : "";
        let title = resultAPI[i].volumeInfo.title ? resultAPI[i].volumeInfo.title : "";
        let price: number | string = resultAPI[i].saleInfo.retailPrice ? "$" + (resultAPI[i].saleInfo.retailPrice.amount / 80).toFixed(2) : "";
        let authors: string = resultAPI[i].volumeInfo.authors ? (resultAPI[i].volumeInfo.authors).join(", ") : "";
        let averageRating: string = resultAPI[i].volumeInfo.averageRating ? resultAPI[i].volumeInfo.averageRating : "";
        let ratingsCount: string = resultAPI[i].volumeInfo.ratingsCount ? resultAPI[i].volumeInfo.ratingsCount + " review" : "";
        let description: string = resultAPI[i].volumeInfo.description ? resultAPI[i].volumeInfo.description : "There is no description";
        const showBook = `
            <div class="container__books-block" index=${i} id="book-${i}">
                <img class="container__books-block-img" src="${img}">
                <div class="container__books-block-info">
                    <span class="container__books-block-info-autor">${authors}</span>
                    <h2 class="container__books-block-info-title">${title}</h2>
                    <div class="container__books-block-info-rating">
                        <div class="container__books-block-info-rating-averageRating"><span class="container__books-block-info-rating-averageRating-textSp">${averageRating}</span></div>
                        <span class="container__books-block-info-rating-ratingsCount">${ratingsCount}</span>
                    </div>
                    <p class="container__books-block-info-description">${description}</p>
                    <span class="container__books-block-info-price">${price}</span>
                    <button type="button" class="container__books-block-info-btn">buy now</button>
                </div>
            </div>
        `
        containerBooks?.insertAdjacentHTML("beforeend", showBook);
    }
    averageRating()
}

function averageRating() {
    let newImgGold = `<img class="container__books-block-info-rating-averageRating-star-gold" src="./images/svg/StarGo.svg" als="star">`;
    let imgStar = `<img class="container__books-block-info-rating-averageRating-star-gold" src="./images/svg/Star.svg" als="star">`;
    const divAverageRating = document.querySelectorAll(".container__books-block-info-rating-averageRating");
    
    divAverageRating.forEach((div, index, array) => {
        let textSpan: any = div.querySelector(".container__books-block-info-rating-averageRating-textSp");
        if (textSpan === null) return;
        let numContent: number = +textSpan.textContent;
        let resultRating = 5 - numContent;

        if (numContent > 0) {
            for (let i = 0; i < numContent; i++) {
                div.insertAdjacentHTML("beforeend", newImgGold);
            }
            for (let i = 0; i < resultRating; i++) {
                div.insertAdjacentHTML("beforeend", imgStar);
            }
        }
        let firsElementDivAverageRating = div.querySelector(".container__books-block-info-rating-averageRating-textSp");
        if (firsElementDivAverageRating !== null) firsElementDivAverageRating.remove();
        
    })
}


const loadMore = () => {
    const btnLoadMore = document.querySelector(".container__btn");
    if (btnLoadMore == null) return;
    let click = 1;
    let count = 6;
    btnLoadMore.addEventListener('click', (e) => {
        let startIndex = click * count;
        API(startIndex)
        click++;
    })
}
loadMore()



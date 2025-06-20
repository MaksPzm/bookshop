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
            console.log("value", valueSelectedCategory);
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
    console.log("Мы здесь");
    const categories = document.querySelectorAll(".containner__categories-list-item");
    const categoriesInput = document.querySelectorAll(".containner__categories-list-item-submit");
    categories.forEach(category => category.classList.remove("containner__categories-list-item_active"));
    categoriesInput.forEach(categoryInput => categoryInput.classList.remove("containner__categories-list-item-submit_active"));
    if (localIndexActive === null) return;
    categories[localIndexActive].classList.add("containner__categories-list-item_active");
    categoriesInput[localIndexActive].classList.add("containner__categories-list-item-submit_active");
}
let boocksData: any = [ ];
let boocksDataLocal: any = localStorage.getItem("publishedBooks") ? JSON.parse(localStorage.getItem("publishedBooks")) : [ ];
console.log("b.D", boocksDataLocal);

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
    console.log("22", resultAPI);
    for (let i = 0; i < resultAPI.length; i++) {
        let img = resultAPI[i].volumeInfo.imageLinks.thumbnail;
        let title = resultAPI[i].volumeInfo.title;
        let price: number | string = resultAPI[i].saleInfo.retailPrice ? "$" + (resultAPI[i].saleInfo.retailPrice.amount / 80).toFixed(2) : "";
        console.log("pr", price);
        let authors: string = (resultAPI[i].volumeInfo.authors).join(",");
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
                        <div class="container__books-block-info-rating-averageRating">${averageRating}</div>
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
}

function dataBook(): void {
    const btnBuy = document.querySelectorAll(".container__books-block-info-btn");
    console.log("btnBuy", btnBuy);
    let numberOfBoks = 0;
    btnBuy.forEach((bay, index, array) => {
        
        bay.addEventListener("click", () => {
            const boock = bay.closest(`#book-${index}`);
            if (boock == null) return;
            const indexBoock: string | null = boock.getAttribute("index")
            const imgBock: HTMLImageElement | null = boock?.querySelector(".container__books-block-img") ? boock.querySelector(".container__books-block-img") : null;
            let srcImgBock: string = ""
            if (imgBock !== null) srcImgBock = imgBock.src;
            const autorBock: string = <string>boock?.querySelector(".container__books-block-info-autor")?.textContent;
            const titleBock: string = <string>boock.querySelector(".container__books-block-info-title")?.textContent;
            const averageRatingBock: string | null = boock.querySelector(".container__books-block-info-rating-averageRating") ? <string>boock.querySelector(".container__books-block-info-rating-averageRating")?.textContent : null;
            const ratingCountBock: string | null = boock.querySelector(".container__books-block-info-rating-ratingsCount") ? <string>boock.querySelector(".container__books-block-info-rating-ratingsCount")?.textContent : null;
            const descriptionBock: string | null = boock.querySelector(".container__books-block-info-description") ? <string>boock.querySelector(".container__books-block-info-description")?.textContent : null;
            const priceBock: string | null = boock.querySelector(".container__books-block-info-price") ? <string>boock.querySelector(".container__books-block-info-price")?.textContent : null;
            type infoBock = {
                indexBoock: string | null,
                srcImgBock: string,
                autorBock: string,
                titleBock: string,
                averageRatingBock: string | null,
                ratingCountBock: string | null,
                descriptionBock: string | null,
                priceBock: string | null,
        };
            let infoBock: infoBock = {
                indexBoock: indexBoock,
                srcImgBock: srcImgBock,
                autorBock: autorBock,
                titleBock: titleBock,
                averageRatingBock: averageRatingBock,
                ratingCountBock: ratingCountBock,
                descriptionBock: descriptionBock,
                priceBock: priceBock
            }
            boocksData.push(infoBock);
            boocksDataLocal.push(infoBock);
            localStorage.setItem("publishedBooks", JSON.stringify(boocksDataLocal));
            
            if (bay.classList.contains("container__books-block-info-btn_active")) {
                bay.classList.remove("container__books-block-info-btn_active");
                numberOfBoks = numberOfBoks - 1;
                bay.innerHTML = "buy now";
                removeToBook(numberOfBoks)
                console.log(numberOfBoks, "numA");
            } else {
                bay.classList.add("container__books-block-info-btn_active");
                bay.innerHTML = "in the cart";
                numberOfBoks = numberOfBoks + 1;
                addToBook(numberOfBoks);
                console.log(numberOfBoks, "numB");
                

            }
            
        })
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
        console.log("click", startIndex);
        click++;
    })
}
loadMore()

const addToBook = (numberOfBoks: number) => {
    const cart: HTMLDivElement | null = document.querySelector(".header__user-block-cart");
    if (cart === null) return;
    const numberBooksDiv = document.querySelectorAll(".header__user-block-cart-numberBooks").length;
    if (numberBooksDiv == 0) {
        const numberBooks: HTMLDivElement = document.createElement("div");
        numberBooks.classList.add("header__user-block-cart-numberBooks");
        let numText = document.createElement("p");
        numText.classList.add("header__user-block-cart-numberBooks-text");
        numText.innerText = `${numberOfBoks}`;
        numberBooks.appendChild(numText);
        cart.appendChild(numberBooks);
    } else {
        const numberBooksText = document.querySelector(".header__user-block-cart-numberBooks-text");
        if (numberBooksText == null) return;
        numberBooksText.textContent = `${numberOfBoks}`
    }
    
}

const removeToBook = (numberOfBoks: number) => {
    const numberBooks = document.querySelector(".header__user-block-cart-numberBooks");
    const numberBooksText = document.querySelector(".header__user-block-cart-numberBooks-text");
    console.log('numberBooksText: ', numberBooksText);
    if (numberBooks == null) return;
    if (numberBooksText == null) return;
    numberBooksText.textContent = `${numberOfBoks}`;
    if (numberOfBoks === 0) numberBooks.remove();
}

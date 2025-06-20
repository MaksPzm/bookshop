
export default function dataBook(): void {
    let boocksData: any = [ ];
    console.log('boocksData: ', boocksData);
    let boocksDataLocal: any;
    
    if (localStorage.getItem("publishedBooks") !== null) {
        let parse = localStorage.getItem("publishedBooks")
        boocksDataLocal = JSON.parse(<string>parse);
    } else {
        boocksDataLocal = [ ];
    }
    const btnBuy = document.querySelectorAll(".container__books-block-info-btn");
    let numberOfBoks = 0;
    btnBuy.forEach((bay, index, array) => {
        
        bay.addEventListener("click", () => {
            // localStorage.clear()
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
                bay.classList.add("container__books-block-info-btn")
                numberOfBoks = numberOfBoks - 1;
                bay.innerHTML = "buy now";
                removeToBook(numberOfBoks);
            } else {
                bay.classList.add("container__books-block-info-btn_active");
                bay.classList.remove("container__books-block-info-btn")
                bay.innerHTML = "in the cart";
                numberOfBoks = numberOfBoks + 1;
                addToBook(numberOfBoks);
            }
            
        })
    })
    
    
}

const addToBook = (numberOfBoks: number) => {
    const cart: HTMLDivElement | null = document.querySelector(".header__user-block-cart");
    console.log(' cart: ',  cart);
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
    if (numberBooks == null) return;
    if (numberBooksText == null) return;
    numberBooksText.textContent = `${numberOfBoks}`;
    if (numberOfBoks === 0) numberBooks.remove();
}

export default function dataBook(): void {
    type infoBock = {
                indexBoock: string | null,
                srcImgBock: string,
                authorBock: string,
                titleBock: string,
                averageRatingBock: string | null,
                ratingCountBock: string | null,
                descriptionBock: string | null,
                priceBock: string | null,
            };
    let booksData: Array<infoBock> = [ ];
    let booksDataLocal: Array<infoBock>;
    if (localStorage.getItem("publishedBooks") !== null) {
        let parse = localStorage.getItem("publishedBooks")
        booksDataLocal = JSON.parse(<string>parse);
    } else {
        booksDataLocal = [ ];
    }
    let btnBuy = document.querySelectorAll(".container__books-block-info-btn");
    
    let numberOfBoks = 0;
    btnBuy.forEach((bay, index, array) => {
        bay.addEventListener("click", () => {
            const boock = bay.closest(`[index]`);
            if (boock == null) return;
            const indexBoock: string | null = boock.getAttribute("index")
            const imgBock: HTMLImageElement | null = boock?.querySelector(".container__books-block-img") ? boock.querySelector(".container__books-block-img") : null;
            let srcImgBock: string = ""
            if (imgBock !== null) srcImgBock = imgBock.src;
            const authorBock: string = <string>boock?.querySelector(".container__books-block-info-author")?.textContent;
            const titleBock: string = <string>boock.querySelector(".container__books-block-info-title")?.textContent;
            const averageRatingBock: string | null = boock.querySelector(".container__books-block-info-rating-averageRating") ? <string>boock.querySelector(".container__books-block-info-rating-averageRating")?.textContent : null;
            const ratingCountBock: string | null = boock.querySelector(".container__books-block-info-rating-ratingsCount") ? <string>boock.querySelector(".container__books-block-info-rating-ratingsCount")?.textContent : null;
            const descriptionBock: string | null = boock.querySelector(".container__books-block-info-description") ? <string>boock.querySelector(".container__books-block-info-description")?.textContent : null;
            const priceBock: string | null = boock.querySelector(".container__books-block-info-price") ? <string>boock.querySelector(".container__books-block-info-price")?.textContent : null;
            let infoBock: infoBock = {
                indexBoock: indexBoock,
                srcImgBock: srcImgBock,
                authorBock: authorBock,
                titleBock: titleBock,
                averageRatingBock: averageRatingBock,
                ratingCountBock: ratingCountBock,
                descriptionBock: descriptionBock,
                priceBock: priceBock
            };
            
            if (bay.classList.contains("container__books-block-info-btn_active")) {
                bay.classList.remove("container__books-block-info-btn_active");
                bay.classList.add("container__books-block-info-btn")
                numberOfBoks = numberOfBoks - 1;
                bay.innerHTML = "buy now";
                booksData.forEach((value, index) => {
                    if (booksData[index].indexBoock == indexBoock) {
                        booksData.splice(index, 1);
                    }
                })
                booksDataLocal.forEach((value, index) => {
                    if (booksDataLocal[index].indexBoock == indexBoock) {
                        booksDataLocal.splice(index, 1);
                    }
                })
                localStorage.setItem("publishedBooks", JSON.stringify(booksDataLocal));
                
                removeToBook(numberOfBoks);
            } else {
                bay.classList.add("container__books-block-info-btn_active");
                bay.classList.remove("container__books-block-info-btn")
                bay.innerHTML = "in the cart";
                numberOfBoks = numberOfBoks + 1;
                booksData.push(infoBock);
                booksDataLocal.push(infoBock);
                localStorage.setItem("publishedBooks", JSON.stringify(booksDataLocal));
                addToBook(numberOfBoks);
            }
        })
    })
}

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
    if (numberBooks == null) return;
    if (numberBooksText == null) return;
    numberBooksText.textContent = `${numberOfBoks}`;
    if (numberOfBoks === 0) numberBooks.remove();
}
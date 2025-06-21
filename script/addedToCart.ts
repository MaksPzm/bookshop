export default function cart() {
    const btnInTheCart = document.querySelectorAll("container__books-block-info-btn_active");
    console.log('btnInTheCart: ', btnInTheCart);

    btnInTheCart.forEach((btn, index, array) => {
        const parent = btn.parentElement;
        console.log('parent: ', parent);
    })
}

const toggleIcon = document.querySelector('.toggle-icon'),
toggleMenu = document.querySelector('.toggle-menu'),
closeMenu = document.querySelector('.uil-times'),
Title = document.querySelector('.Title'),
relatedProducts = document.querySelector('.products')
let carts;
if (localStorage.getItem("cart")) {
    carts = JSON.parse(localStorage.getItem("cart"))

} else {
    carts = []
}
console.log(carts)
toggleIcon.addEventListener('click', () => {
    toggleMenu.style.display = 'flex';
    toggleMenu.style.transform = 'translateX(0)';
 })
 closeMenu.addEventListener('click', () => {
     toggleMenu.style.transform = 'translateX(300px)';
     toggleMenu.style.display = 'none';
 })

let products = JSON.parse(localStorage.getItem("phones"))
products.forEach(pro => {
    let product = document.createElement('div')
    product.setAttribute('class', 'product')
    let asset = document.createElement('img')
    asset.src = pro.image;
    let title = document.createElement('p')
    title.innerHTML = pro.phone_name
    title.classList.add('title')
    let sellings = document.createElement('div')
    sellings.classList.add("buy")
    let logo = document.createElement('img')
    logo.src = 'https://icons.veryicon.com/png/o/education-technology/blue-gray-solid-blend-icon/shopping-cart-193.png';
    logo.addEventListener('click', () => {
        addToCart(pro)
    })
    let price = document.createElement('p')
    price.innerHTML = "265$"
    sellings.appendChild(price)
    sellings.appendChild(logo)
    product.appendChild(asset)
    product.appendChild(title)
    product.appendChild(sellings)
    relatedProducts.appendChild(product)
});
function addToCart(brand) {
    carts.push(brand)
    localStorage.setItem("cart", JSON.stringify(carts))
    window.open('../cartPage/cart.html', "_self")
}

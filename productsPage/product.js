const toggleIcon = document.querySelector('.toggle-icon'),
toggleMenu = document.querySelector('.toggle-menu'),
closeMenu = document.querySelector('.uil-times'),
Title = document.querySelector('.Title'),
inputField = document.querySelector('.searchBox input')
relatedProducts = document.querySelector('.products')
let carts;
let pricess;

if (localStorage.getItem('prices')) 
    pricess = JSON.parse(localStorage.getItem('prices'))
else
    pricess = []
// random prices for the products
let prices = ['854', '389', '227', '689', '865', '978', "1024", "569", "2656", "875"]
if (localStorage.getItem("cart")) {
    carts = JSON.parse(localStorage.getItem("cart"))
} else {
    carts = []
}
console.log(carts)

// array for searching

let pros = []

// variable for adding prices
let i = 0

toggleIcon.addEventListener('click', () => {
    toggleMenu.style.display = 'flex';
    toggleMenu.style.transform = 'translateX(0)';
 })
 closeMenu.addEventListener('click', () => {
     toggleMenu.style.transform = 'translateX(300px)';
     toggleMenu.style.display = 'none';
 })
 // adding the title of the brand
let title = JSON.parse(localStorage.getItem("title"))
Title.innerHTML = title
// adding the products
let products = JSON.parse(localStorage.getItem("phones"))
// for searching

ShowProducts(products)

function ShowProducts(prods) {
    relatedProducts.innerHTML = ''
    prods.forEach(pro => {
        pros.push(pro)
        let product = document.createElement('div')
        product.setAttribute('class', 'product')
        let asset = document.createElement('img')
        asset.src = pro.image;
        let title = document.createElement('p')
        title.innerHTML = pro.phone_name
        title.classList.add('title')
        let sellings = document.createElement('div')
        sellings.classList.add("buy")
        // adding the price
        let price = document.createElement('p')
        price.innerHTML = `${prices[i]}`;
        if (i < prices.length - 1) i++
        else i = 0;
        let logo = document.createElement('img')
        logo.src = 'https://icons.veryicon.com/png/o/education-technology/blue-gray-solid-blend-icon/shopping-cart-193.png';
        logo.addEventListener('click', () => {
            addToCart(pro, price.innerHTML)
        })
        sellings.appendChild(price)
        sellings.appendChild(logo)
        product.appendChild(asset)
        product.appendChild(title)
        product.appendChild(sellings)
        relatedProducts.appendChild(product)
    });
    
}
// adding product to cart
function addToCart(brand, thePrice) {
    pricess.push(thePrice)
    carts.push(brand)
    localStorage.setItem("cart", JSON.stringify(carts))
    localStorage.setItem('prices', JSON.stringify(pricess))
    window.open('../cartPage/cart.html', "_self")
}
let arrayOfPhone;
inputField.addEventListener('keyup', () => {
    let value = inputField.value;
    value = value.toLowerCase();
    pros = products.filter(p => {
        return p.phone_name.toLowerCase().startsWith(value)
    })
    ShowProducts(pros)
})
console.log(pros)
console.log(products)


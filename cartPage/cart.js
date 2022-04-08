const container = document.querySelector('.container'),
toggleIcon = document.querySelector('.toggle-icon'),
toggleMenu = document.querySelector('.toggle-menu'),
closeMenu = document.querySelector('.uil-times'),
total = document.querySelector('span.total')
let relatedProducts = document.querySelector('.products')
let carts;
let pricess;

if (localStorage.getItem("cart")) {
    carts = JSON.parse(localStorage.getItem("cart"))

} else {
    carts = []
}

if (localStorage.getItem("prices")) {
    pricess = JSON.parse(localStorage.getItem("prices")) 
} else
    pricess = []

console.log(carts)
toggleIcon.addEventListener('click', () => {
    toggleMenu.style.display = 'flex';
    toggleMenu.style.transform = 'translateX(0)';
 })
 closeMenu.addEventListener('click', () => {
     toggleMenu.style.transform = 'translateX(300px)';
     toggleMenu.style.display = 'none';
 })
// getting the cart from localStroage
// let cart = JSON.parse(localStorage.getItem("cart"))
// console.log(cart)
getProductsFromCart()
function getProductsFromCart() {
    total.innerText = 0
    for (let i = 0; i < carts.length; i++) {
        let pro = carts[i]
        if (pro == 0) continue
        let product = document.createElement('div')
        product.classList.add('product')
        let cont = document.createElement('div')
        cont.classList.add('cont')
        let image = document.createElement('img')
        image.src = pro.image;
        let title = document.createElement('p')
        title.classList.add('title')

        title.innerText = pro.phone_name
        let price = document.createElement('p')
        // fetch(`${pro.detail}`)
        // .then(data => data.json())
        // .then(data => console.log(data.specifications[specifications.length - 1]).specs[2].val)
        price.innerText = pricess[i]
        let value = parseInt(total.innerText) 
        value +=  +pricess[i]
        total.innerHTML = value;
        let counter = document.createElement('div')
        counter.classList.add('counter')
        counter.innerHTML = `
            <i class="uil uil-plus""></i>
            <p class="value">1</p>
            <i class="uil uil-minus" onclick="decrease(this)"></i>
        `;
        

        counter.querySelector('.uil-plus').addEventListener('click', (e) => {
            increase(e.target)
            console.log(price)
            let totaal = parseInt(total.innerHTML)
            totaal += +price.innerText;
            total.innerHTML = totaal
        })

        counter.querySelector('.uil-minus').addEventListener('click', (e) => {
            if (+counter.querySelector('.value').innerText > 1) {
                console.log(price)
                let totaal = parseInt(total.innerHTML)
                totaal -= +price.innerText;
                total.innerHTML = totaal
                +e.target.parentElement.querySelector('.value').innerHTML--
                
            }
            
        })
        
        let deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.addEventListener('click', () => {
            DeleteItemFromCart(i)
        })
        deleteBtn.classList.add("uil", "uil-trash")
        let buy = document.createElement('div')
        buy.classList.add('buy')
        
        cont.appendChild(image)
        cont.appendChild(counter)
        product.appendChild(cont)
        product.appendChild(title)
        buy.appendChild(price)
        buy.appendChild(deleteBtn)
        product.appendChild(buy)

        container.appendChild(product)
    }
}
function DeleteItemFromCart(i) {
    let deletedPrice = +pricess[i]
    carts[i] = 0
    pricess[i] = 0
    console.log(carts)
    container.innerHTML = ''
    getProductsFromCart()
    deleteFromLocalStorage(i)
    console.log(total.innerHTML)
    console.log(total.innerHTML)
}
function deleteFromLocalStorage(i) {
    carts = carts.filter(product => {
        return product != 0
    })
    pricess = pricess.filter(pric => pric != 0)
    localStorage.setItem('cart', JSON.stringify(carts))
    localStorage.setItem('prices', JSON.stringify(pricess))
}
function increase(e) {
    console.log(e)
    +e.parentElement.querySelector('.value').innerHTML++
}
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
    //relatedProducts = ''
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
            let totaal = parseInt(total.innerHTML)
            totaal += +price.innerHTML;
            total.innerHTML = totaal
        })

        counter.querySelector('.uil-minus').addEventListener('click', (e) => {
            if (+counter.querySelector('.value').innerText > 1) {
                let totaal = parseInt(total.innerHTML)
                totaal -= +price.innerHTML;
                total.innerHTML = totaal
                decrease(e.target)
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
    carts[i] = 0
    pricess[i] = 0
    console.log(carts)
    container.innerHTML = ''
    getProductsFromCart()
    deleteFromLocalStorage(i)
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
    e.parentElement.querySelector('.value').innerHTML++
    

}
function decrease(e) {
    if (e.parentElement.querySelector('.value').innerHTML > 1) {
        e.parentElement.querySelector('.value').innerHTML--
    }
}
const splash = document.querySelector('.splashSection'),
slider = document.querySelector('.slider'),
image = document.querySelectorAll('.slider img');
prevBtn = document.querySelector('.container .prev'),
nextBtn = document.querySelector('.container .next'),
brands = document.querySelector('.brands'),
toggleIcon = document.querySelector('.toggle-icon'),
toggleMenu = document.querySelector('.toggle-menu')
closeMenu = document.querySelector('.uil-times'),
topProducts = document.querySelector('.top_products'),
nextProduct = document.querySelector('.nextPro'),
prevProduct = document.querySelector('.prevPro'),
containerProducts = document.querySelector('.topProductsCont')
let products;
let carts = []


// console.log(prevBtn, nextBtn)
setInterval(() => {
    if (document.readyState == 'complete') {
        splash.style.display = 'none';
    } else {
        splash.style.display = 'block';
    }
    
}, 500)
let counter = 0;
function nextSlide() {
    if (counter < image.length - 1) {
        counter++;
    }
    let currentWidth = image[0].clientWidth;
    slider.style.transform = `translateX(-${currentWidth * counter}px)`
    if (counter == image.length - 1) {
        counter = 0;
    }
}
function prevSlide() {
    if (counter > 1) {
        counter--;
    } else {
        counter = image.length - 1;
    }
    let currentWidth = image[0].clientWidth;
    slider.style.transform = `translateX(-${currentWidth * counter}px)`
}
prevBtn.addEventListener('click', () => {
    prevSlide()
})
nextBtn.addEventListener('click', () => {
    nextSlide()
})
setInterval(nextSlide, 1500);
fetch('https://api-mobilespecs.azharimm.site/v2/brands')
.then(data => data.json())
.then(data => showBrandsNames(data))

let brandsNames = ['Acer', 'Apple', 'Amazon', 'Asus', 'Google', 'Honor', 'HTC', 'Huawei', 'Infinix', 'LG', 'Microsoft', 'Razer', 'Realme','Samsung','Sharp','Sony','Xiaomi','XOLO','Yezz','Oppo','ZTE']
function showBrandsNames(data) {
    data.data.forEach(brand => {
        if (brandsNames.includes(brand.brand_name)) {
            let brandEl = document.createElement('div')
            brandEl.classList.add('brand')
            brandEl.innerText = brand.brand_name;
            brandEl.addEventListener('click', () => {
                fetchRelatedMobiles(brand.detail)
            })
            brands.appendChild(brandEl)
        }
        
    });
    
}
 /* toggle icon functionality */
 toggleIcon.addEventListener('click', () => {
    toggleMenu.style.display = 'flex';
    toggleMenu.style.transform = 'translateX(0)';
 })
 closeMenu.addEventListener('click', () => {
     toggleMenu.style.transform = 'translateX(300px)';
     toggleMenu.style.display = 'none';
 })

 function fetchRelatedMobiles(brand) {
    fetch(`${brand}`)
    .then(data => data.json())
    //.then(data => console.log(data.data))
    window.open('./productsPage/product.html', '_self')
 }

 // fetch top brands
 fetchTopProducts()


function fetchTopProducts() {
    fetch('https://api-mobilespecs.azharimm.site/v2/latest')
    .then(data => data.json())
    .then(data => showTopProducts(data.data.phones))

}

function showTopProducts(data) {
    // console.log(data)
    products = data;
    data.forEach(brand => {
        let topProduct = document.createElement('div')
        topProduct.setAttribute('class', 'topProduct')
        let asset = document.createElement('img')
        asset.src = brand.image;
        let title = document.createElement('p')
        title.innerHTML = brand.phone_name
        title.classList.add('title')
        let sellings = document.createElement('div')
        sellings.classList.add("buy")
        let logo = document.createElement('img')
        logo.src = 'https://icons.veryicon.com/png/o/education-technology/blue-gray-solid-blend-icon/shopping-cart-193.png';
        logo.addEventListener('click', () => {
            addToCart(brand)
        })
        let price = document.createElement('p')
        price.innerHTML = "265$"
        sellings.appendChild(price)
        sellings.appendChild(logo)
        topProduct.appendChild(asset)
        topProduct.appendChild(title)
        topProduct.appendChild(sellings)
        topProducts.appendChild(topProduct)
    })
}


let counter2 = 0;
nextProduct.addEventListener('click', () => {
    // console.log(topProducts.clientWidth)
    if (topProducts.clientWidth < 500) {
        if (counter2 < 8) {
            counter2 += .6
        }
    }
    else if (topProducts.clientWidth < 850) {
        if (counter2 < 4) {
            counter2++
        }
    }
    else if (topProducts.clientWidth >= 850) {
        if (counter2 < 2) {
            counter2++
        }
    }
    // console.log(topProducts.clientWidth * counter2, productsWidth )
    //if (topProducts.clientWidth * counter2 <= productsWidth)
    topProducts.style.transform = `translateX(-${topProducts.clientWidth * counter2}px)`;
});
prevProduct.addEventListener('click', () => {
    if (counter > 0) {
        counter2--;
        topProducts.style.transform = `translateX(-${topProducts.clientWidth * counter2}px)`;
    }
        
    
    //if (topProducts.clientWidth * counter2 > 0)
        });
function addToCart(brand) {
    carts.push(brand)
    localStorage.setItem("cart", JSON.stringify(carts))
    window.open('./cartPage/cart.html', "_self")
}
let productsDiv = document.getElementById("products")
let cart = []

fetch("data.json")
    .then(res=>res.json())
    .then(data=>{
        buildProducts(data)
        document.querySelectorAll(".add-to-cart").forEach(btn=>{
            btn.addEventListener("click", (e)=>{
                // console.log( e.target.id );
                let productId = Number(e.target.id)
                // console.log(productId);
              
                if(cart.some(prod=>prod.id===productId)){
                    console.log("product already in cart");
                }else{
                    let newProduct = data.find(product=>product.id == productId)
                    newProduct.count = 1
                    cart.push( newProduct )
                }
                console.log(cart);
                renderCart(cart)
            })
        })
    })

function renderCart(products){
    let cartDiv = document.getElementById("cart-items")
    cartDiv.innerHTML = ""
    if(products.length == 0){
        cartDiv.textContent = "Empty Cart"
    }else{
        products.forEach(product=>{
            let cartItem = document.createElement("div")
            cartItem.classList.add("item")
            cartItem.innerHTML = `
                    <div>
                        <p> ${product.name} </p>
                        <p> 
                            <span class="cart-item-count">${product.count}x<span>   
                            <span class="cart-item-price">${product.price}<span>
                            <span class="cart-item-total">${product.count * product.price}<span>
                        </p>
                    </div>
                    <button class="remove-item" id="remove-${product.id}"> X </button>
            `
            cartDiv.append(cartItem)
        })
    }
    document.querySelectorAll(".remove-item").forEach(btn=>{
        btn.addEventListener("click", (e)=>{
            let id = e.target.id.split("-")[1]
            console.log(id);
            removeFromCart(id)
        })
    })
}


function removeFromCart(id){
    cart = cart.filter(products=>products.id!=id)
    renderCart(cart)
}



function buildProducts(products){
    productsDiv.innerHTML = ""
    products.forEach(product=>{
        let card = document.createElement("div")
        card.classList.add("product-card")
        card.innerHTML = `
            <img class="desktop" src="${product.image.desktop}" alt="${product.name} image" >
            <img class="tablet" src="${product.image.tablet}" alt="${product.name} image" >
            <img class="mobile" src="${product.image.mobile}" alt="${product.name} image" >
            <button  id="${product.id}"  class="add-to-cart"> <img src="assets/images/icon-add-to-cart.svg" alt="cart icon">  Add to Cart</button>
            <div class="count">
                <button id="decrement-${product.id}" > - </button>
                <span  id="count-${product.id}" >1</span>
                <button id="increment-${product.id}"> + </button>
            </div>
            <p class="category">${product.category} </p>
            <h2> ${product.name} </h2>
            <p class=price> ${product.price} </p>
        `
        productsDiv.append(card)
    })
}
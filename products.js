

fetch('./json files/products.json')
.then(response => response.json())
.then(data => {
    const main = document.querySelector("main");

    data.forEach(element => {
        const name = element.name;
        const imageSrc = element.image;
        const price = element.price;
        const benefits = element.benefits;
        const ingredients = element.ingredients;

        const product = document.createElement("div");
        product.classList.add("other-products");
        product.innerHTML = `
            <div class="item">
                <div class="image">
                    <img src=${imageSrc} alt="">
                    <h2>${name}</h2>
                </div>
                <div class="details">
                    
                    <p class="price">Price: Ksh <span id="price">${price}</span></p>
                    <button class="add-to-cart">Add to cart</button>
                </div>
                <div class="ingredients">
                    <h3>Benefits</h3>
                    <p id="benefits">${benefits}</p>
                    <h3>Ingredients</h3>
                    <p id="ingredients">${ingredients}</p>
                </div>
            </div>
        `;

        main.appendChild(product);
    });
})

console.log("here")

document.addEventListener("DOMContentLoaded", function () {
    const cart = document.querySelector(".cart");
    const cartItem = document.querySelector(".cart-item");
    const cartItems = document.querySelectorAll(".cart-product");

    const checkoutContainer = document.querySelector(".check-out");
    const checkoutButton = document.getElementById("check-out");
    const cancel = cart.querySelector(".cancel");
    const showCartButton = document.querySelector(".show-cart");
    const main = document.querySelector("main");
    const sendButton = checkoutContainer.querySelector(".send");
    const removeItem = cart.querySelectorAll("#remove-item");

    let cartProducts = [];
    
    showCartButton.addEventListener("click", function () {
        cart.classList.toggle("show");
    });
    
    main.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const product = event.target.closest(".item");
            const productName = product.querySelector("h2").textContent;
            const productPrice = product.querySelector("#price").textContent;
            addToCart(productName, productPrice);
        }
    })

    main.addEventListener("click", (event) => {
        if (event.target.classList.contains("candle-to-cart")) {
            const candleProduct = event.target.closest(".candles");
            const candleProductName = candleProduct.querySelector("h2").textContent;
            const candleProductPrice = candleProduct.querySelector("#candle-price").textContent;
            const candleProductScent = candleProduct.querySelector("#scent").value;
            const selectedScent = candleProductScent ? candleProductScent : "Default"; 

            candleToCart(candleProductName, candleProductPrice, selectedScent);
        }
    })

    const addToCart = (productName, productPrice) => {
        const productItem = document.createElement("div");
        productItem.classList.add(".cart-product");

        productItem.innerHTML = `
                <p class="name">${productName}</p>
                <p class="p-price">Price: Ksh ${productPrice}</p>
                <i class="ri-close-circle-line" id="remove-item"></i>
        `;

        productItem.style.display = 'flex';
        productItem.style.alignItems = 'center';
        productItem.style.justifyContent = 'space-between';

        cartItem.appendChild(productItem);

        cartProducts.push({ name: productName, price: productPrice });

        const removeButton = productItem.querySelector("#remove-item");
        removeButton.addEventListener("click", (event) => {
            const index = cartProducts.findIndex(item => item.name === productName && item.price === productPrice);
            if (index > -1) {
                cartProducts.splice(index, 1); // Remove the item from the array
            }
            productItem.remove(); // Remove this item from the cart
        });
    }

    const candleToCart = (candleProductName, candleProductPrice, selectedScent) => {
        const productItem = document.createElement("div");
        productItem.classList.add(".cart-product");

        productItem.innerHTML = `
                <p class="name">${candleProductName}</p>
                <p class="scent">${selectedScent}</p>
                <p class="p-price">Price: ${candleProductPrice}</p>
                <i class="ri-close-circle-line" id="remove-item"></i>
        `;

        productItem.style.display = 'flex';
        productItem.style.alignItems = 'center';
        productItem.style.justifyContent = 'space-between';

        cartItem.appendChild(productItem);

        cartProducts.push({ name: candleProductName, price: candleProductPrice, scent: selectedScent });

        const removeButton = productItem.querySelector("#remove-item");
        removeButton.addEventListener("click", (event) => {
            const index = cartProducts.findIndex(item => item.name === candleProductName && item.scent === selectedScent && item.price === candleProductPrice);
            if (index > -1) {
                cartProducts.splice(index, 1); // Remove the item from the array
            }
            productItem.remove(); // Remove this item from the cart
        });
    }

    checkoutButton.addEventListener("click", function () {
        checkoutContainer.classList.add("show");
    });

    cancel.addEventListener("click", (event) => {
        cart.classList.toggle("show");
    })

    const updateCartUI = () => {
        cartItem.innerHTML = "";
    }

    sendButton.addEventListener("click", (event) => {
        event.preventDefault();

        const buyerName = checkoutContainer.querySelector("#buyer-name").value;
        const buyerLocation = checkoutContainer.querySelector("#buyer-location").value;
        const buyerPhone = checkoutContainer.querySelector("#buyer-number").value;

        const phonePattern = /^0[71]\d{2}\d{3}\d{3}$/;
        if (!phonePattern.test(buyerPhone)) {
        alert("Invalid phone number format! Use: 0x xx xxx xxx (x = digit, first digit must be 7 or 1)");
        return;
        }

        if (!buyerName || !buyerLocation || !buyerPhone) {
            alert("Please fill in all the required details.");
            return;
        }
    
        if (!cartProducts || cartProducts.length === 0) {
            alert("Your cart is empty. Add items before placing an order.");
            return;
        }

        const orderDetails = {
            buyerName: buyerName,
            buyerLocation: buyerLocation,
            buyerPhone: buyerPhone,
            cartItems: cartProducts
        };

        sendEmail(orderDetails);
    })

    const sendEmail = (orderDetails) => {
        const formattedCartItems = orderDetails.cartItems.map(item => {
            return `${item.name} - Ksh ${item.price}${item.scent ? ' (Scent: ' + item.scent + ')' : ''}`;
        }).join("\n");

        const emailParams = {
            to_name: "Elles Corner", 
            from_name: orderDetails.buyerName,
            location: orderDetails.buyerLocation,
            cart_items: formattedCartItems,
            buyer_phone: orderDetails.buyerPhone,
        };


        emailjs.send("service_qacpaei", "template_f7gxyoq", emailParams)
            .then((response) => {
                alert("Order submitted successfully!");
                checkoutContainer.classList.remove("show");

                cartProducts.length = 0; // Empty the cart array
                updateCartUI();

                checkoutContainer.querySelector("#buyer-name").value = "";
                checkoutContainer.querySelector("#buyer-location").value = "";
                checkoutContainer.querySelector("#buyer-number").value = "";
            }, (error) => {
                console.error("Email sending error:", error);
                alert("There was an error submitting the order. Please try again.");
            });

    }

    document.querySelector(".check-out .cancel").addEventListener("click", function () {
        checkoutContainer.classList.remove("show");
    });
});
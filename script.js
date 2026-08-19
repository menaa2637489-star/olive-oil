document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });

        const navItems = navLinks.querySelectorAll("a");

        navItems.forEach(function (item) {

            item.addEventListener("click", function () {
                navLinks.classList.remove("show");
            });

        });

    }


    /* =========================================================
       PRODUCT SIZE / PRICE / IMAGE
    ========================================================= */

    const sizeButtons = document.querySelectorAll(".size-btn");
    const mainBottle = document.getElementById("mainBottle");
    const priceElement = document.getElementById("price");

    let selectedProduct = {
        size: "500",
        price: 320,
        image: "images/نصف لتر.png"
    };


    sizeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            sizeButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const size = button.dataset.size;
            const price = Number(button.dataset.price);
            const image = button.dataset.image;

            selectedProduct = {
                size: size,
                price: price,
                image: image
            };


            /* تغيير السعر */

            if (priceElement) {
                priceElement.textContent = price;
            }


            /* تغيير الصورة */

            if (mainBottle) {

                mainBottle.classList.add("change");

                setTimeout(function () {

                    mainBottle.src = image;

                    mainBottle.classList.remove("change");

                }, 200);

            }

        });

    });


    /* =========================================================
       CART
    ========================================================= */

    let cart = [];


    /* =========================================================
       CART ELEMENTS
    ========================================================= */

    const cartBtn = document.getElementById("cartBtn");
    const cartCount = document.getElementById("cartCount");

    const cartOverlay = document.getElementById("cartOverlay");
    const cartSidebar = document.getElementById("cartSidebar");

    const closeCartBtn = document.getElementById("closeCartBtn");

    const cartProducts = document.getElementById("cartProducts");
    const cartTotal = document.getElementById("cartTotal");

    const addToCartBtn = document.getElementById("addToCartBtm");

    const buyNowBtn = document.getElementById("buyNowBtn");

    const checkoutBtn = document.getElementById("checkoutBtn");


    /* =========================================================
       OPEN CART
    ========================================================= */

    function openCart() {

        if (cartSidebar) {
            cartSidebar.classList.add("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }

    }


    /* =========================================================
       CLOSE CART
    ========================================================= */

    function closeCart() {

        if (cartSidebar) {
            cartSidebar.classList.remove("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }

    }


    if (cartBtn) {

        cartBtn.addEventListener("click", function () {
            openCart();
        });

    }


    if (closeCartBtn) {

        closeCartBtn.addEventListener("click", function () {
            closeCart();
        });

    }


    if (cartOverlay) {

        cartOverlay.addEventListener("click", function () {
            closeCart();
        });

    }


    /* =========================================================
       ADD PRODUCT TO CART
    ========================================================= */

    function addProductToCart(product) {

        const existingProduct = cart.find(function (item) {
            return item.size === product.size;
        });


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                size: product.size,
                price: product.price,
                image: product.image,
                quantity: 1
            });

        }


        updateCart();

    }


    /* =========================================================
       ADD TO CART BUTTON
    ========================================================= */

    if (addToCartBtn) {

        addToCartBtn.addEventListener("click", function () {

            addProductToCart(selectedProduct);

            openCart();

        });

    }


    /* =========================================================
       CART COUNT
    ========================================================= */

    function updateCartCount() {

        if (!cartCount) return;

        let totalQuantity = 0;

        cart.forEach(function (item) {
            totalQuantity += item.quantity;
        });

        cartCount.textContent = totalQuantity;

    }


    /* =========================================================
       CART TOTAL
    ========================================================= */

    function calculateCartTotal() {

        let total = 0;

        cart.forEach(function (item) {

            total += item.price * item.quantity;

        });

        return total;

    }


    /* =========================================================
       DISPLAY CART
    ========================================================= */

    function renderCart() {

        if (!cartProducts) return;

        cartProducts.innerHTML = "";


        if (cart.length === 0) {

            cartProducts.innerHTML = `
                <p style="
                    text-align:center;
                    padding:30px 10px;
                    color:#666;
                ">
                    السلة فارغة
                </p>
            `;

        } else {


            cart.forEach(function (item, index) {

                const productElement = document.createElement("div");

                productElement.className = "cart-item";

                productElement.innerHTML = `

                    <div class="cart-item-image">

                        <img
                            src="${item.image}"
                            alt="زيت زيتون ${item.size} لتر"
                        >

                    </div>


                    <div class="cart-item-info">

                        <h3>
                            زيت زيتون ${formatSize(item.size)}
                        </h3>

                        <p>
                            ${item.price} ج.م
                        </p>


                        <div class="cart-item-controls">

                            <button
                                class="quantity-btn"
                                data-action="decrease"
                                data-index="${index}"
                            >
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                class="quantity-btn"
                                data-action="increase"
                                data-index="${index}"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        class="remove-cart-item"
                        data-action="remove"
                        data-index="${index}"
                    >
                        ×
                    </button>

                `;


                cartProducts.appendChild(productElement);

            });

        }

    }


    /* =========================================================
       FORMAT SIZE
    ========================================================= */

    function formatSize(size) {

        if (size === "500") {
            return "½ لتر";
        }

        if (size === "1") {
            return "1 لتر";
        }

        if (size === "2") {
            return "2 لتر";
        }

        if (size === "5") {
            return "5 لتر";
        }

        return size + " لتر";

    }


    /* =========================================================
       UPDATE CART
    ========================================================= */

    function updateCart() {

        updateCartCount();

        renderCart();


        if (cartTotal) {

            cartTotal.textContent =
                calculateCartTotal() + " ج.م";

        }

    }


    /* =========================================================
       CART QUANTITY / REMOVE
    ========================================================= */

    if (cartProducts) {

        cartProducts.addEventListener("click", function (event) {

            const button = event.target.closest("button");

            if (!button) return;

            const action = button.dataset.action;
            const index = Number(button.dataset.index);


            if (Number.isNaN(index)) return;


            /* زيادة الكمية */

            if (action === "increase") {

                cart[index].quantity += 1;

            }


            /* تقليل الكمية */

            if (action === "decrease") {

                cart[index].quantity -= 1;


                if (cart[index].quantity <= 0) {

                    cart.splice(index, 1);

                }

            }


            /* حذف المنتج */

            if (action === "remove") {

                cart.splice(index, 1);

            }


            updateCart();

        });

    }


    /* =========================================================
       ORDER MODAL
    ========================================================= */

    const orderModal = document.getElementById("orderModal");

    const orderItems = document.getElementById("orderItems");

    const orderTotal = document.getElementById("orderTotal");

    const backBtn = document.getElementById("backBtn");

    const confirmOrderBtn =
        document.getElementById("confirmOrderBtn");


    /* =========================================================
       OPEN ORDER MODAL
    ========================================================= */

    function openOrderModal(products) {

        if (!orderModal) return;


        renderOrderSummary(products);


        orderModal.classList.add("active");

    }


    /* =========================================================
       CLOSE ORDER MODAL
    ========================================================= */

    function closeOrderModal() {

        if (!orderModal) return;

        orderModal.classList.remove("active");

    }


    /* =========================================================
       ORDER SUMMARY
    ========================================================= */

    function renderOrderSummary(products) {

        if (!orderItems || !orderTotal) return;


        orderItems.innerHTML = "";


        let total = 0;


        products.forEach(function (item) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;


            const orderItem =
                document.createElement("div");

            orderItem.className = "order-item";


            orderItem.innerHTML = `

                <span>
                    زيت زيتون ${formatSize(item.size)}
                    × ${item.quantity}
                </span>

                <strong>
                    ${itemTotal} ج.م
                </strong>

            `;


            orderItems.appendChild(orderItem);

        });


        orderTotal.textContent =
            total + " ج.م";

    }


    /* =========================================================
       BUY NOW
    ========================================================= */

    if (buyNowBtn) {

        buyNowBtn.addEventListener("click", function () {

            const currentProduct = {

                size: selectedProduct.size,

                price: selectedProduct.price,

                image: selectedProduct.image,

                quantity: 1

            };


            openOrderModal([currentProduct]);

        });

    }


    /* =========================================================
       CHECKOUT
    ========================================================= */

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", function () {

            if (cart.length === 0) {

                alert("السلة فارغة، أضيفي منتج أولاً.");

                return;

            }


            closeCart();

            openOrderModal(cart);

        });

    }


    /* =========================================================
       BACK BUTTON
    ========================================================= */

    if (backBtn) {

        backBtn.addEventListener("click", function () {

            closeOrderModal();

            if (cart.length > 0) {
                openCart();
            }

        });

    }


    /* =========================================================
       CONFIRM ORDER
    ========================================================= */

    if (confirmOrderBtn) {

        confirmOrderBtn.addEventListener("click", function () {

            const fullName =
                document.getElementById("fullName").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const governorate =
                document.getElementById("governorate").value;

            const address =
                document.getElementById("address").value.trim();


            if (!fullName) {

                alert("من فضلك اكتبي الاسم بالكامل.");

                return;

            }


            if (!phone) {

                alert("من فضلك اكتبي رقم الهاتف.");

                return;

            }


            if (!governorate) {

                alert("من فضلك اختاري المحافظة.");

                return;

            }


            if (!address) {

                alert("من فضلك اكتبي العنوان بالتفصيل.");

                return;

            }


            alert(
                "تم تأكيد طلبك بنجاح ❤️"
            );


            closeOrderModal();


            cart = [];

            updateCart();


            document.getElementById("fullName").value = "";

            document.getElementById("phone").value = "";

            document.getElementById("governorate").value = "";

            document.getElementById("address").value = "";

            document.getElementById("notes").value = "";

        });

    }


    /* =========================================================
       ACCORDION
    ========================================================= */

    const accordionHeaders =
        document.querySelectorAll(".accordion-header");


    accordionHeaders.forEach(function (header) {

        header.addEventListener("click", function () {

            const item =
                header.closest(".accordion-item");


            document
                .querySelectorAll(".accordion-item")
                .forEach(function (otherItem) {

                    if (otherItem !== item) {

                        otherItem.classList.remove("active");

                    }

                });


            item.classList.toggle("active");

        });

    });


    /* =========================================================
       INITIAL UPDATE
    ========================================================= */

    updateCart();

});
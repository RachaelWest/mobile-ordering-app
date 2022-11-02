import { menuArray } from './data.js'

const menuContainer = document.getElementById('menu')
const orderContainer = document.getElementById('order')
const checkoutContainer = document.getElementById('checkout')
const paymentFormContainer = document.getElementById('payment-form-container')
const payButton = document.getElementById('pay-btn')

let orderArray = []

//EVENT LISTENER TO HANDLE CLICKS ON ADD BUTTON, REMOVE BUTTON, ORDER BUTTON
document.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        handleAddItemClick(e.target.dataset.add)
    }

    if(e.target.dataset.remove) {
        handleRemoveItemClick(e.target.dataset.remove)
    }

    if(e.target.id === "order-btn") {
        handlePlaceOrderClick()
    }

    if(e.target.id === "new-order-btn") {
        handleNewOrderClick()
    }
})

//EVENT LISTENER TO HANDLE PAY BUTTON CLICK AND TO DISPLAY THANK YOU MESSAGE
document.addEventListener('submit', function(e) {
    e.preventDefault()

    checkoutContainer.innerHTML =` 
    <div class="thankyou-container">
        <p class="thank-you-message">Thank you! Your order has been placed and is on its way!</p>
        <div class="new-order-btn-container">
            <button class="green-btn" id="new-order-btn">Start a New Order</button>
        </div>
    </div>
    `
    paymentFormContainer.style.display = "none"

    //to clear the payment form for any new orders:
    document.getElementById('customer-name').value = ""
    document.getElementById('card-number').value = ""
    document.getElementById('cvv').value = ""

})


//FUNCTION RETURNS HTML STRING FOR EACH MENU ITEM BY ITERATING OVER MENUARRAY
function getMenuHtml() {
    let menuHtml = ''

    menuArray.forEach((food) => {
        menuHtml += `
        <div class="food">
            <span class="food-pic">${food.emoji}</span>
            <div class="food-details">
                <h3 class="food-name">${food.name}</h3>
                <small class="food-ingredients">${food.ingredients}</small>
                <p class="food-price">$${food.price}</p>
            </div>
            <button class="add-btn" data-add="${food.id}">+</button>
        </div>          
        `
    })

    return menuHtml
}


//FUNCTION TO ADD MENU ITEM TO ORDER WHEN ADD BUTTON CLICKED
function handleAddItemClick(addBtnId) {
    //first filters the selected item from the menuArray using its id (created with dataset)
    const targetMenuItem = menuArray.filter(function(item) {
        return item.id === parseInt(addBtnId,10)
    })[0] // filter returns an array but we want an object. It will only ever return an array of 1 so adding [0] changes targetTweetObj from an array to the object we need.

    // then pushes filtered item to the orderArray
    orderArray.push(targetMenuItem)

    //if orderArray contains an order item the checkout section appears. Set as display:none as default in the css.
    if(orderArray.length === 1) {
        checkoutContainer.style.display = "block"
    }

    getOrderHtml()
}


//FUNCTION TO REMOVE ITEMS FROM THE ORDER WHEN REMOVE BUTTON CLICKED
function handleRemoveItemClick(removeBtnId) {
    //checks if there are any items in the orderArray. if yes, function returns updated array that only contains items that do not match the remove button - thus. filtering the removed items out.
    if(orderArray.length === 1) {
        orderArray = []
    }
    else {
        orderArray = orderArray.filter((item) => {
            return item.id != removeBtnId
        })
    }
    getOrderHtml()
}


//FUNCTION RENDERS ORDERED FOOD ITEMS TO THE PAGE 
function getOrderHtml() {
    let orderHtml = ''
    let totalPrice = 0

    orderArray.forEach((food) => {
        orderHtml += `
        <div class="order-item">
            <div class="order-name">
                <h3 class="food-name">${food.name}</h3>
                <button class="food-ingredients remove" data-remove="${food.id}">remove</button>
            </div>
            <p class="food-price">$${food.price}</p>
        </div>
        `

    totalPrice += food.price
    document.getElementById("total-price").innerText=`\$${totalPrice}`
    })
    orderContainer.innerHTML = orderHtml
}


//FUNCTION HANDLES COMPLETE ORDER BUTTON CLICK AND DISPLAYS PAYMENT FORM
function handlePlaceOrderClick() {
    paymentFormContainer.style.display = "block"
}

//FUNCTION TO HANDLE START A NEW ORDER BUTTON CLICK. CLEARS ARRAY, RESETS HIDDEN HTML.
function handleNewOrderClick() {
    orderArray = []

    checkoutContainer.innerHTML = `
    <div>
        <h2 class="order-title">Your Order</h2>
        <div id="order" class="order">
        </div>

        <div class="order-total" id="order-total">
            <h2 class="order-item">Total price:</h2>
            <p class="food-price" id="total-price"></p>
        </div>

        <div class="order-btn-container">
            <button class="green-btn" id="order-btn">Complete Order</button>
        </div>
    </div>`

    checkoutContainer.style.display = "none"
}

function renderMenu() {
    menuContainer.innerHTML = getMenuHtml()
}

renderMenu()

let shoppingCart = []; //holds Order object

const appetizerNames = ["Spring Roll", "Roast Pork Egg Roll", "Chicken Teriyaki", "Fried Dumpling", "Steam Dumplings", "Crab Rangoon (x5)", "Crab Rangoon (x10)", "Boneless Spare Ribs", "Chicken Nuggets", "Sugar Biscuit", "Fried Wonton", "Fried Baby Shrimp", "Mozarella Cheese Sticks", "Crab Stick"];
const appetizerPrices = [1.95, 1.85, 9.85, 8.45, 8.45, 5.95, 9.10, 10.95, 5.85, 6.75, 6.95, 8.35, 5.85, 8.35];


const shoppingCartContentContainer = document.getElementById("shopping-cart-content-container");

function loadAppetizers(){
    //retrieve respected containers
    const appetizerContainer = document.getElementById("Appetizers-name-container");
    const appetizerPriceContainer = document.getElementById("Appetizers-price-container");
    const appetizerDisplayQuanityContainer = document.getElementById("Appetizers-quanity-display-container");
    const appetizerQuanityButtonContainer = document.getElementById("Appetizers-quanity-button-container");
    const appetizerAddButtonContainer = document.getElementById("Appetizers-add-button-container");


    for (let i=0; i<appetizerNames.length;i++){

        //initialize appetizer name
        const name_liEl = document.createElement('li');
        name_liEl.innerText = appetizerNames[i];
        appetizerContainer.appendChild(name_liEl); //add the appetizer to appetizer container
    
        //initialize appetizer price
        const price_liEl = document.createElement('li');
        price_liEl.innerText = "$ " + appetizerPrices[i].toFixed(2);
        appetizerPriceContainer.appendChild(price_liEl);

        //display quanity 
        const quanity_spanEl = document.createElement('span');
        quanity_spanEl.className = "Appetizers-display-quanity";
        quanity_spanEl.id = appetizerNames[i]; //id is appetizer's name
        quanity_spanEl.innerText = '0';
        const leftBracket_spanEl = document.createElement('span');
        leftBracket_spanEl.innerText = '[';
        const rightBracket_spanEl = document.createElement('span');
        rightBracket_spanEl.innerText = ']';
        
        const quanity_liEl = document.createElement('li');
        quanity_liEl.append(leftBracket_spanEl, quanity_spanEl, rightBracket_spanEl);
        appetizerDisplayQuanityContainer.appendChild(quanity_liEl);
    



        // quanity buttons

        //increment
        const incrementQuanity_buttonEl = document.createElement('button');
        incrementQuanity_buttonEl.innerText = "+";
        incrementQuanity_buttonEl.className = "increment-quanity-button";
        incrementQuanity_buttonEl.addEventListener('click', ()=>{
            //map the increment button to the respective appetizer
            const mappedTo = appetizerNames[i];
            let currQuanity = parseInt(document.getElementById(mappedTo).innerText);
            document.getElementById(mappedTo).innerText = currQuanity+1;

            // 

        });

        const decrementQuanity_buttonEl = document.createElement('button');
        decrementQuanity_buttonEl.innerText = "-";
        decrementQuanity_buttonEl.className = "decrement-quanity-button";
        decrementQuanity_buttonEl.addEventListener('click', ()=>{
            //map the increment button to the respective appetizer
            const mappedTo = appetizerNames[i];
            let currQuanity = parseInt(document.getElementById(mappedTo).innerText);
            
            //non-negative quanity
            if(currQuanity > 0)
                document.getElementById(mappedTo).innerText = currQuanity-1;
        });

        //decrement
        const quanityButtons_liEl = document.createElement('li');
        quanityButtons_liEl.append(incrementQuanity_buttonEl, decrementQuanity_buttonEl);
        appetizerQuanityButtonContainer.appendChild(quanityButtons_liEl);
    
        //add order button
        const add_buttonEl = document.createElement('button'); //make button
        add_buttonEl.innerText = "ADD"; //button name
        add_buttonEl.addEventListener('click', ()=>{addItemToShoppingCart(appetizerNames[i],appetizerPrices[i])});
    
        const addButton_liEl = document.createElement('li');
        addButton_liEl.appendChild(add_buttonEl);
        appetizerAddButtonContainer.appendChild(addButton_liEl);
    }
}

//print shopping cart when an item is added
function displayShoppingCart(){
    //show Order object in shopping cart
    shoppingCartContentContainer.innerHTML = ''; //clear anything in the cart before

    for(const order of shoppingCart){
        const order_liEl = document.createElement('li');

        // remove button
        const remove_buttonEl = document.createElement('button');
        remove_buttonEl.innerHTML = "X";
        remove_buttonEl.className = "remove-item-button";
        remove_buttonEl.value = order.name;
        remove_buttonEl.addEventListener('click', removeItemFromShoppingCart);

        // display item name and quanity
        order_liEl.append(remove_buttonEl, document.createTextNode(order.name), document.createTextNode(' [' + order.quanity + ']'));

        shoppingCartContentContainer.appendChild(order_liEl);
    }

    //compute the cost in the shopping cart
    const displaySubtotal = document.getElementById("display-subtotal");
    const displayGrandTotal = document.getElementById("display-grand-total");
    displaySubtotal.innerHTML = getSubTotal().toFixed(2);
    displayGrandTotal.innerHTML = getGrandTotal(getSubTotal()).toFixed(2);

}

//adds an item to the shopping cart
function addItemToShoppingCart(itemName, itemPrice){

    //create Order object
    const order = {
        name: itemName,
        price: itemPrice,
        quanity: parseInt(document.getElementById(itemName).innerText)
    }

    //only add item with a valid quanity
    if(order.quanity>0){
        //add Order object to shopping cart
        shoppingCart.push(order);

        //display added item in shopping cart
        displayShoppingCart();
    }
}

//remove an item from the shopping cart
function removeItemFromShoppingCart(e){

    //item to remove
    const itemToRemove = e.target.value;

    //remove the item
    let filteredCart = shoppingCart.filter(item =>item.name !=itemToRemove);
    shoppingCart = filteredCart;

    //display the shopping cart with the item removed
    displayShoppingCart();
}

//return subtotal of items in the shopping cart
function getSubTotal(){
    let subtotal = 0;
    
    for(const item of shoppingCart){
        subtotal += item.price;
    }

    return subtotal;
}

//compute and display grand total
function getGrandTotal(subtotal){
    const salesTax = 0.08475;
    return  ( (subtotal*salesTax) + subtotal) ;
}

//clear all orders in the shopping cart
function clearCart(){
    shoppingCart.length=0; //empty cart
    displayShoppingCart(); //show empty cart
}


function submitOrder() {
    if (shoppingCart.length === 0) {
        alert('Shopping Cart is empty!');
        return;
    }

    //orders -> {order, order, ...}
    const newOrderRef = database.ref('ORDERS').push();
    
    newOrderRef.set({ order: shoppingCart })
        .then(() => {
            console.log('Order submitted successfully!');
            shoppingCart = [];  // Clear the selection after submission
            alert('Order submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your order.');
        });
}


window.onload = function(){
    const clearButtonEl = document.getElementById('clear-shopping-cart-button').addEventListener('click', clearCart);
    const sumbitOrderButtonEl = document.getElementById('submit-order-button').addEventListener('click', submitOrder);

    loadAppetizers();
}
//GLOBAl
const ordersContainer = document.getElementById('orders-container');

function fetchOrders() {
    //ORDERS -> order -> [order object]
    database.ref('ORDERS').on('value', (snapshot) => {
        const orders = snapshot.val();
        ordersContainer.innerHTML = '';  // Clear previous orders
        ordersContainer.appendChild(document.createElement('hr'));

        for (let orderId in orders) {
            const order_ulEl = document.createElement('ul');
            
            const order = orders[orderId].order; //an order array holding all the orders

            // iterate through order array
            for (let i=0; i<order.length;i++){
                //Diplay the order name and quanity on their own line
                const order_liEl = document.createElement('li');
                order_liEl.append(document.createTextNode(order[i].name), document.createTextNode(" [" + order[i].quanity + "]\n"));
                order_ulEl.appendChild(order_liEl);
            }

            //Finish order button -> removes the entire order
            const finishOrder_buttonEl = document.createElement('button');
            finishOrder_buttonEl.innerText = "DONE";
            finishOrder_buttonEl.className = "delete-order-button";
            finishOrder_buttonEl.addEventListener('click', ()=>{removeOrder(orderId)} );

            //Holds the button
            const finishOrder_liEl = document.createElement('li');

            //Add button to the end of the order list
            order_ulEl.appendChild(finishOrder_liEl.appendChild(finishOrder_buttonEl));
            
            ordersContainer.appendChild(order_ulEl);
            ordersContainer.appendChild(document.createElement('hr'));
            // orderDiv.textContent = order.join(', ');
        }
    });
}

//Removes an 'order' from database
//Path structure: ORDER -> uniqueID -> order[]
function removeOrder(orderId){
    //get reference to the specific item
    const orderRef = database.ref('ORDERS/'+orderId);
    orderRef.remove()
        .then(()=>{
            console.log("Order successfully deleted");
        })
        .catch( (error)=>{
            console.log('Error deleting item', error);
        });
}


window.onload = function(){
    fetchOrders();  // Initial fetch
}

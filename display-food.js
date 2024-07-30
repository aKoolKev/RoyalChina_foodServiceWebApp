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
            
            const order = orders[orderId].order; //an order

            // iterate through order array
            for (let i=0; i<order.length;i++){
                const order_liEl = document.createElement('li');
                order_liEl.appendChild(document.createTextNode(order[i].name));
                order_ulEl.appendChild(order_liEl);
            }
            
            ordersContainer.appendChild(order_ulEl);
            ordersContainer.appendChild(document.createElement('hr'));
            // orderDiv.textContent = order.join(', ');
        }
    });
}

window.onload = function(){
    fetchOrders();  // Initial fetch
}
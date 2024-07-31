let selectedFoods = [];

function selectFood(food) {
    selectedFoods.push(food);
    console.log(selectedFoods);  // For debugging
}

function submitOrder() {
    if (selectedFoods.length === 0) {
        alert('No food selected!');
        return;
    }

    //orders -> {order, order, ...}
    const newOrderRef = database.ref('ORDERS').push();
    
    newOrderRef.set({ order: selectedFoods })
        .then(() => {
            console.log('Order submitted successfully!');
            selectedFoods = [];  // Clear the selection after submission
            alert('Order submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your order.');
        });
}
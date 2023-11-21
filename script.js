// Array to store products
var products = [];

// Function to add a product to the list
function addProduct() {
    var productName = document.getElementById("productName").value;
    var sellingPrice = parseFloat(document.getElementById("sellingPrice").value);

    // Creating a new product object
    var product = {
        name: productName,
        price: sellingPrice
    };

    // Add the product to the array
    products.push(product);

    // Clear the input fields
    document.getElementById("productName").value = "";
    document.getElementById("sellingPrice").value = "";

    // Update the product list
    updateProductList();

    // Calculate and update the total value
    calculateTotalValue();

    // Save the product to the API
    saveProductToAPI(product);

    // Save the product to Local Storage
    saveProductsToLocalStorage();
}

// Function to update the product list
function updateProductList() {
    var productList = document.getElementById("productList");
    productList.innerHTML = "";

    // Loop through the products array and create list items
    for (var i = 0; i < products.length; i++) {
        var listItem = document.createElement("li");
        listItem.innerHTML = products[i].name + " - $" + products[i].price.toFixed(2);

        // Create a delete button for each product
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = (function(index) {
            return function() {
                deleteProduct(index);
            };
        })(i);
        listItem.appendChild(deleteButton);

        productList.appendChild(listItem);
    }
}

// Function to calculate the total value
function calculateTotalValue() {
    var totalValue = 0;

    // Loop through the products array and sum up the prices
    for (var i = 0; i < products.length; i++) {
        totalValue += products[i].price;
    }

    // Update the total value element
    document.getElementById("totalValue").innerHTML = "$" + totalValue.toFixed(2);
}

// Function to save the product to the API
function saveProductToAPI(product) {
    fetch("https://crudcrud.com/api/d442d5802644481ead443b2ccfedf71f/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => console.log("Product saved to API:", data))
    .catch(error => console.error("Error saving product to API:", error));
}

// Function to delete a product from the array
function deleteProduct(index) {
    products.splice(index, 1);
    updateProductList();
    calculateTotalValue();
    saveProductsToLocalStorage();
}

// Function to save the products to localStorage
function saveProductsToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Function to retrieve the products from localStorage
function retrieveProductsFromLocalStorage() {
    var storedProducts = localStorage.getItem("products");
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        updateProductList();
        calculateTotalValue();
    }
}

// Retrieve the products from localStorage on page load
window.onload = function() {
    retrieveProductsFromLocalStorage();
};






// Function to calculate the total value
function calculateTotalValue() {
    var totalValue = 0;

    // Loop through the products array and sum up the prices
    for (var i = 0; i < products.length; i++) {
        totalValue += products[i].price;
    }

    // Update the total value element
    document.getElementById("totalValue").innerHTML = "$" + totalValue.toFixed(2);

}

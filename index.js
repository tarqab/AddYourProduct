var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var ProductCategory = document.getElementById("ProductCategory");
var ProductDescription = document.getElementById("ProductDescription");
var productList = []
var updateIndex;

if (localStorage.getItem("productList")) {
    productList = JSON.parse(localStorage.getItem("productList"))

    displayProduct(productList);
}

var nameError = document.getElementById("nameError")
function addProduct() {
    if (validateProductName()) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: ProductCategory.value,
            description: ProductDescription.value
        }
        productList.push(product);

        //JSON: JavaScript Object Notation
        displayProduct(productList);
        localStorage.setItem("productList", JSON.stringify(productList));
        clear();
    }
    else {
        nameError.classList.replace('d-none', 'd-block')
    }
}

function displayProduct(list) {

    if (list.length > 0) {
        var data = ``

        for (var i = 0; i < list.length; i++) {
            // `` backtick : shift + right corner on top 

        data += `<tr>    
        <th scope="row">${i + 1}</th>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].description}</td>
        <td><button class="btn btn-warning" onClick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-danger" onClick="deleteProduct(${i})">Delete</button></td>
        </tr>`
        }
        document.getElementById("tableBody").innerHTML = data;
    }
    // else

}

function clear() {
    productName.value = "";
    productPrice.value = "";
    ProductCategory.value = "";
    ProductDescription.value = "";
}

function deleteProduct(index) {

    productList.splice(index, 1)
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
}

function searchProduct(searchLetter) {
    var founded = false;
    var newList = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchLetter.toLowerCase())) {
            newList.push(productList[i])
            displayProduct(newList);
            founded = true;

        }
    }
    if (!founded) {
        document.getElementById("noData").classList.replace('invisible', 'visible')
        document.getElementById("noData").innerHTML = '<h4 class="mt-3">No Data Founded</h4>'
        document.getElementById("tableBody").classList.add('invisible');
    }
    else {
        document.getElementById("noData").classList.add('invisible')
        document.getElementById("tableBody").classList.replace('invisible', 'visible');

    }
}
document.getElementById("updateButton").classList.add('d-none')

function updateProduct(index) {
    productName.value = productList[index].name
    productPrice.value = productList[index].price
    ProductCategory.value = productList[index].category
    ProductDescription.value = productList[index].description
    document.getElementById("updateButton").classList.replace('d-none', 'd-inline')
    document.getElementById("addButton").classList.add('d-none')

    updateIndex = index
}

function updateAssignment() {
    var updatedItem = {
        name: productName.value,
        price: productPrice.value,
        category: ProductCategory.value,
        description: ProductDescription.value
    }

    productList = JSON.parse(localStorage.getItem("productList"))
    productList[updateIndex] = updatedItem;
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
    document.getElementById("addButton").classList.replace('d-none', 'd-inline')
    document.getElementById("updateButton").classList.replace('d-inline', 'd-none')

    clear();

}

function validateProductName() {
    var regex = /^[A-Z][a-z]{2,9}$/

    if (regex.test(productName.value)) {
        if (productName.classList.contains("is-invalid")) {
            productName.classList.replace('is-invalid', 'is-valid')
        }
        else
            productName.classList.add("is-valid")
        return true
    }
    else {
        if (productName.classList.contains("is-valid")) {
            productName.classList.replace('is-valid', 'is-invalid')
        }
        else
            productName.classList.add("is-invalid")

        return false
    }
}
// Regular expression
/*

? means: one or not (optional) {0,1}
+ means: at least one or more   {1, }
* means: zero or more           {0, }
\s: White Space match
\S: Non-White Space match
\d: numbers 0 - 9 match
\D: Not 0 - 9 match 
\w: A-Z a-z 0-9 and _ match
\W: the revers of \w
\.:any characters match 

ex: 99-999 => ^[1-9][0-9][0-9]|99$

 */




const deleteProductButtonElements = document.querySelectorAll(".product-item button");

async function deleteProduct (event){ //see product-item.ejs
    const buttonElement = event.target; //target on which the event occured
    const productId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;

    const response = await fetch("/admin/products/" + productId + "?_csrf=" + csrfToken, { //sending the request to the server hosting this page, so no need to include the domain
        method: "DELETE"
    }); 

    if(!response.ok){
        alert("Something went wrong.");
        return;
    }

    buttonElement.parentElement.parentElement.parentElement.parentElement.remove(); //removing from the DOM
}

for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener("click", deleteProduct);
}

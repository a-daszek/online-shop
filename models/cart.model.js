class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0){ //adding a default value
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice =totalPrice;
    }
// this.items.push(product); this alone would work but - adding the same item multiple times would push multiple same items in the array. We want to do something different -
// we should have one product where we will keep track of the quantity of this product. Pushing is okay if a product is not a part of this items array yet.

    addItem(product){
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price
        };

        for (let i = 0; i < this.items.length; i++){
            const item = this.items[i];
            if (item.product.id === product.id){
                cartItem.quantity = item.quantity + 1;
                cartItem.totalPrice = item.totalPrice + product.price;
                this.items[i] = cartItem;

                this.totalQuantity++;
                this.totalPrice += product.price;
                return;
            }
            
        }
        this.items.push(cartItem)
        this.totalQuantity++;
        this.totalPrice += product.price;
       
    }

    updateItem(productId, newQuantity){ // hmm
        for (let i = 0; i < this.items.length; i++){
            const item = this.items[i];
            if (item.product.id === productId && newQuantity > 0){
                const cartItem = {...item};
                const quantityChange = newQuantity - item.quantity;
                cartItem.quantity = newQuantity;
                cartItem.totalPrice = newQuantity * product.price;
                this.items[i] = cartItem;

                this.totalQuantity = this.totalQuantity + quantityChange;
                this.totalPrice += quantityChange * product.price;
                return { updatedItemPrice: cartItem.totalPrice };
            } else if (item.product.id === productId && newQuantity <= 0){
                this.items.splice(i, 1);
                this.totalQuantity = this.totalQuantity - item.quantity;
                this.totalPrice -= item.totalPrice;
                return { updatedItemPrice: 0 };
            }
            
        }
    }
}

module.exports = Cart;
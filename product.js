class Product {
    constructor(sku, title, price) {
        this.sku = sku
        this.title = title
        this.price = price
        this.quantity = 1 // Cantidad por defecto de cada producto es 1.
    }

    getSku() {
        return this.sku
    }

    getTitle() {
        return this.title
    }

    getPrice() {
        return this.price
    }

    getQuantity() {
        return this.quantity
    }

    getTotal() {
        return this.quantity * this.price
    }
}
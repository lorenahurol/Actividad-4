class Product {
    // Privado: 
    #sku
    #title
    #price
            
    constructor({ SKU, title, price, units = 0 }) {
        this.#sku = SKU
        this.#title = title
        this.#price = Number(price)
        this.units = units // El valor de units es 0 por defecto, pero puede cambiar.
    }
          
    getSku() {
        return this.#sku;
    }

    getTitle() {
        return this.#title;
    }

    getPrice() {
        return this.#price;
    }

    getUnits() {
        return this.units;
    }

    getTotal() {
        return this.#price * this.units
    }
}
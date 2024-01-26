class Product {
  constructor({ sku, title, price, units = 0 }) {
    this.sku = sku
    this.title = title
    this.price = Number(price)
    this.units = units // Valor por defecto empieza en 0

    }
  }

  /*
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
*/
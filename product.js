class Product {
  constructor({ sku, title, price, units = 1 }) {
    this.sku = sku
    this.title = title
    this.price = Number(price)
    this.units = units // Valor por defecto es 1 (Se anade 1 unidad de producto cada vez al carrito)

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
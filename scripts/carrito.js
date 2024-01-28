class Carrito {
  constructor(products = [], currency = "€") {
    this.products = products // Guardar instancias de productos.
    this.currency = currency
  }

  addToCart(product) {
    this.products.push(product)
  }

  increaseUnits(sku) {
    const product = this.products.find(product => product.getSku() === sku)
    // Incrementar en 1:
    if (product) {
      product.units++
    }
 }

  decreaseUnits(sku) {
    const product = this.products.find(product => product.getSku() === sku)
    // Disminuir en 1, sin llegar a numeros negativos:
    if (product && product.units > 0) {
    product.units--
    }
  }

  getProductTotal(product) {
    return product.getPrice() * product.getUnits()
  }

  getTotal() {
    // El total es la suma de todos los valores en un solo valor:
    return this.products.reduce((acc, product) => {
      return acc + this.getProductTotal(product)
    }, 0)
  }
}
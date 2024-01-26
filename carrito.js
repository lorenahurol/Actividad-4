class Carrito {
  constructor(currency = "€") {
    this.products = [] // Guardar instancias de productos.
    this.currency = currency     
  }

  // Anadir al carrito:
  addToCart(product) {
    this.products.push(product)
  }

  // Quitar del carrito:
  removeFromCart(sku) {
    this.products = this.products.filter(product => product.sku !== sku)
  }

  // Actualiza el número de unidades que se quieren comprar de un producto
  updateUnits(sku, units) {
    // Seleccionar el producto por su SKU
    const productSKU = this.products.find(product => product.sku === sku)
    // Si el producto existe en el carrito, actualiza las unidades:
    if (productSKU) {
      productSKU.units = units
    }
  }

  // Devuelve los datos de 1 producto además de las unidades seleccionadas
  getProductInfo(sku) {
    const productSKU = this.products.find(product => product.sku === sku)

    if (productSKU) {
      return {
        sku: productSKU.sku,
        title: productSKU.title,
        units: productSKU.units
      }
    }
  }

  // Sumar una unidad de un producto al carrito (para manipularlo con el + button):
  increaseUnits(sku) {
    const productSKU = this.products.find(product => product.sku === sku)

    if (productSKU) {
      productSKU.units++
    }
  }

  // Restar una unidad de un producto al carrito (para manipularlo con el - button):
  substractUnits(sku) {
    const productSKU = this.products.find(product => product.sku === sku)

    if (productSKU && productSKU.units > 1) { // No puede haber unidades en negativo
      productSKU.units--
    }
    }
    
    // Calcular el total de cada producto:
    getProductTotal() {
        return product.price * product.units
    }

  // Valor total del array this.products = []
  getCarrito() {
    // Precio total calculado de todos los productos del carrito.
    const total = this.products.reduce((acc, product) => {
      return acc + (product.price * product.units)
    }, 0)

    const totalPrice = Number(total.toFixed(2))

    // Informacion completa de los productos anadidos al carrito. Se guarda en totalCarrito.
    const totalCarrito = []
    this.products.forEach(product => {
      totalCarrito.push({
        sku: product.sku,
        title: product.title,
        price: product.price,
        units: product.units
      })
    })

    return {
      products: totalCarrito,
      total: totalPrice,
      currency: this.currency
    }
  }
}
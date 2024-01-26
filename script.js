// ********** //
// Traer la clase Product //
class Product {
  constructor({ sku, title, price, units = 0 }) {
    this.sku = sku
    this.title = title
    this.price = Number(price)
    this.units = units
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

  getUnits() {
    return this.units
  }

  getTotal() {
    return this.price * this.units
  }
}


// *********** //
// Traer el carrito:
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
        return this.products.price * this.products.units
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

// Seleccionar elementos HTML:
const productsTableBody = document.querySelector("#products-table-body")
const totalTableBody = document.querySelector("#total-table-body")
const totalShopElement = document.querySelector("#total-shop")

// Pintar la tabla de productos:
const drawProductTable = (carrito) => {
  carrito.products.forEach(product => {
    const newRow = document.createElement("tr")
    console.log('Product units:', product.units);
console.log('Product price:', product.price);
    newRow.innerHTML = `
      <td class="table__col">
        <h4>${product.title}</h4>
        <p class="sku">Ref: ${product.sku}</p>
      </td>
      <td class="table__col--cantidad">
        <button class="increase-btn btn">-</button>
        <input type="number" class="cantidad__caja" id="cantidad-caja" value="${product.units}">
        <button class="subtract-btn btn">+</button>
      </td>
      <td class="table__col">${product.price}€</td>
      <td class="table__col">${product.units * product.price}€</td>
    `
    productsTableBody.appendChild(newRow)
  })
}

// Pintar la tabla del total de la compra:
const drawTotalTable = (carrito) => {
  // Calcular el total de la compra:
  const totalShop = carrito.products.reduce((acc, product) => {
    return acc + (product.units * product.price)
  }, 0)
  
  // Pintar la fila de los productos y el precio final:
  carrito.products.forEach(product => {
    const totalNewRow = document.createElement("tr")
    totalNewRow.innerHTML = `
    <td><p>${product.title}</p></td>
    <td>${totalShop.toFixed(2)}</td>
  `
    totalTableBody.appendChild(totalNewRow)
  
    totalShopElement.textContent = totalShop.toFixed(2) + "EUROS"
  })
}

document.addEventListener("DOMContentLoaded", () => {

  // Traer los productos de la API: 
  fetch("https://jsonblob.com/api/jsonBlob/1199751545553281024")
    .then(response => response.json())
    .then(products => {
      // Result disponible para trabajar:
      const result = products.products;

      // Instanciar el carrito:
      const carrito = new Carrito()

      // Agregar productos al carrito:
      result.forEach(products => {
        const product = new Product(products)
        carrito.addToCart(product)
      })

      // Llamar a las tablas dentro del DOM:
      drawProductTable(carrito)
      drawTotalTable(carrito)

      // Event Listeners para modificar las cantidades del carrito:

        
        
    });
});

// Input de la cantidad dentro de caja cantidad
// Data id


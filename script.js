// ********** //
// Traer la clase Product //
class Product {

  #sku
  #title
  #price
  #units

  constructor({ SKU, title, price, units = 0 }) {
    this.#sku = SKU
    this.#title = title
    this.#price = Number(price)
    this.#units = units
  }

  getSku() {
    return this.#sku
  }

  getTitle() {
    return this.#title
  }

  getPrice() {
    return this.#price
  }

  getUnits() {
    return this.#units
  }

  getTotal() {
    return this.#price * this.#units
  }
}


// *********** //
// Traer el carrito:
class Carrito {
  constructor(products = [], currency = "€") {
    this.products = products // Guardar instancias de productos.
    this.currency = currency     
  }

  // Comprobar si tenemos un producto especifico:
  isProduct(product) {
    return this.products.find(item => item.getSku() === product.getSku());
  }

  // Anadir al carrito:
  // Si el producto esta en el carrito, actualizar las unidades.
  addToCart(product) {
    const existingProduct = this.isProduct(product)
        if (!existingProduct) {
            this.products.push(product)
        } else {
            this.updateUnits(product.getSku(), existingProduct.getUnits() + 1)
    }
  }

  // Quitar del carrito:
  removeFromCart(sku) {
    this.products = this.products.filter(product => product.getSku() !== sku)
  }

  // Actualiza el número de unidades que se quieren comprar de un producto
  updateUnits(sku, units) {
    // Seleccionar el producto a actualizar por su SKU
    const productToUpdate = this.products.find(product => product.getSku() === sku)
    // Si el producto existe en el carrito, actualiza las unidades:
    if (productToUpdate) {
      productToUpdate.units = units
    }
  }

  // Devuelve los datos de 1 producto además de las unidades seleccionadas
  getProductInfo(sku) {
    const product = this.products.find(product => product.getSku() === sku)

    if (product) {
      return {
        sku: product.getSku(),
        title: product.getTitle(),
        units: product.getUnits()
      }
    }
  }

  // Sumar una unidad de un producto al carrito (para manipularlo con el + button):
  increaseUnits(sku) {
    const product = this.products.find(product => product.getSku() === sku)

    if (product) {
      product.units++
    }
  }

  // Restar una unidad de un producto al carrito (para manipularlo con el - button):
  decreaseUnits(sku) {
        const product = this.products.find(product => product.getSku() === sku);
        if (product && product.units > 0) { // El carrito no puede tener numeros negativos
            product.units--;
        }
    }
    
    // Calcular el total de cada producto:
    getProductTotal(product) {
        return product.getPrice() * product.getUnits()
    }

  // Valor total del array this.products = []
  getCarrito() {
    // Precio total calculado de todos los productos del carrito.
    const total = this.products.reduce((acc, product) => {
      return acc + (product.price * product.units)
    }, 0)

    // Informacion completa de los productos anadidos al carrito:
    const totalCarrito = this.products.map(product => ({
        sku: product.getSku(),
        title: product.getTitle(),
        price: product.getPrice(),
        units: product.getUnits()
    }))
        

    return {
      products: totalCarrito,
      total: Number(total.toFixed(2)),
      currency: this.currency
    }
  }
} 

/*
// Seleccionar elementos HTML:

const totalTableBody = document.querySelector("#total-table-body")
const totalShopElement = document.querySelector("#total-shop")

      // Event Listeners para manipulacion por parte del usuario:
    // Sumar y restar:
    newRow.querySelector(".increase-btn").addEventListener("click", () => {
      const sku = product.getSku();
      carrito.increaseUnits(sku)
      updateCartDisplay(carrito)
    })

    newRow.querySelector(".subtract-btn").addEventListener("click", () => {
      const sku = product.getSku();
      carrito.decreaseUnits(sku)
      updateCartDisplay(carrito)
    })
   
  })
}

 // Actualizar la tabla de productos: 
    const updateCartDisplay = (carrito) => {
    drawProductTable(carrito)
    drawTotalTable(carrito)
}


// Pintar la tabla del total de la compra:
const drawTotalTable = (carrito) => {
  totalTableBody.innerHTML = ""
  let totalShop = 0
  // Pintar la fila de los productos y el precio final:
  carrito.products.forEach(product => {
    totalShop += product.getPrice() * product.getUnits()
    const totalNewRow = document.createElement("tr")
    totalNewRow.innerHTML = `
    <td><p>${product.title}</p></td>
    <td>${totalShop.toFixed(2)}</td>
  `
    totalTableBody.appendChild(totalNewRow)
  
    totalShopElement.textContent = totalShop.toFixed(2) + "EUROS"

  
  }) 
} */

// Pintar la tabla con los datos de los productos:

const drawProductTable = (productInstances) => {
  // Seleccionar el HTML
  const productTableBody = document.querySelector("#products-table-body")
  // Vaciar la tabla antes de pintarla:
  productTableBody.innerHTML = ""

  // Iterar sobre las instancias de los productos y anadir a la tabla:

  productInstances.forEach(product => {
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
    <td class="table__col">
        <h4>${product.getTitle()}</h4>
        <p class="sku">Ref: ${product.getSku()}</p>
      </td>
      <td class="table__col--cantidad">
        <button class="subtract-btn btn">-</button>
        <div class="cantidad__caja">${product.getUnits()}</div>
        <button class="increase-btn btn">+</button>
      </td>
      <td class="table__col">${product.getPrice()}€</td>
      <td class="table__col">${product.getTotal()}€</td>
    `
    productTableBody.appendChild(newRow)
    
  });
}

// Pintar la tabla del checkout Total:




  document.addEventListener("DOMContentLoaded", () => {

    // Traer los productos de la API: 
    fetch("https://jsonblob.com/api/jsonBlob/1199751545553281024")
      .then(response => response.json())
      .then(products => {
        // Result disponible para trabajar:
        const result = products.products;
        console.log(result)
        
        // Instanciar el resultado de la API con los productos:
        const productInstances = result.map(productInfo => {
          return new Product(productInfo)
        })

        drawProductTable(productInstances)

      })
  })

// Mas event Listeners y operaciones de Carrito
// Arreglar botones llamando a varios productos
// Arreglar tabla total
// Maquetar



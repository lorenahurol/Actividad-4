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

  // Comprobar si tenemos el producto:
  isProduct(product) {
    this.products.find((item) => item.getSku() === product.getSku());
  }
  // Anadir al carrito:
  addToCart(product) {
        if (!this.isProduct(product)) {
            this.products.push(product)
        } else {
            this.updateUnits(product.getSku(), product.getUnits() + 1)
        }
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
  decreaseUnits(sku) {
        const product = this.products.find(product => product.sku === sku);
        if (product && product.units > 0) { // El carrito no puede tener numeros negativos
            product.units--;
        }
    }
    
    // Calcular el total de cada producto:
    getProductTotal(product) {
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

// Seleccionar elementos HTML:
const productsTableBody = document.querySelector("#products-table-body")
const totalTableBody = document.querySelector("#total-table-body")
const totalShopElement = document.querySelector("#total-shop")

// Instancia del carrito:
const carrito = new Carrito()



// Pintar la tabla de productos:
const drawProductTable = (carrito) => {
  // Vaciar la tabla antes de pintarla:
  productsTableBody.innerHTML = ""

  carrito.products.forEach(product => {
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
      <td class="table__col">
        <h4>${product.title}</h4>
        <p class="sku">Ref: ${product.sku}</p>
      </td>
      <td class="table__col--cantidad">
        <button class="subtract-btn btn">-</button>
        <div class="cantidad__caja">${product.units}</div>
        <button class="increase-btn btn">+</button>
      </td>
      <td class="table__col">${product.price}€</td>
      <td class="table__col">${carrito.getProductTotal(product)}€</td>
    `
    productsTableBody.appendChild(newRow)

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
}

  document.addEventListener("DOMContentLoaded", () => {

    // Traer los productos de la API: 
    fetch("https://jsonblob.com/api/jsonBlob/1199751545553281024")
      .then(response => response.json())
      .then(products => {
        // Result disponible para trabajar:
        const result = products.products;
        console.log(result)
        

        // Instanciar el carrito:
        const carrito = new Carrito()

        // Agregar productos al carrito:
        result.forEach(products => {
          const product = new Product(products)
          
          carrito.addToCart(product)
        })

        console.log("Products in cart:", carrito.products);

        

        // Llamar a las tablas dentro del DOM:
        drawProductTable(carrito)
        drawTotalTable(carrito)
      })
  })

// Mas event Listeners y operaciones de Carrito
// Arreglar SKU undefined
// Arreglar botones llamando a varios productos
// Arreglar tabla total
// Maquetar



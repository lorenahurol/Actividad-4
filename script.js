// ********** //
// Traer la clase Product //
// const product = new Product()
class Product {
  constructor({ sku, title, price, units = 1 }) {
    this.sku = sku
    this.title = title
    this.price = Number(price)
    this.units = units // Valor por defecto es 1 (Se anade 1 unidad de producto cada vez al carrito)
  }
}

// *********** //
// Traer el carrito:
// const carrito = new Carrito()
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
  

// ********** //

// Seleccionando los elementos del HTML:

// Seleccionando los elementos del HTML:
const productosTotal = document.querySelector("#productos-total")

document.addEventListener("DOMContentLoaded", () => {

  // Traer los productos de la API: 
  fetch("https://jsonblob.com/api/jsonBlob/1199751545553281024")
    .then(response => response.json())
    .then(products => {
      // Result disponible para trabajar:
      const result = products.products;

      // Pintar la tabla de los productos:
      const drawProductTable = (products) => {
        const tableElement = document.querySelector("table")
    
        const tbody = document.createElement("tbody")

        // Crear una fila en la tabla para cada uno de los productos:
        products.forEach(product => {
          const newRow = document.createElement("tr")
          newRow.classList.add("table__row")

          newRow.innerHTML = `
            <td class="table__col">
              <h4>${product.title}</h4>
              <p class="sku">Ref: ${product.SKU}</p>
            </td>
            <td class="table__col--cantidad">
              <button class="btn">-</button>
              <div class="cantidad__caja" id="cantidad-caja">1</div>
              <button class="btn">+</button>
            </td>
            <td class="table__col">${product.price}€</td>
            <td class="table__col">${product.price}€</td>
          `
          tbody.appendChild(newRow)
        });

        tableElement.appendChild(tbody)

        const productContainer = document.querySelector("#products-container")
          productContainer.appendChild(tableElement)
      }

        drawProductTable(result)

        
        
    });
});

// Input de la cantidad dentro de caja cantidad
// Data id
// Pintar la tabla total:
        // const drawTotalTable = (addedProducts) => {}


// Url de la API:
const jsonBlob = "https://jsonblob.com/api/jsonBlob/1199751545553281024"
    
// *********** //
// Traer el carrito:
// const carrito = new Carrito()

class Carrito {
    constructor(currency = "€", productos = []) {
        this.currency = currency
        this.productos = productos
        this.total = 0 // Inicializando el total en 0.
    }

    actualizarUnidades(sku, unidades) {
    // Actualiza el número de unidades que se quieren comprar de un producto
    }
    obtenerInformacionProducto(sku) {
    // Devuelve los datos de un producto además de las unidades seleccionadas
    // Por ejemplo
    // {
    // "sku": "0K3QOSOV4V",
    // "quantity": 3
    // }
    }
    obtenerCarrito() {
    return this.productos
    // Devuelve información de los productos añadidos al carrito
    // Además del total calculado de todos los productos
    // Por ejemplo:
    // {
    // "total": "5820",
    // "currency: "€",
    // "products" : [
    // {
    // "sku": "0K3QOSOV4V"
    // ..
    // }
    // ]}
    // }
}
}

// ********** //

// Seleccionando los elementos del HTML:
const productsContainer = document.querySelector("#productos-container");
const productosTotal = document.querySelector("#productos-total")

document.addEventListener("DOMContentLoaded", () => {

  // Traer los productos de la API: https://jsonblob.com/api/jsonBlob/1199751545553281024
  fetch(jsonBlob)
    .then(response => response.json())
    .then(products => {
      // Result disponible para trabajar:
      const result = products.products;

      // Pintar las tarjetas de los productos:
        function drawProductCards(result) {
        result.forEach(product => {
          const productSKU = product.SKU;
          const productTitle = product.title;
          const productPrice = product.price;

          const newProduct = document.createElement("div");
          newProduct.classList = "tarjeta__producto";
          newProduct.innerHTML = 
            `<p>${productSKU}</p>
            <h3>${productTitle}</h3>
            <p>${productPrice}</p>`;

          productsContainer.appendChild(newProduct);
        });
      }

      drawProductCards(result);
    });
});

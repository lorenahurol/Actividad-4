// ********** //
// Traer la clase Product //
    const product = new Product()



// *********** //
// Traer el carrito:
    const carrito = new Carrito()

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
// Pintar la tabla total:
        // const drawTotalTable = (addedProducts) => {}


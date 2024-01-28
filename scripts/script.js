document.addEventListener("DOMContentLoaded", () => {
    // Instancia de la clase Carrito:
    const carrito = new Carrito()

    // Llamada a la API:
    fetch("https://jsonblob.com/api/jsonBlob/1199751545553281024")
    .then(response => response.json())
    .then(products => {
        const result = products.products

        result.forEach(productInfo => {
    // Anadir la propiedad units si no existe en productInfo:
    if (!productInfo.hasOwnProperty('units')) {
        productInfo.units = 0
        }
            
    const product = new Product(productInfo)
    carrito.addToCart(product)
    })

    // Pintar la TABLA DE PRODUCTOS:
    const drawProductTable = (carrito) => {
        const productsTableBody = document.querySelector("#products-table-body")
        // Vaciar la tabla antes de pintarla:
        productsTableBody.innerHTML = ""
        
        // Iterar sobre los productos y pintarlos en la tabla usando innerHTML:
        carrito.products.forEach(product => {
            const newRow = document.createElement("tr")
            newRow.classList.add("table__row")
            newRow.innerHTML = `
                <td class="table__col">
                    <h3>${product.getTitle()}</h3>
                    <p class="sku">Ref: ${product.getSku()}</p>
                </td>
                <td class="table__col--quantity">
                    <button class="btn" id="subtract-btn">-</button>
                    <input type="number" class="products__quantity--box" id="product-quantity" value="${product.getUnits()}" min="0">
                    <button class="btn" id="increase-btn">+</button>
                </td>
                <td class="table__col">${product.getPrice()}${carrito.currency}</td>
                <td class="table__col--total" id="table-col-total">${carrito.getProductTotal(product).toFixed(2)}${carrito.currency}</td>
                `
            productsTableBody.appendChild(newRow)

        // EVENT LISTENERS: para manipulacion por parte del usuario:
            // Definir quantityElement:
            const quantityElement = newRow.querySelector("#product-quantity")

            // Anadir 1 con cada click en +:
            newRow.querySelector("#increase-btn").addEventListener("click", () => {
            const sku = product.getSku()
            carrito.increaseUnits(sku)
            updateQuantityAndTotal()
            })

            // Restar 1 con cada click en -:
            newRow.querySelector("#subtract-btn").addEventListener("click", () => {
            const sku = product.getSku()
            carrito.decreaseUnits(sku)
            updateQuantityAndTotal()
            })

            // Modificar la cantidad del input:
            quantityElement.addEventListener("input", (ev) => {
            // Eliminar caracteres que no sean numeros:
            ev.target.value = ev.target.value.replace(/\D/g, '')
              
            const newQuantity = parseInt(ev.target.value) // Numero entero.
            if (ev.target.value === "") { // Si el campo esta vacio, las unidades son 0.
                product.units = 0
            // Validacion del numero: Si es valido, se actualiza la cantidad de las unidades:
            } else if (!isNaN(newQuantity) && newQuantity >= 0) {
                product.units = newQuantity
            } else { // Si no es valido, se restauran las unidades.
                ev.target.value = product.getUnits();
                return
            }
            updateTotal()
            })
        
            // Actualizar la cantidad de producto y el total de la compra:
            const updateQuantityAndTotal = () => {
                quantityElement.value = product.getUnits()
                updateTotal()
            }
        
            // Actualizar y pintar el calculo total del producto y sus unidades:
            const updateTotal = () => {
                const totalElement = newRow.querySelector('#table-col-total')
                totalElement.textContent = carrito.getProductTotal(product).toFixed(2) + carrito.currency
                drawTotalTable(carrito)
            }
        })
    }
             
    // Pintar la TABLA DEL TOTAL de la compra:
        const drawTotalTable = (carrito) => {
        const totalTableBody = document.querySelector("#total-table-body")
        // Vaciar la tabla antes de anadir datos:
        totalTableBody.innerHTML = ""

        // Iterar sobre los productos del carrito y anadir a la tabla:
        carrito.products.forEach(product => {
            // Si el producto tiene mas de 0 unidades, anadir una fila:
            if (product.getUnits() > 0) {
                const newRow = document.createElement("tr")
            // Anadir los datos del producto a la fila:
                newRow.innerHTML = `
                    <td>${product.getTitle()}</td>
                    <td>${carrito.getProductTotal(product).toFixed(2)}${carrito.currency}</td>
                `
                totalTableBody.appendChild(newRow)
            }

        // Actualizar el total del carrito en tfoot:
        const totalShopElement = document.querySelector("#total-shop")
        totalShopElement.classList.add("total__table--price")    
        totalShopElement.textContent = carrito.getTotal().toFixed(2) + carrito.currency
        })
    }
            
    // Llamar a las funciones para pintar las tablas en la interfaz:
        drawProductTable(carrito)
        drawTotalTable(carrito)
    })
})

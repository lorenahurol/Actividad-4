class Carrito {
    constructor(currency = "€", products = []) {
        this.currency = currency
        this.products = products
        this.total = 0 // El estado inicial del carrito es 0.
    }

    addToCart(product) {
        this.products 
    }
    
    removeFromCart() {
        this.products = this.products.filter(productos => products.sku !== sku)
    }

    updateItemNumber (sku, unidades) {
        // Actualiza el número de unidades que se quieren comprar de un producto
        
    }
    
    getProductInfo(sku) {
    // Devuelve los datos de un producto además de las unidades seleccionadas
    return this.products.find((product) => product.getSku() === sku)
    }

    getCarrito() {
    return this.products
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
document.addEventListener('DOMContentLoaded', () => {
    const productListDiv = document.getElementById('product-list');

    // Función para cargar los productos desde el JSON
    function loadProducts() {
        // En un entorno real, usarías fetch() para cargar products.json
        // Para este ejemplo, asumimos que productsData ya está disponible globalmente
        // gracias a <script src="products.json"></script>
        // Si no funciona, necesitarías un servidor o cargar el JSON de otra forma
        // fetch('products.json')
        //     .then(response => response.json())
        //     .then(products => {
        //         displayProducts(products);
        //     })
        //     .catch(error => console.error('Error cargando productos:', error));

        // Para fines de este ejemplo sin un servidor, cargaremos productsData
        // directamente si products.json fue inyectado en el scope global
        // (Esto es una forma básica, no ideal para producción)
        if (typeof productsData !== 'undefined') { // Asumiendo que products.json expone una variable global productsData
            displayProducts(productsData);
        } else {
            // Fallback si productsData no está definido (por ejemplo, si products.json no exporta)
            // Aquí puedes pegar el contenido de products.json directamente como un array para probar
            const hardcodedProducts = [
                {
                    "id": 1,
                    "name": "Collar Luna Florada",
                    "price": "25.00€",
                    "image": "images/collar-luna-florada.jpg"
                },
                {
                    "id": 2,
                    "name": "Pendientes Corazón Pastel",
                    "price": "18.50€",
                    "image": "images/pendientes-corazon-pastel.jpg"
                },
                {
                    "id": 3,
                    "name": "Pulsera Hilo Mágico",
                    "price": "15.00€",
                    "image": "images/pulsera-hilo-magico.jpg"
                },
                {
                    "id": 4,
                    "name": "Anillo Ajustable Flor",
                    "price": "20.00€",
                    "image": "images/anillo-flor.jpg"
                }
            ];
            displayProducts(hardcodedProducts);
        }
    }

    // Función para mostrar los productos en la página
    function displayProducts(products) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.productId = product.id; // Guarda el ID para el click
            productCard.dataset.productName = product.name; // Guarda el nombre

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            `;

            productCard.addEventListener('click', () => redirectToWhatsApp(product.name));
            productListDiv.appendChild(productCard);
        });
    }

    // Función para redirigir a WhatsApp
    function redirectToWhatsApp(productName) {
        const phoneNumber = 'TUNUMERODEWHATSAPP'; // ¡Cambia esto por tu número de WhatsApp! (con código de país, sin + ni 00, ej: 346XXXXXXXX)
        const message = encodeURIComponent(`¡Hola! Estoy interesado/a en el producto: *${productName}*. ¿Podrías darme más información?`);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
    }

    loadProducts(); // Llama a la función para cargar los productos al inicio
});
ProyectoFinal Ratto

Simulador interactivo de Ecommerce de música desarrollado en JavaScript.
Permite ver tracks de música, agregarlos al carrito, calcular el total y simular el proceso de compra.

⸻

Tecnologías utilizadas
	•	HTML5
	•	CSS3
	•	JavaScript (ES6+)
	•	SweetAlert2 (para notificaciones interactivas)

⸻

Cómo ejecutar
	1.	Clonar el repositorio o descargar el ZIP.
	2.	Abrir index.html en el navegador (recomendado usar Live Server).
	3.	Interactuar con los botones “Catálogo” y “Carrito”.


Estructura del proyecto
ProyectoFinalRatto/
│
├── index.html               # Página principal
├── css/
│   └── style.css            # Estilos del proyecto
├── js/
│   └── app.js               # Lógica en JavaScript
├── imagenes/
│   └── logo.png             # Logo de la tienda
└── README.md                # Este archivo


Funcionalidades
	•	Catálogo de tracks: se cargan dinámicamente desde la API de iTunes.
	•	Agregar al carrito: cada track se puede agregar, incrementando cantidad si ya existe.
	•	Visualización del carrito: se muestra con tarjetas, subtotal por track y total general.
	•	Eliminar items: cada track del carrito se puede eliminar.
	•	Finalizar compra: confirma la compra con SweetAlert2 y vacía el carrito.
	•	Scroll interactivo: los botones del nav hacen scroll hacia catálogo o carrito.

⸻

Notas
	•	Se utiliza SweetAlert2 para reemplazar alert y prompt del JS tradicional.
	•	Se manejan valores predeterminados para tracks que no tengan precio (0.99 USD).
	•	Todo el JS está separado del HTML para mantener la integridad y legibilidad del código.
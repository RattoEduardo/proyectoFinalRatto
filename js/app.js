let Carrito = []

const catalogo = document.getElementById("catalogo")


const carritoContainer = document.createElement("section")
carritoContainer.id = "listaCarrito"
carritoContainer.style.padding = "20px"
document.querySelector("main").appendChild(carritoContainer)

document.addEventListener("DOMContentLoaded", () => {

    const botonCatalogo = document.getElementById("verCatalogo")
    const botonCarrito = document.getElementById("verCarrito")

    botonCatalogo.addEventListener("click", (e) => {
        e.preventDefault()
        catalogo.scrollIntoView({ behavior: "smooth" })
    })

    botonCarrito.addEventListener("click", (e) => {
        e.preventDefault()
        carritoContainer.scrollIntoView({ behavior: "smooth" })
    })

   
    cargarTracks()
    renderCarrito()
})


const url = "https://api.deezer.com/search?q=techno&limit=12&output=jsonp";

function cargarTracks() {
    fetchJsonp(url)
      .then(res => res.json())
      .then(data => {
        mostrarTracks(data.data);
      })
      .catch(error => console.error("Error cargando tracks:", error));
  }


  function mostrarTracks(tracks) {
    catalogo.innerHTML = ""

    tracks.forEach(track => {
        const div= document.createElement("div")
        div.classList.add("track")
        div.innerHTML = `
            <img src="${track.album.cover_medium}" alt="${track.title}">
            <div class="track-info">
               <h3>${track.title}</h3>
               <p>${track.artist.name}</p>
               <p><strong>USD 0.99</strong></p>
            </div>  
            <div class="track-controls">
                <audio controls src="${track.preview}"></audio>
            </div> 
        `
        const boton = document.createElement("button")
        boton.textContent = "Agregar al carrito"
        boton.addEventListener("click", () => {
            agregarAlCarrito({
                id: track.id,
                title: track.title,
                artist: track.artist.name,
                cover: track.album.cover_medium,
                preview: track.preview,
                cantidad: 1
            })
        })

        div.appendChild(boton)
        catalogo.appendChild(div)
    });
}

function agregarAlCarrito(track) {
    const index = Carrito.findIndex(item => item.id === track.id)
    if(index !== -1) {
        Carrito[index].cantidad += 1
    } else {
        Carrito.push(track)
    }

    renderCarrito()

    Swal.fire({
        icon: 'success',
        title: 'Agregado al carrito!',
        text: `${track.title} de ${track.artist}`,
        timer: 1000,
        showConfirmButton: false
    })
}

function eliminarDelCarrito(trackId) {
    Carrito = Carrito.filter(item => item.id !== trackId)
    renderCarrito()
}

function calcularTotal() {
    return Carrito.reduce((acc, item) => acc + 0.99 * item.cantidad, 0)
}


function renderCarrito() {
    carritoContainer.innerHTML = "<h2>Carrito</h2>"

    if(Carrito.length === 0) {
        carritoContainer.innerHTML += "<p>Tu carrito está vacío.</p>"
        return
    }

    Carrito.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("carritoTarjeta")
        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.artist}</p>
            <p>Precio: USD 0.99</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Subtotal: USD ${(0.99 * item.cantidad).toFixed(2)}</p>
        `
        const botonEliminar = document.createElement("button")
        botonEliminar.textContent = "Eliminar"
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(item.id))
        div.appendChild(botonEliminar)

        carritoContainer.appendChild(div)
    })

    const totalDiv = document.createElement("div")
    totalDiv.style.marginTop = "15px"
    totalDiv.innerHTML = `<h3>Total: USD ${(Carrito.length * 0.99).toFixed(2)}</h3>`
    carritoContainer.appendChild(totalDiv)

    const botonComprar = document.createElement("button")
    botonComprar.textContent = "Finalizar compra"
    botonComprar.style.marginTop = "10px"
    botonComprar.addEventListener("click", finalizarCompra)
    carritoContainer.appendChild(botonComprar)
}


function finalizarCompra() {
    if(Carrito.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'Agregá algún track antes de comprar!'
        })
        return
    }

    Swal.fire({
        title: 'Confirmar compra',
        text: `Total a pagar: USD ${calcularTotal().toFixed(2)}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if(result.isConfirmed) {
            Carrito = []
            renderCarrito()
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada!',
                text: 'Gracias por tu compra.'
            })
        }
    })
}


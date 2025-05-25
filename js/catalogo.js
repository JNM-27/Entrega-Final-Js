let librosCatalogo = [];
fetch("./db/data.json")
  .then((response) => response.json())
  .then((data) => {
    librosCatalogo = data;
    data.forEach((libro) => {
      mostrarInformacion(libro);
    });
  });
let librosCarrito =
  JSON.parse(localStorage.getItem("librosCarritoAlmacenado")) || [];
const botonVaciarCarrito = document.getElementById("vaciarCarrito");
botonVaciarCarrito.addEventListener("click", () => vaciarCarrito());
const botonTicket = document.getElementById("imprimirTicket");
botonTicket.addEventListener("click", () => imprimirTicket());
const precioMaximoInput = document.getElementById("precioMaximo");
precioMaximoInput.addEventListener("input", precioMaximo);
function mostrarInformacion(libro) {
  const catalogo = document.getElementById("catalogo");
  let itemCatalogo = document.createElement("div");
  itemCatalogo.className = "itemCatalogo";
  itemCatalogo.innerHTML = `<img src =${libro.foto} class="fotoLibro"/>
                                    <span>${libro.nombre}</span>
                                    <h3>Año: ${libro.año}</h3>
                                    <h4> Precio: $${libro.precio}</h4>
                                    <button class="botonAgregar" id="agregar${libro.id}">Añadir</button>  `;
  catalogo.appendChild(itemCatalogo);
  const botonAgregar = document.getElementById(`agregar${libro.id}`);
  botonAgregar.addEventListener("click", () => {
    sumarAlCarrito(libro.id);
  });
}
function mostrarCarrito() {
  const carrito = document.getElementById("carrito");
  if (librosCarrito.length == 0) {
    botonVaciarCarrito.style.display = "none";
    botonTicket.style.display = "none";
    carrito.innerHTML = ``;
    let itemCarrito = document.createElement("div");
    itemCarrito.innerHTML = `<h1 id=avisoCarritoVacio>No ha agregado ningún libro al carrito</h1>`;
    carrito.appendChild(itemCarrito);
  } else {
    botonVaciarCarrito.style.display = "inline-block";
    botonTicket.style.display = "inline-block";
    carrito.innerHTML = ``;
    librosCarrito.forEach((libro) => {
      if (libro.contador >= 1) {
        let itemCarrito = document.createElement("div");
        itemCarrito.className = "itemCarrito";
        itemCarrito.innerHTML = `<li>${libro.contador} ${libro.nombre}: $${
          libro.precio * libro.contador
        }</li>
    <button class="botonRemover" id="remover${libro.id}">-</button>
    <button class="botonAgregarEnTicket" id="agregarEnTicket${
      libro.id
    }">+</button>`;
        carrito.appendChild(itemCarrito);
        const botonRemover = document.getElementById(`remover${libro.id}`);
        botonRemover.addEventListener("click", () => removerDelCarrito(libro));
        const botonAgregarEnTicket = document.getElementById(
          `agregarEnTicket${libro.id}`
        );
        botonAgregarEnTicket.addEventListener("click", () =>
          sumarAlCarrito(libro.id)
        );
      }
    });
  }
  botonVaciarCarrito.classList.add("activo");
  botonVaciarCarrito.addEventListener("click", vaciarCarrito);
}
function sumarAlCarrito(id) {
  const libroCatalogo = librosCatalogo.find((libro) => libro.id === id);
  let libroEnCarrito = librosCarrito.find((producto) => producto.id === id);
  if (libroEnCarrito) {
    libroEnCarrito.contador++;
  } else {
    const libroCopia = { ...libroCatalogo, contador: 1 };
    librosCarrito.push(libroCopia);
  }
  localStorage.setItem(
    "librosCarritoAlmacenado",
    JSON.stringify(librosCarrito)
  );
  Toastify({
    text: "Añadido al Carrito",
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: " #4caf50",
    destination: "https://apvarun.github.io/toastify-js/#",
  }).showToast();
  mostrarCarrito();
}
function removerDelCarrito(libro) {
  let libroEnCarrito = librosCarrito.find(
    (producto) => producto.id === libro.id
  );
  if (libroEnCarrito) {
    libroEnCarrito.contador--;
    if (libroEnCarrito.contador <= 0) {
      librosCarrito = librosCarrito.filter(
        (producto) => producto.id !== libro.id
      );
    }
  }
  Toastify({
    text: "Removido del Carrito",
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: " red",
    destination: "https://apvarun.github.io/toastify-js/#",
  }).showToast();
  localStorage.setItem(
    "librosCarritoAlmacenado",
    JSON.stringify(librosCarrito)
  );
  mostrarCarrito();
}
function vaciarCarrito() {
  Swal.fire({
    title: "¿Seguro que quiere vaciar el carrito?",
    text: "Esta acción es irreversible",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4caf50",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, vaciar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Vaciado!",
        text: "Su carrito ha sido vaciado.",
        icon: "success",
      });
      librosCarrito.forEach((libro) => {
        libro.contador = 0;
      });
      limpiarPantalla();
    }
  });
}
function precioMaximo() {
  let precioMaximo = this.value;
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = ``;
  librosCatalogo.forEach((libro) => {
    if (libro.precio <= precioMaximo) {
      mostrarInformacion(libro);
    }
  });
  if (precioMaximo === "") {
    librosCatalogo.forEach((libro) => {
      mostrarInformacion(libro);
    });
  }
}
function limpiarPantalla() {
  librosCarrito.forEach((libro) => {
    libro.contador = 0;
  });
  librosCarrito.length = 0;
  botonVaciarCarrito.style.display = "none";
  botonTicket.style.display = "none";
  botonFinalizarCompra.style.display = "none";
  carrito.innerHTML = `<h1 id= avisoCarritoVacio>No ha agregado ningún libro al carrito</h1>`;
  ticket.innerHTML = ``;
  ingresoDatos.innerHTML = ``;
  localStorage.clear();
}
mostrarCarrito();

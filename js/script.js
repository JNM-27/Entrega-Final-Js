const libros = [
  {
    nombre: "El Conde de Montecristo",
    año: 1891,
    precio: 3000,
    id: 1,
  },
  { nombre: "Lord of the Flies", año: 1951, precio: 2500, id: 2 },
  {
    nombre: "Don Quijote de La Mancha",
    año: 1605,
    precio: 2000,
    id: 3,
  },
  {
    nombre: "La Comunidad del Anillo",
    año: 1954,
    precio: 1500,
    id: 4,
  },
  { nombre: "The Shining", año: 1977, precio: 1000, id: 5 },
  { nombre: "El Hobbit", año: 1937, precio: 1500, id: 6 },
  {
    nombre: "La Máquina del Tiempo",
    año: 1895,
    precio: 900,
    id: 7,
  },
  {
    nombre: "El Problema de los Tres Cuerpos",
    año: 2006,
    precio: 750,
    id: 8,
  },
  { nombre: "El Principito", año: 1943, precio: 500, id: 9 },
  { nombre: "It", año: 1986, precio: 1750, id: 10 },
];
const librosCarrito =
  JSON.parse(localStorage.getItem("librosCarritoAlmacenado")) || [];

function mostrarCatalogo() {
  const catalogo = document.getElementById("catalogo");
  libros.forEach((libro) => {
    let itemCatalogo = document.createElement("div");
    itemCatalogo.className = "itemCatalogo";
    itemCatalogo.innerHTML = `<span>${libro.nombre}</span>
    <h3>Año: ${libro.año}</h3>
    <h4> Precio: $${libro.precio}</h4>
      <button class="botonAgregar" id="agregar${libro.id}">Añadir</button>
      <button class="botonRemover" id="remover${libro.id}">Remover</button>`;
    catalogo.appendChild(itemCatalogo);
    const botonAgregar = document.getElementById(`agregar${libro.id}`);
    botonAgregar.addEventListener("click", () => sumarAlCarrito(libro));
    const botonRemover = document.getElementById(`remover${libro.id}`);
    botonRemover.addEventListener("click", () => removerDelCarrito(libro.id));
  });
}
function mostrarCarrito() {
  const carrito = document.getElementById("carrito");
  carrito.innerHTML = ``;
  librosCarrito.forEach((libroCarrito) => {
    let itemCarrito = document.createElement("div");
    itemCarrito.className = "itemCarrito";
    itemCarrito.innerHTML = `<li>${libroCarrito.nombre}: $${libroCarrito.precio}</li>`;
    carrito.appendChild(itemCarrito);
  });
}
function sumarAlCarrito(a) {
  librosCarrito.push(a);
  localStorage.setItem(
    "librosCarritoAlmacenado",
    JSON.stringify(librosCarrito)
  );
  mostrarCarrito();
}
function removerDelCarrito(a) {
  const posicion = librosCarrito.findIndex(
    (libroCarrito) => libroCarrito.id == a
  );
  if (posicion !== -1) {
    librosCarrito.splice(posicion, 1);
    localStorage.setItem(
      "librosCarritoAlmacenado",
      JSON.stringify(librosCarrito)
    );
  }
  mostrarCarrito();
}
function vaciarCarrito() {
  librosCarrito.length = 0;
  carrito.innerHTML = ``;
  ticket.innerHTML = ``;
  localStorage.clear();
}
function imprimirTicket() {
  const ticket = document.getElementById("ticket");
  ticket.innerHTML = ``;
  if (librosCarrito.length == 0) {
    ticket.innerHTML = `<h1>Recibo de Compra</h1>
                        <h2> Carrito vacio</h2>`;
  } else {
    let precioFinal = librosCarrito.reduce(
      (acumulador, libro) => acumulador + libro.precio,
      0
    );
    if (librosCarrito.length >= 5) {
      precioFinal =
        librosCarrito.reduce(
          (acumulador, libro) => acumulador + libro.precio,
          0
        ) * 0.8;
    }
    let ticketImpreso = document.createElement("div");
    ticketImpreso.className = "ticketImpreso";
    if (librosCarrito.length >= 5) {
      ticketImpreso.innerHTML = `<h1>Recibo de Compra</h1>
                            <h2> Cantidad de Items Comprados: ${librosCarrito.length}</h2>
                            <h2> Descuento del %20 por compra de 5 o más libros</h2>
                            <h2>Precio Final: $${precioFinal}`;
    } else {
      ticketImpreso.innerHTML = `<h1>Recibo de Compra</h1>
                            <h2> Cantidad de Items Comprados: ${librosCarrito.length}</h2>
                            <h2>Precio Final: $${precioFinal}`;
    }
    ticket.appendChild(ticketImpreso);
  }
}
function precioMaximo() {
  let precioMaximo = this.value;
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = ``;
  libros.forEach((libro) => {
    if (libro.precio <= precioMaximo) {
      let itemCatalogo = document.createElement("div");
      itemCatalogo.className = "itemCatalogo";
      itemCatalogo.innerHTML = `<span>${libro.nombre}</span>
      <h3>Año: ${libro.año}</h3>
      <h4> Precio: $${libro.precio}</h4>
      <button class="botonAgregar" id="agregar${libro.id}">Añadir</button>
      <button class="botonRemover" id="remover${libro.id}">Remover</button>`;
      catalogo.appendChild(itemCatalogo);
      const botonAgregar = document.getElementById(`agregar${libro.id}`);
      botonAgregar.addEventListener("click", () => sumarAlCarrito(libro));
      const botonRemover = document.getElementById(`remover${libro.id}`);
      botonRemover.addEventListener("click", () => removerDelCarrito(libro));
    }
  });
}

mostrarCatalogo();
if (librosCarrito.length > 0) {
  mostrarCarrito();
}
const botonVaciarCarrito = document.getElementById("vaciarCarrito");
botonVaciarCarrito.addEventListener("click", () => vaciarCarrito());
const botonFinCompra = document.getElementById("finalizarCompra");
botonFinCompra.addEventListener("click", imprimirTicket);
const precioMaximoInput = document.getElementById("precioMaximo");
precioMaximoInput.addEventListener("input", precioMaximo);

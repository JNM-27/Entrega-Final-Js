const ticket = document.getElementById("ticket");
let ticketImpreso = document.createElement("div");
ticketImpreso.className = "ticketImpreso";
ticketImpreso.innerHTML = `<table></table>`;
let botonFinalizarCompra = document.getElementById("finCompra");
botonFinalizarCompra.addEventListener("click", () => finCompra());
botonFinalizarCompra.style.display = "none";
function finCompra() {
  Swal.fire({
    title: "Confirmar compra",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#4caf50",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      let nombre = document.getElementById("nombre").value;
      let direccion = document.getElementById("direccion").value;
      let telefono = document.getElementById("telefono").value;
      if (!nombre || !direccion || !telefono) {
        Swal.fire({
          title: "Datos incompletos",
          text: "Por favor complete todos los datos para confirmar la compra.",
          icon: "warning",
        });
        return;
      }
      Swal.fire({
        title: `Felicidades por su Compra ${nombre}!`,
        text: `Su pedido llegará a ${direccion} dentro de 3-5 días hábiles. El día de la entrega lo llamaremos a ${telefono}`,
        icon: "success",
      });
      limpiarPantalla();
    }
  });
}
function mostrarItemEnTicket(tabla) {
  let precioFinal = 0;
  librosCarrito.forEach((libro) => {
    if (libro.contador > 0) {
      precioFinal = precioFinal + libro.precio * libro.contador;
      let fila = document.createElement("tr");
      fila.className = "ticketImpreso";
      fila.innerHTML = `
                                <td>${libro.nombre}</td>
                                <td>${libro.contador}</td>
                                <td>$${libro.precio}</td>
                                <td>$${libro.precio * libro.contador}</td>`;
      tabla.appendChild(fila);
    }
  });
  let filaPrecioFinal = document.createElement("tr");
  filaPrecioFinal.className = "ticketImpreso";
  filaPrecioFinal.innerHTML = `
                                <td>Total</td>
                                <td>${precioFinal}</td>`;
  tabla.appendChild(filaPrecioFinal);
}
function imprimirTicket() {
  const ticket = document.getElementById("ticket");
  ticket.innerHTML = ``;
  let ticketImpreso = document.createElement("table");
  ticketImpreso.className = "ticketImpreso";
  ticketImpreso.innerHTML = `<table> <tr>
      <th>Libro</th>
      <th>Cantidad</th>
      <th>Precio unitario</th>
      <th>Subtotal</th>
    </tr></table>`;
  mostrarItemEnTicket(ticketImpreso);
  ticket.appendChild(ticketImpreso);
  ingresoDeDatos();
}
function ingresoDeDatos() {
  let ingresoDatos = document.getElementById("ingresoDatos");
  ingresoDatos.innerHTML = ``;
  let ingreso = document.createElement("div");
  ingreso.className = "ingreso";
  ingreso.innerHTML = ` 
    <h1>Nombre</h1>
    <input type="text" id="nombre" value="Gabriel"/>
    <h1>Dirección</h1>
    <input type="text" id="direccion" value="Avenida Santa Fe 1300"/>
    <h1>Teléfono</h1>
    <input type="number" id= telefono value="1165224678"/>
    `;
  ingresoDatos.appendChild(ingreso);
  botonFinalizarCompra.style.display = "inline-block";
}

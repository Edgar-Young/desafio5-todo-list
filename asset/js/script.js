// Elementos del DOM
const input = document.querySelector("#nombreTarea");
const btnAgregar = document.querySelector("#agregar");
const tabla = document.querySelector("#listaTareas");
const totalTareas = document.querySelector("#totalTareas");
const tareasRealizadas = document.querySelector("#tareasRealizadas");

const tareas = [
  { id: 1, nombre: "Hacer ejercicio", estado: true },
  { id: 2, nombre: "Estudiar JavaScript", estado: true },
  { id: 3, nombre: "Leer un libro", estado: false },
];

function obtenerIdDisponible() {
  let id = 1;
  while (tareas.some((t) => t.id === id)) {
    id++;
  }
  return id;
}

// Agregar tarea
function agregarTarea() {
  const nombreTarea = input.value;
  if (nombreTarea) {
    const nuevaTarea = {
      id: obtenerIdDisponible(),
      nombre: nombreTarea,
      estado: false,
    };
    tareas.push(nuevaTarea);
    input.value = "";
    actualizarTabla();
  } else {
    alert("Debes ingresar una tarea");
    return;
  }
}

// Actualizar estatus
function toggleEstado(id) {
  const tarea = tareas.find((t) => t.id === id);
  tarea.estado = !tarea.estado;
  actualizarTabla();
}

// Eliminar tarea
function eliminarTarea(id) {
  const index = tareas.findIndex((t) => t.id === id);
  tareas.splice(index, 1);
  actualizarTabla();
}

// Actualizar tabla
function actualizarTabla() {
  tabla.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Tareas</th>
            <th>Estado</th>
            <th>Eliminar</th>
        </tr>
    `;

  tareas.forEach((tarea) => {
    tabla.innerHTML += `
            <tr>
                <td>${tarea.id}</td>
                <td>${tarea.nombre}</td>
                <td class="centrar"><input type="checkbox" ${
                  tarea.estado ? "checked" : ""
                }                   onchange="toggleEstado(${tarea.id})"></td>
                <td class="centrar"><button onclick="eliminarTarea(${
                  tarea.id
                })"><i class="fa-solid fa-trash-can rojo"></i></button></td>
            </tr>
        `;
  });

  totalTareas.textContent = tareas.length;
  tareasRealizadas.textContent = tareas.filter((t) => t.estado).length;
}

btnAgregar.addEventListener("click", agregarTarea);

actualizarTabla();

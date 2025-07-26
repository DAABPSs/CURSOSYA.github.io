document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("curso-form");
  const container = document.getElementById("cursos-container");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const url = document.getElementById("url").value;
    const inicio = document.getElementById("fecha-inicio").value;
    const fin = document.getElementById("fecha-fin").value;

    const curso = crearCurso(nombre, categoria, url, inicio, fin);
    container.appendChild(curso);
    form.reset();
  });

  function crearCurso(nombre, categoria, url, inicio, fin) {
    const card = document.createElement("div");
    card.className = "curso";

    const header = document.createElement("div");
    header.className = "curso-header";

    const nombreCurso = document.createElement("div");
    nombreCurso.className = "curso-nombre";
    nombreCurso.innerHTML = url ? `<a href="${url}" target="_blank">${nombre}</a>` : nombre;

    const expandirBtn = document.createElement("button");
    expandirBtn.textContent = "+";
    expandirBtn.title = "Mostrar detalles";

    header.appendChild(nombreCurso);
    header.appendChild(expandirBtn);
    card.appendChild(header);

    const detalles = document.createElement("div");
    detalles.style.display = "none";

    if (categoria) {
      const cat = document.createElement("div");
      cat.className = "curso-categoria";
      cat.textContent = `Categoría: ${categoria}`;
      detalles.appendChild(cat);
    }

    const fechas = document.createElement("div");
    fechas.className = "curso-fechas";
    fechas.textContent = `Del ${inicio || "?"} al ${fin || "?"}`;
    detalles.appendChild(fechas);

    const tareas = document.createElement("ul");
    tareas.className = "tareas";

    const progreso = document.createElement("div");
    progreso.className = "progreso";
    progreso.textContent = "Progreso: 0%";

    const agregarTarea = document.createElement("div");
    agregarTarea.className = "agregar-tarea";
    const inputTarea = document.createElement("input");
    inputTarea.type = "text";
    inputTarea.placeholder = "Nueva tarea...";
    const btnTarea = document.createElement("button");
    btnTarea.textContent = "+";

    agregarTarea.appendChild(inputTarea);
    agregarTarea.appendChild(btnTarea);

    btnTarea.addEventListener("click", () => {
      if (inputTarea.value.trim() === "") return;
      const li = document.createElement("li");
      li.className = "tarea";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const label = document.createElement("label");
      label.textContent = inputTarea.value;

      checkbox.addEventListener("change", actualizarProgreso);

      li.appendChild(checkbox);
      li.appendChild(label);
      tareas.appendChild(li);

      inputTarea.value = "";
      actualizarProgreso();
    });

    function actualizarProgreso() {
      const total = tareas.querySelectorAll("input[type='checkbox']").length;
      const completadas = tareas.querySelectorAll("input[type='checkbox']:checked").length;
      const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);
      progreso.textContent = `Progreso: ${porcentaje}%`;
    }

    detalles.appendChild(tareas);
    detalles.appendChild(agregarTarea);
    detalles.appendChild(progreso);

    expandirBtn.addEventListener("click", () => {
      const expanded = detalles.style.display === "block";
      detalles.style.display = expanded ? "none" : "block";
      expandirBtn.textContent = expanded ? "+" : "–";
      expandirBtn.title = expanded ? "Mostrar detalles" : "Ocultar detalles";
    });

    card.appendChild(detalles);
    return card;
  }
});
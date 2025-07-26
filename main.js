
document.addEventListener("DOMContentLoaded", mostrarCursos);

function mostrarCursos() {
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  const lista = document.getElementById("course-list");
  lista.innerHTML = "";

  cursos.forEach((curso, index) => {
    const cursoDiv = document.createElement("div");
    cursoDiv.className = "curso";

    const titulo = document.createElement("h3");
    titulo.textContent = curso.nombre;
    titulo.onclick = () => {
      tareasDiv.style.display = tareasDiv.style.display === "none" ? "block" : "none";
    };

    const tareasDiv = document.createElement("div");
    tareasDiv.className = "tareas";
    tareasDiv.innerHTML = `
      <p>Fecha de inicio: ${curso.inicio}</p>
      <p>Fecha de fin: ${curso.fin}</p>
      <p>Categoría: ${curso.categoria}</p>
      <ul>${curso.tareas.map(t => `<li>${t}</li>`).join("")}</ul>
    `;

    cursoDiv.appendChild(titulo);
    cursoDiv.appendChild(tareasDiv);
    lista.appendChild(cursoDiv);
  });
}

function agregarCurso() {
  const nombre = prompt("Nombre del curso:");
  const inicio = prompt("Fecha de inicio:");
  const fin = prompt("Fecha de fin:");
  const categoria = prompt("Categoría:");
  const tareas = prompt("Tareas (separadas por coma):").split(",");

  const nuevoCurso = { nombre, inicio, fin, categoria, tareas };
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  cursos.push(nuevoCurso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
  mostrarCursos();
}

function exportarCursos() {
  const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
  const blob = new Blob([JSON.stringify(cursos, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'mis_cursos.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function importarCursos(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const cursosImportados = JSON.parse(e.target.result);
      if (Array.isArray(cursosImportados)) {
        localStorage.setItem('cursos', JSON.stringify(cursosImportados));
        location.reload();
      } else {
        alert('El archivo no tiene el formato correcto.');
      }
    } catch (error) {
      alert('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
}

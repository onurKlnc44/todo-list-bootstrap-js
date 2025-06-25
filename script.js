const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearAllBtn = document.getElementById("clear-all");
const filterButtons = document.querySelectorAll(".filter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";


renderList();


form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return alert("Görev boş olamaz!");

  todos.push({ text, completed: false });
  saveAndRender();
  input.value = "";
});


function renderList() {
  list.innerHTML = "";
  const filtered = todos.filter(todo => {
    if (currentFilter === "done") return todo.completed;
    if (currentFilter === "undone") return !todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("form-check-input", "me-2");
    checkbox.addEventListener("change", () => {
      todo.completed = !todo.completed;
      saveAndRender();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveAndRender();
    });

    const leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center";
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}


function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList();
}


clearAllBtn.addEventListener("click", () => {
  if (confirm("Tüm görevleri silmek istiyor musun?")) {
    todos = [];
    saveAndRender();
  }
});


filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderList();
  });
});

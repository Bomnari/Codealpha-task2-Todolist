const form = document.querySelector('form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
let todos = JSON.parse(localStorage.getItem("todos") || "[]");

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  input.value = "";
  saveAndRender();
});

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderList();
}

function renderList() {
  list.innerHTML = "";
  todos.forEach((todo, i) => list.append(createItem(todo, i)));
}

function createItem(todo, i) {
  const id = `todo-${i}`;
  const li = document.createElement("li");
  li.className = "todo";
  li.innerHTML = `
    <input type="checkbox" id="${id}" ${todo.completed ? "checked" : ""}>
    <label class="custom-checkbox" for="${id}">
      <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
    </label>
    <label for="${id}" class="todo-text">${todo.text}</label>
    <button class="edit-button" title="Edit">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
      </svg>
    </button>
    <button class="delete-button" title="Delete">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
        <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
      </svg>
    </button>
  `;

  li.querySelector(".delete-button").onclick = () => {
    todos.splice(i, 1);
    saveAndRender();
  };

  li.querySelector(".edit-button").onclick = () => {
    const newText = prompt("Edit your task:", todo.text);
    if (newText !== null) {
      todos[i].text = newText.trim() || todo.text;
      saveAndRender();
    }
  };

  li.querySelector("input").onchange = e => {
    todos[i].completed = e.target.checked;
    saveAndRender();
  };

  return li;
}

renderList();

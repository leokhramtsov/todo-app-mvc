class View {
  constructor() {
    const app = this._getElement("#app");

    this.title = this._createElement("h1");
    this.title.innerText = "Todos Planner";

    this.form = this._createElement("form");

    this.todoInput = this._createElement("input");
    this.todoInput.type = "text";
    this.todoInput.name = "todo";
    this.todoInput.placeholder = "Enter Todo...";

    this.addButton = this._createElement("button");
    this.addButton.innerText = "Add";

    this.todoList = this._createElement("ul", "todo-list");

    this.form.append(this.todoInput, this.addButton);
    app.append(this.title, this.form, this.todoList);

    this._temporaryTodoText = "";
    this._initLocalListeners();
  }

  _createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) {
      element.classList.add(className);
    }

    return element;
  }

  _getElement(selector) {
    return document.querySelector(selector);
  }

  get _todoText() {
    return this.todoInput.value;
  }

  _resetInput() {
    this.todoInput.value = "";
  }

  _parseId(id) {
    return parseInt(id, 10);
  }

  displayTodos(todos) {
    this.todoList.innerHTML = "";

    if (todos.length === 0) {
      const p = this._createElement("p");
      p.innerText = "You have no todos";

      this.todoList.append(p);
    } else {
      todos.forEach(todo => {
        const li = this._createElement("li");
        li.id = todo.id;

        const checkbox = this._createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;

        const span = this._createElement("span");
        span.contentEditable = true;
        span.innerText = todo.text;

        if (todo.complete) {
          span.style.textDecoration = "line-through";
        }

        const deleteButton = this._createElement("button", "delete");
        deleteButton.innerText = "Delete";

        li.append(checkbox, span, deleteButton);
        this.todoList.append(li);
      });
    }
  }

  bindAddTodo(handler) {
    this.addButton.addEventListener("click", evt => {
      evt.preventDefault();

      const todoText = this._todoText;

      this._resetInput();
      handler(todoText);
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", ({ target }) => {
      if (target.className === "delete") {
        const todoId = this._parseId(target.parentNode.id);
        handler(todoId);
      }
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("click", ({ target }) => {
      if (target.type === "checkbox") {
        const todoId = this._parseId(target.parentNode.id);
        handler(todoId);
      }
    });
  }

  _initLocalListeners() {
    this.todoList.addEventListener("input", ({ target }) => {
      if (target.contentEditable) {
        this._temporaryTodoText = target.innerText;
      }
    });
  }

  bindEditTodo(handler) {
    this.todoList.addEventListener("focusout", ({ target }) => {
      if (target.contentEditable && this._temporaryTodoText) {
        const todoId = this._parseId(target.parentNode.id);
        handler(todoId, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }
}

export default View;

class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  addTodo(todoText) {
    this.todos.push({
      id: Date.now(),
      text: todoText,
      complete: false
    });

    this._commit(this.todos);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);

    this._commit(this.todos);
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );

    this._commit(this.todos);
  }

  editTodo(id, newText) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
  }

  bindDisplayTodos(handler) {
    this.displayTodos = handler;
  }

  _commit(todos) {
    this.displayTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

export default Model;

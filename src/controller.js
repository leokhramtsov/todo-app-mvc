class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAddTodo(this.handleAddTodo.bind(this));
    this.view.bindDeleteTodo(this.handleDeleteTodo.bind(this));
    this.view.bindToggleTodo(this.handleToggleTodo.bind(this));
    this.model.bindDisplayTodos(this.handleDispalyTodos.bind(this));
  }

  init() {
    this.handleDispalyTodos(this.model.todos);
  }

  handleDispalyTodos(todos) {
    this.view.displayTodos(todos);
  }

  handleAddTodo(todo) {
    this.model.addTodo(todo);
  }

  handleDeleteTodo(id) {
    this.model.deleteTodo(id);
  }

  handleToggleTodo(id) {
    this.model.toggleTodo(id);
  }

  handleEditTodo(id, newText) {
    this.model.editTodo(id, newText);
  }
}

export default Controller;

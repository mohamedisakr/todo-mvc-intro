export default class Model {
  constructor() {
    // The state of the model, an array of todo objects, prepopulated with some data
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false
    };
    this.todos.push(todo);
    // this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }

  editTodo(id, updateText) {
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? { id: todo.id, text: updateText, complete: todo.complete }
        : todo
    );
    // this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    // this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? { id: todo.id, text: todo.text, complete: !todo.complete }
        : todo
    );
    // this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }

  // the model does not know that the view should update, and does not
  // know what to do to make the view update, so the model should fire
  // back to the controller to let it know that something happened.
  // We already made the onTodoListChanged method on the controller to
  // deal with this, we just have to make the model aware of it. We'll
  // bind it to the model the same way we did with the handlers on the view
  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  _commit(todos) {
    this.onTodoListChanged(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

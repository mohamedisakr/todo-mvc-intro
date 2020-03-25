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
    this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }

  editTodo(id, updateText) {
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? { id: todo.id, text: updateText, complete: todo.complete }
        : todo
    );
    this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id
        ? { id: todo.id, text: todo.text, complete: !todo.complete }
        : todo
    );
    this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  _commit(todos) {
    this.onTodoListChanged(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

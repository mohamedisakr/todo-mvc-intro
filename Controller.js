export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Display initial todos
    this.onTodoListChanged(this.model.todos);

    // Call the handlers from the view, so bind the methods that are listening for the events to the view
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);
    this.view.bindEditTodo(this.handleEditTodo);

    this.model.bindTodoListChanged(this.onTodoListChanged);
  }

  // calls displayTodos every time a todo changes
  onTodoListChanged = todos => {
    this.view.displayTodos(todos);
  };

  // event handler for submitting a new todo
  handleAddTodo = todoText => {
    this.model.addTodo(todoText);
  };

  // event handler for editting an existing todo
  handleEditTodo = (id, todoText) => {
    this.model.editTodo(id, todoText);
  };

  // event handler for deleting an existing todo
  handleDeleteTodo = id => {
    this.model.deleteTodo(id);
  };

  // event handler for toggling an existing todo
  handleToggleTodo = id => {
    this.model.toggleTodo(id);
  };
}

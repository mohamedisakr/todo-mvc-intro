export default class View {
  constructor() {
    this.initView();
    this._temporaryTodoText = "";
    this._initLocalListeners();
  }

  displayTodos(todos) {
    // delete all nodes in the todo list
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
    if (todos.length === 0) {
      const paragraph = this.createElement("p");
      paragraph.textContent = "Nothing to do! Please add a task";
      this.todoList.append(paragraph);
    } else {
      // Create todo item nodes for each todo in state < checkbox, span, and delete >
      todos.forEach(todo => {
        const listItem = this.createElement("li");
        listItem.id = todo.id;
        // Each todo item will have a checkbox you can toggle
        const checkbox = this.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;
        // The todo item text will be in a contenteditable span
        const span = this.createElement("span");
        span.contentEditable = true;
        span.classList.add("editable");
        // If the todo is complete, it will have a strikethrough
        if (todo.complete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);

          // span.classList.add("complete");
        } else {
          span.textContent = todo.text;
        }
        // The todos will also have a delete button
        const deleteButton = this.createElement("button", "delete");
        deleteButton.textContent = "Delete";
        // Append checkbox, span, and delete to list item
        listItem.append(checkbox, span, deleteButton);
        // Append list item to unordered list
        this.todoList.append(listItem);
      });
    }
  }

  initView() {
    // 1.	The root element of the app - #root
    this.app = this.getElement("#root");

    // 2.	The title heading - h1
    this.title = this.createElement("h1");
    this.title.textContent = "Todos";

    // 3.	A form, input and submit button for adding a todo - form, input, button
    this.form = this.createElement("form");
    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Add todo";
    this.input.name = "todo";
    this.submitButton = this.createElement("button");
    this.submitButton.textContent = "Submit";

    // 4.	The todo list - ul
    this.todoList = this.createElement("ul", "todo-list");

    // Append the input and submit button to the form
    this.form.append(this.input, this.submitButton);
    this.app.append(this.title, this.form, this.todoList);
  }

  bindAddTodo(handler) {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", event => {
      if (event.target.classList.contains("delete")) {
        const id = parseInt(event.target.parentElement.id);
        handler(id);
      }
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", event => {
      if (event.target.type === "checkbox") {
        const id = parseInt(event.target.parentElement.id);
        handler(id);
      }
    });
  }

  bindEditTodo(handler) {
    this.todoList.addEventListener("focusout", event => {
      if (this._temporaryTodoText) {
        const id = parseInt(event.target.parentElement.id);
        handler(id, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  // Update temporary state
  _initLocalListeners() {
    this.todoList.addEventListener("input", event => {
      if (event.target.classList.contains("editable")) {
        this._temporaryTodoText = event.target.innerText;
      }
    });
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }
}

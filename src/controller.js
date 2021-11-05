class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    // Display initial todos
    this.onTodoListChanged(model.todos)

    this.view.bindAddTodo(this.handleAddTodo)
    this.view.bindDeleteTodo(this.handleDeleteTodo)
    this.view.bindToggleTodo(this.handleToggleTodo)

    this.model.bindTodoListChanged(this.onTodoListChanged)
  }

  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText)
  }

  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id)
  }

  handleToggleTodo = (id) => {
    this.model.toggleTodo(id)
  }

  onTodoListChanged = (todos) => {
    this.view.displayTodos(todos)
  }
}

export default Controller;
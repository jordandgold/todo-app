class Model {
  constructor() {
    this.todos = [
        {id: 1, text: 'Run a marathon', complete: false},
        {id: 2, text: 'Plant a garden', complete: false},
    ]
  }
  
  addTodo(text) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text,
      complete: false,
    }

    this.todos.push(todo)

    this.onTodoListChanged(this.todos)
  }

  deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)

      this.onTodoListChanged(this.todos)
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? {id: todo.id, text: todo.text, complete: !todo.complete} : todo,
    )

    this.onTodoListChanged(this.todos)
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback
  }
}

export default Model;
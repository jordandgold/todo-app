import './styles.scss'

class View {
    constructor() {
        // The root element
        this.app = this.getElement('#root')

        // The title of the app
        this.title = this.createElement('h1')
        this.title.textContent = 'To-do List'

        // The form, with a [type="text"] input, and a submit button
        this.form = this.createElement('form')

        this.input = this.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = 'Add todo'
        this.input.name = 'todo'

        this.submitButton = this.createElement('button')
        this.submitButton.textContent = 'Submit'

        // The visual representation of the todo list
        this.todoList = this.createElement('ul', 'todo-list')

        // Append the input and submit button to the form
        this.form.append(this.input, this.submitButton)

        // Append the title, form, and todo list to the app
        this.app.append(this.title, this.form, this.todoList)
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    get _todoText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = ''
    }

    displayTodos(todos) {
        // Delete all nodes
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }
        
        // Show default message
        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing to do! Add a task?'
            this.todoList.append(p)
        } else {
            // Create todo item nodes for each todo in state
            todos.forEach(todo => {
                const li = this.createElement('li')
                li.id = todo.id

                // Each todo item will have a checkbox you can toggle
                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete

                // The todo item text will be in a contenteditable span
                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')

                if (todo.complete) {
                    span.classList.add('is-complete')
                }

                // If the todo is complete, it will have a strikethrough
                if (todo.complete) {
                const strike = this.createElement('s')
                strike.textContent = todo.text
                span.append(strike)
                } else {
                // Otherwise just display the text
                span.textContent = todo.text
                }

                // The todos will also have a delete button
                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                deleteButton.classList.add('button--danger')
                li.append(checkbox, span, deleteButton)

                // Append nodes to the todo list
                this.todoList.append(li)
            })
        }
    }

    bindAddTodo(handler) {
        this.form.addEventListener('submit', event => {
          event.preventDefault()
      
          if (this._todoText) {
            handler(this._todoText)
            this._resetInput()
          }
        })
    }

    bindToggleTodo(handler) {
        this.todoList.addEventListener('click', event => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id)
        
                handler(id)
            }
        })
    }

    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', event => {
          if (event.target.className === 'delete') {
            const id = parseInt(event.target.parentElement.id)
      
            handler(id)
          }
        })
    }
}

export default View;
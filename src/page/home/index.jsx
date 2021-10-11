import { useState, useCallback } from 'react';
import { useImmer } from "use-immer";
import { ENTER_KEY } from '../../constants';
import TodoItem from '../../components/TodoItem';

function Home() {
    const [inputVal, setInputVal] = useState('')
    const clearInput = () => {
        setInputVal('')
    }
    const handleInputChange = (e) => {
        const newVal = e.target.value
        setInputVal(newVal)
    }

    const [todos, setTodos] = useImmer([])
    // const handleTodoItemToggle = (id) => {
    //     const i = todos.findIndex(todo => todo.id === id)
    //     todos[i].completed = !todos[i].completed
    //     setTodos([...todos])
    // }

    const handleTodoItemToggle = useCallback(
        (id) => {
            setTodos(todos => {
                const todo = todos.find(todo => todo.id === id)
                todo.completed = !todo.completed
            })
        },
        []
    );

    const handleEnter = (e) => {
        if (e.keyCode === ENTER_KEY) {
            const newTodo = {
                value: inputVal,
                id: + new Date(),
                completed: false
            }
            const newTodos = [...todos, newTodo]
            setTodos(newTodos)
            clearInput()
        }
    }

    const todoItems = todos.map(todo => {
        return (
            <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.value}
                completed={todo.completed}
                onToggle={handleTodoItemToggle}
            >
            </TodoItem>
        )
    })

    return (
        <>
            <header>
                <h1>todos</h1>
                <input
                    type="text"
                    value={inputVal}
                    onChange={handleInputChange}
                    onKeyUp={handleEnter}
                />
            </header>
            <section className="main">
               <ul className="todo-list">
                   { todoItems }
               </ul>
            </section>
        </>
    )
}

export default Home
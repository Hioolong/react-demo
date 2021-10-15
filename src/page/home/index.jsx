import { useState, useCallback } from 'react';
import { useImmer } from "use-immer";
import { ENTER_KEY, filterListStatus } from '../../constants';
import TodoItem from '../../components/TodoItem';
import Footer from '../../components/footer'

function Home() {
    const [inputVal, setInputVal] = useState('');
    const [filter, setFilter] = useState(0);
    const [todos, setTodos] = useImmer([]);

    // handle user input
    const clearInput = () => {
        setInputVal('')
    };
    const handleInputChange = (e) => {
        const newVal = e.target.value
        setInputVal(newVal)
    };
    const handleEnter = (e) => {
        if (!inputVal) return;
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
    };

    const shownTodos = todos.filter((todo) => {
        if (filter === filterListStatus.Active) {
            return !todo.completed
        }
        if (filter === filterListStatus.Completed) {
            return todo.completed
        }
        return true
    });
    const handleTodoItemToggle = useCallback(
        (id) => {
            setTodos(todos => {
                const todo = todos.find(todo => todo.id === id);
                todo.completed = !todo.completed;
            })
        },
        []
    );

    //handle filter list
    const handleFilterChange = (e) => {
        const val = + e.target.dataset.value
        setFilter(val)
    };

    // handle user delete todo item
    const handleTodoItemDelete = (id) => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
    };

    // completed items clear
    const clearCompletedVisible = todos.length > 0 && todos.findIndex((todo) => todo.completed) !== -1;
    const handleClearCompleted = () => {
        setTodos((todos) => todos.filter(item => !item.completed));
        
    };

    return (
        <>
            <header>
                <h1>todos</h1>
            </header>
            <section className="main">
                <input
                    className="input"
                    type="text"
                    placeholder="what needs to be done"
                    value={inputVal}
                    onChange={handleInputChange}
                    onKeyUp={handleEnter}
                />
               <ul className="todo-list">
                   { 
                        shownTodos.map((todo) => 
                            <TodoItem
                                key={todo.id}
                                id={todo.id}
                                text={todo.value}
                                completed={todo.completed}
                                onToggle={handleTodoItemToggle}
                                onDelete={handleTodoItemDelete}
                            />
                        )
                    }
               </ul>
            </section>
            <Footer
                leftItemsNum={todos.filter(item => !item.completed).length}
                filter={filter}
                clearCompletedVisible={clearCompletedVisible}
                onFilterChange={handleFilterChange}
                onClearCompleted={handleClearCompleted}
            />
        </>
    )
}

export default Home
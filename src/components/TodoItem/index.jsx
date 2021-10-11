
const PREFIX = 'todo-item'

const TodoItem = ({ id, text, completed, onToggle }) => {
    return (
        <>
            <li>
                <input
                    type="checkbox" 
                    checked={completed}
                    onChange={(e) => onToggle(id)}
                />
                <label>
                    { text }
                </label>
                <button className={`${PREFIX}-delete`}></button>
            </li>
        </>
    )
}

export default TodoItem
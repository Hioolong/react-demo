
const PREFIX = 'todo-item'

const TodoItem = ({ id, text, completed, onToggle, onDelete }) => {

    const remove = () => {
        return onDelete(id)
    };

    return (
        <>
            <li className={PREFIX}>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => onToggle(id)}
                />
                <label className={completed ? `${PREFIX}-completed` : undefined}>
                    { text }
                </label>
                <button
                    className={`${PREFIX}-delete`}
                    onClick={remove}
                />
            </li>
        </>
    )
}

export default TodoItem
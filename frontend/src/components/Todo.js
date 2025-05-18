import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";

import { update_todo } from "../api/endpoints";


const Todo = ({id, todo_name, deleteTodo, completed}) =>{
    const [isHovered, setIsHovered] =useState(false);
    const [isChecked, setChecked] = useState(completed);

    const handleDelete = async () => {
        await deleteTodo(id);
    }

    const handleComplete = async () => {
        update_todo(id, !isChecked);
        setChecked(!isChecked)
    }

    return (
        <div className="todo">
            <div className="todo-container">
                <input type='checkbox' checked={isChecked} onClick={handleComplete}/>
                <h3>{todo_name}</h3>
                {
                isHovered ? 
                <FaWindowClose size='20px' onClick={handleDelete} onMouseLeave={() => setIsHovered(false)} /> :
                <FaRegWindowClose size='20px' onClick={handleDelete} onMouseEnter={() => setIsHovered(true)} />
                }                
            </div>
       </div>
       )
    
}

export default Todo;
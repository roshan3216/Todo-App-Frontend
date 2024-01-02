import React from 'react';
import {BiEdit} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai';


function Todo(props) {
    const todo = props.todo;

    const updateTodo = (e) =>{
        props.setId(props.id);
        props.setTodo(props.todo);
        props.setIsUpdating(true);
        console.log(props.id, '[props id]-[updateTodo]');
    }
    
    return (
        <div className='todo'>
            <div className='text' > {todo} </div>
            <div className='icons'>
                <BiEdit className='icon' onClick={updateTodo} />
                <AiFillDelete className='icon' onClick={(e) => props.deleteTodos(props.id)} />
            </div>
        </div>
    )
}

export default Todo;
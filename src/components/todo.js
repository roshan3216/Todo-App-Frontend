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

    const deleteTodo = async(e) =>{
        props.setId(props.id);
        console.log(props.id, '[props.id]-[deleteTodo]');
        try {
            const resp = await deleteTodo(props.id);
            props.setCallAPI(5);
            console.log(resp.data,'[resp]-[deleteTodo]');
        } catch (err) {
            console.error(err,'[error in deleting todo]');
        }

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
import { useEffect, useState } from "react";
import Todo from "./components/todo";
import {  createTodo, deleteTodo, getAllTodos, searchTodo, updateTodo } from "./api/api";

function App () {
    const [todos, setTodos] = useState([]);
    const [todo , setTodo ] = useState('');
    const [callAPI, setCallAPI] = useState(1);
    const [isUpdating, setIsUpdating] = useState(false);
    const [id , setId ] = useState(-1);
    const [search, setSearch ] = useState('');

    const handleChange = (e) =>{
        setTodo(e.target.value);
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            console.log(isUpdating,'[isUpdating]');
            if(isUpdating){
                const resp = await updateTodo(id, todo);
                console.log(resp.data,'[resp]-[update]');
                
                setIsUpdating(false);
            }else{
                console.log(todos,'[todos]');
                console.log(todo,'[todo]');
                const resp = await createTodo(todo);
                console.log(resp.data,'[resp]');
                
            }
            setCallAPI(2);
            setTodo('');
        } catch (err) {
            console.error(err,'[error in submitting form]');
        }
    }

    const handleSearchChange = (e) =>{
        setSearch(e.target.value);
    }

    const handleSearchSubmit = async(e) =>{
        e.preventDefault();

        try {
            const response = await searchTodo(search);
            console.log(search, response.data, '[search]-[resposne.data]');
            setTodos(response.data);
        } catch (err) {
            console.error(err, '[error getting search repsonse]');
        }
    }

    const deleteTodos = async (id) =>{
        const resp = await deleteTodo(id);
        console.log(resp.data," id = ",id,'[resp]-[deleteTodo]');
        setCallAPI(6);
    }



    useEffect(() =>{
        (async () =>{
            try {
                const resp = await getAllTodos();
                setTodos(resp.data);
                
            } catch (err) {
                console.error(err,'[error in getting todos');

            }
        })();
    },[callAPI]);



    return (
        <div className="App">
            <div className ='container'>
                
                <h1>ToDo App</h1>
                <div className = 'top'>
                    <form onSubmit={handleSubmit} >
                        <input 
                            type='text' 
                            placeholder = 'Add todos' 
                            value = {todo}
                            onChange={handleChange}
                            style={{textAlign: 'center'}}
                        />
                        <button style={{marginLeft: '10px'}} type="submit" className='add' >
                            { isUpdating ? "Update" : "Add" }
                        </button>
                    </form>


                </div>

                <div className="top">
                    <form onSubmit={handleSearchSubmit} >
                        <input style={{textAlign: 'center'}} type="text" placeholder="search" value={search} onChange={handleSearchChange} />
                        <button style={{marginLeft: '10px', textAlign: 'center'}} type="submit" className="add">Search</button>
                    </form>
                </div>

                <div className='list' >
                    {
                        todos.map((todo) =>{
                            return <Todo key ={todo.id} id ={todo.id} todo ={todo.todo} setTodo ={setTodo} setId = {setId} setIsUpdating = {setIsUpdating} setCallAPI = {setCallAPI} deleteTodos = {deleteTodos}/>
                        })
                    }

                    {/* <Todo text='hi' /> */}

                </div>
            </div>

        </div>
    )

}

export default App;
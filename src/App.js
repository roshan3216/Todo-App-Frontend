import { useEffect, useState } from "react";
import Todo from "./components/todo";
import {  createTodo, deleteTodo, getAllTodos, searchTodo, updateTodo } from "./api/api";

function App () {
    const [toDos, setToDos] = useState([]);
    const [toDo , setToDo ] = useState('');
    const [callAPI, setCallAPI] = useState(1);
    const [isUpdating, setIsUpdating] = useState(false);
    const [id , setId ] = useState(-1);
    const [search, setSearch ] = useState('');

    const handleChange = (e) =>{
        setToDo(e.target.value);
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            console.log(isUpdating,'[isUpdating]');
            if(isUpdating){
                const resp = await updateTodo(id, toDo);
                console.log(resp.data,'[resp]-[update]');
                
                setIsUpdating(false);
                // setCallAPI(2);
            }else{
                console.log(toDos,'[todos]');
                console.log(toDo,'[todo]');
                const resp = await createTodo(toDo);
                console.log(resp.data,'[resp]');
                // setCallAPI(3);
                
            }
            setCallAPI(prev => prev +1);
            setToDo('');
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
            setToDos(response.data);
        } catch (err) {
            console.error(err, '[error getting search repsonse]');
        }
    }

    const deleteTodos = async (id) =>{
        const resp = await deleteTodo(id);
        console.log(resp.data," id = ",id,'[resp]-[deleteTodo]');
        setCallAPI(prev => prev +1);
    }



    useEffect(() =>{
        console.log('callAPI changed:', callAPI);
        (async () =>{
            try {
                const resp = await getAllTodos();
                setToDos(resp.data);
                
            } catch (err) {
                console.error(err,'[error in getting todos');

            }
        })();
    },[callAPI,search]);



    return (
        <div className="App">
            <div className ='container'>
                
                <h1>ToDo App</h1>
                <div className = 'top'>
                    <form onSubmit={handleSubmit} >
                        <input 
                            type='text' 
                            placeholder = 'Add todos' 
                            value = {toDo}
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
                        Array.isArray(toDos) && 
                        toDos.map((todo) =>{
                            return <Todo key ={todo.id} id ={todo.id} todo ={todo.todo} setTodo ={setToDo} setId = {setId} setIsUpdating = {setIsUpdating} deleteTodos = {deleteTodos}/>
                        })
                    }

                    {/* <Todo text='hi' /> */}

                </div>
            </div>

        </div>
    )

}

export default App;
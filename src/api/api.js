import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-app-backend-hkgx.onrender.com/todo'
});

export const getAllTodos = (setTodo) =>{
    return api.get('/');
}

export const createTodo = (todo) =>{
    return api.post('/',{todo});
}

export const updateTodo = (id, todo) =>{
    return api.put('/',{id, todo});
}

export const deleteTodo = (id) =>{
    return api.delete('/',{data : {id}});
}

export const searchTodo = (todo) =>{
    return api.post('/search',{todo});
}
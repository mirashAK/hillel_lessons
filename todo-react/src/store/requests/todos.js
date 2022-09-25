const BASE_URL = 'http://localhost:3011';

const fetchTodos = (filter = {})=>{
    let request = `${BASE_URL}/todos`;
    if (Object.keys(filter)>0) {
        const filters = Object.keys(filter).map((key)=>encodeURI(`${key}=${filter[key]}`))
        request += `?${filters.join('&')}`
    }
    return fetch(request)
        .then(res => res.json())
        .then(res => res)
        .catch(err => err)
}

const fetchTodo = (id)=>{
    let request = `${BASE_URL}/todos/${encodeURI(id)}`;
    return fetch(request)
        .then(res => res.json())
        .then(res => res)
        .catch(err => err)
}

const putTodo = (todo)=>{
    let request = `${BASE_URL}/todos/${encodeURI(todo.id)}`;
    return fetch(request, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                id: todo.id,
                name: todo.name,
                description: todo.description,
                isCompleted: todo.isCompleted  
            })
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err)
}

export {
    fetchTodos,
    fetchTodo,
    putTodo
}

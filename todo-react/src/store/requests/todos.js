const BASE_URL = 'http://localhost:3011';

const fetchTodos = (filter = {})=>{
    let request = `${BASE_URL}/todos`;
    if (Object.keys(filter)>0) {
        const filters = Object.keys(filter).map((key)=>encodeURI(`${key}=${filter[key]}`))
        request += `?${filters.join('&')}`
    }
    return fetch(request)
        .then(res => res.json())
        .then(res => {
            console.log('res', res);
            return res;
        })
        .catch(err => err)
}

const fetchTodo = (id)=>{
    let request = `${BASE_URL}/todos/${encodeURI(id)}`;
    return fetch(request)
        .then(res => res.json())
        .then(res => res)
        .catch(err => err)
}

export {
    fetchTodos,
    fetchTodo,
}

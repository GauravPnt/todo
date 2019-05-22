import axios from 'axios'

// ******** USER FUNCTIONS ********

export const register = newUser => {
    return axios
        .post('users/register', {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        })
        .then(res => {
            console.log('Registered!')
        })
}

export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

// ******** TODO FUNCTIONALITY ********

export const createTodo = todo => {
    return axios
        .post('/users/add', {
            text: todo.text,
            priority: todo.priority,
            userId: todo.senderID
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const viewTodo = _id => {
    return axios
        .post('/users/canView', {
            _id: _id
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const editTodo = _id => {
    return axios
        .post('/users/canEdit', {
            _id: _id
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteTodo = _id => {
    return axios
        .post('/users/delete', {
            todoid: _id
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const grantView = data => {
    return axios
        .post('/users/grantView', {
            id: data.id,
            email: data.email
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}


export const grantEdit = data => {
    return axios
        .post('/users/grantEdit', {
            id: data.id,
            email: data.email
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const edit = data => {
    return axios
        .post('/users/edit', {
            id: data.id,
            text: data.text,
            priority: data.priority
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

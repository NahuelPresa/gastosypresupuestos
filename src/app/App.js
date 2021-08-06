import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            date: '',
            tasks: [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e) {
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Task Updated' });
                    this.setState({ title: '', description: '', date: '', _id: '' });
                    this.fetchTasks();

                });
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.error(data)
                    M.toast({ html: 'Save' });
                    this.setState({ title: '', description: '', date: '' });
                    this.fetchTasks();

                })
                .catch(error => console.log(err));
        }

        e.preventDefault();
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });
                console.log(this.state.tasks);
            });
    }

    deleteTask(id) {
        if (confirm('Are you sure you want delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task Delete' });
                    this.fetchTasks();
                });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title: data.title,
                    description: data.description,
                    data: data.data,
                    _id: data._id
                })
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/* NAVEGATION */}
                <nav className="light-blue darken-4">

                    <div className="container">
                        <a className="brand-logo" href="/">GASTOS Y PRESUPUESTOS</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange}
                                                    type="text" placeholder="Concepto" value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="description" onChange={this.handleChange}
                                                    type="number" placeholder="Monto" value={this.state.description} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="date" onChange={this.handleChange}
                                                    type="date" placeholder="Fecha" value={this.state.date} />
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>

                                    </form>
                                </div>

                            </div>

                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Concepto</th>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.tasks.map (task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>{task.date}</td>
                                                    <td>
                                                        <button
                                                            className="btn light-blue darken-4"
                                                            onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>

                                                        </button>
                                                        <button onClick={() => this.editTask(task._id)}
                                                            className="btn light-blue darken-4" style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>



            </div>
        )};
}

export default App;
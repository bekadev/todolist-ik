import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Components/TodoLists/TodoList';

export type filterType = 'all' | 'active' | 'completed'
function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Bem", isDone: true },
    ])

    let [filter, setFilter] = useState<filterType>('all')
    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(e => !e.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(e => e.isDone)
    }
    const changeFilter = (value: filterType) => {
        setFilter(value)
    }

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(e => e.id != id)
        setTasks(filteredTasks)
    }


    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

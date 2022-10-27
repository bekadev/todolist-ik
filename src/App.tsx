import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Components/TodoLists/TodoList';
import {v1} from 'uuid';

export type filterType = 'all' | 'active' | 'completed'
function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Bem", isDone: true },
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

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(e => e.id != id)
        setTasks(filteredTasks)
    }

    const addTask = () => {
        let task = { id: v1(), title: "Tilda", isDone: true }
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;

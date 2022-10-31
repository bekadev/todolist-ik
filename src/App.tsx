import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, TodoList} from './Components/TodoLists/TodoList';
import {v1} from 'uuid';

export type filterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: filterType
}
function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Bem", isDone: true },
    ])

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )


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

    const addTask = (title: string) => {
        let task = { id: v1(), title: title, isDone: true }
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id)
        if(task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            {
                todolists.map((tl)=>{
                    return (
                        <TodoList
                            key={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;

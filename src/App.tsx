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

    // let [tasks, setTasks] = useState([
    //     { id: v1(), title: "HTML&CSS", isDone: true },
    //     { id: v1(), title: "JS", isDone: true },
    //     { id: v1(), title: "ReactJS", isDone: false },
    //     { id: v1(), title: "Bem", isDone: true },
    // ])

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })




    const changeFilter = (value: filterType,todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const removeTask = (id: string, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(task => task.id !==id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistID: string) => {
        let task = { id: v1(), title: title, isDone: true }
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(tasks => tasks.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">
            {
                todolists.map((tl)=>{
                    let allToDoListTasks = tasks[tl.id]
                    let tasksForTodolist = allToDoListTasks

                    if (tl.filter === 'active') {
                        tasksForTodolist = allToDoListTasks.filter(e => !e.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = allToDoListTasks.filter(e => e.isDone)
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            title={tl.title}
                            id={tl.id}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;

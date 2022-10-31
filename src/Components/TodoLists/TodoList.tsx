import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {filterType} from '../../App';

export type TodoListPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id:string, todolistID: string) => void
    changeFilter: (value: filterType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
    id: string
    filter: filterType
    removeTodoList: (id: string) => void
}
export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const onClickHandlerAll = () => {
        props.changeFilter('all',props.id)
    }
    const onClickHandlerActive = () => {
        props.changeFilter('active',props.id)
    }
    const onClickHandlerCompleted = () => {
        props.changeFilter('completed',props.id)
    }
    const onClickHandlerAddTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(),props.id)
            setTitle('')
        }
    }
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key == 'Enter') {
            onClickHandlerAddTask()
        }
    }
    const onClickHandlerRemoveTodoList = () => {
        props.removeTodoList(props.id)
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={onClickHandlerRemoveTodoList}>x</button>
            </h3>
            <div>
                <input
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={title}/>
                <button onClick={onClickHandlerAddTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((element)=>{
                    const onClickHandler = () => {
                        props.removeTask(element.id,props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(element.id, newIsDoneValue,props.id)
                    }
                    return (
                        <li key={element.id}>
                            <input type="checkbox" checked={element.isDone} onChange={onChangeHandler}/>
                            <span>{element.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onClickHandlerAll}>All</button>
                <button onClick={onClickHandlerActive}>Active</button>
                <button onClick={onClickHandlerCompleted}>Completed</button>
            </div>
        </div>
    );
};
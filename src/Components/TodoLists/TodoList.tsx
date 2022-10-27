import React from 'react';
import {filterType} from '../../App';

export type TodoListPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id:number) => void
    changeFilter: (value: filterType) => void

}
export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const onClickHandlerAll = () => {
        props.changeFilter('all')
    }
    const onClickHandlerActive = () => {
        props.changeFilter('active')
    }
    const onClickHandlerCompleted = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((element)=>{
                    const onClickHandler = () => {
                        props.removeTask(element.id)
                    }
                    return (
                        <li key={element.id}>
                            <input type="checkbox" checked={element.isDone}/>
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
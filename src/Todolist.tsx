import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodoList: (todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoList: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title);
    }

    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)
    //
    // const addTask = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(title.trim(), props.id);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError(null);
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === 'Enter') {
    //         addTask();
    //     }
    // }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);


    return <div>
        <h3>
            <EditableSpan value={props.title} changeValue={changeTodoListTitle} />

            <button onClick={() => {props.removeTodoList(props.id)}}>X</button></h3>
        <AddItemForm addItem={addTask} />
     {/*   <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>

                               <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                        {/*<span>{t.title}</span>*/}
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}

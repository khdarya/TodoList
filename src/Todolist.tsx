import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";


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

    // let todo = useSelector<AppRootStateType, TodoListType |  undefined>(
    //     state => state.todolists.find(todo => {
    //         return todo && todo.id === props.id
    //     }))
    //
    // let tasksTodo = useSelector<AppRootStateType, Array<TaskType>>(state => todo ? state.tasks[todo.id] : [])
    // let dispatch = useDispatch()

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }



    // function addTask(title: string, todolistId: string) {
    //     dispatch(addTaskAC(title, todolistId));
    // }

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
            <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>

            {/*<button onClick={() => {props.removeTodoList(props.id)}}>X</button>*/}

            <IconButton onClick={() => {
                props.removeTodoList(props.id)
            }}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        {/*   <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>*/}
        <ul style={{listStyle: "none", paddingLeft: "0 "}}>
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
                        <Checkbox
                            color={"primary"}
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />
                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*       checked={t.isDone}/>*/}

                        <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                        {/*<span>{t.title}</span>*/}
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton>
                            <Delete onClick={onClickHandler}/>
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>
            <Button
                color={props.filter === 'all' ? "secondary" : "primary"}
                variant={props.filter === 'all' ? "contained" : "outlined"}
               // className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All</Button>
            <Button
                color={props.filter === 'active' ? "secondary" : "primary"}
                variant={props.filter === 'active' ? "contained" : "outlined"}
              //  className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</Button>
            <Button
                color={props.filter === 'completed' ? "secondary" : "primary"}
                variant={props.filter === 'completed' ? "contained" : "outlined"}
              //  className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}

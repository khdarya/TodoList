import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";


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

export const TodoList = React.memo((props: PropsType) => {

    // let todo = useSelector<AppRootStateType, TodoListType |  undefined>(
    //     state => state.todolists.find(todo => {
    //         return todo && todo.id === props.id
    //     }))
    //
    // let tasksTodo = useSelector<AppRootStateType, Array<TaskType>>(state => todo ? state.tasks[todo.id] : [])
    // let dispatch = useDispatch()
    //
    // function addTask(title: string) {
    //     dispatch(addTaskAC(title, todo ? todo.id: ''));
    // }


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.id, props.addTask]);                         //11

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id);
    }, [props.id, props.removeTodoList]);

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title);
    }, [props.id, props.changeTodoListTitle]);

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

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id, props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id, props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id, props.changeFilter]);


    let allTodolistTasks = props.tasks;

    if (props.filter === "active") {
        allTodolistTasks = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        allTodolistTasks = props.tasks.filter(t => t.isDone === true);
    }

    const onClickHandler = useCallback((taskId: string) => props.removeTask(taskId, props.id), []);
    const onChangeHandler = useCallback((taskId: string, newValue: boolean) => {
        props.changeTaskStatus(taskId, newValue, props.id);
    }, []);
    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        props.changeTaskTitle(title, taskId, props.id)
    }, []);

    return <div>
        <h3>
            <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>

            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul style={{listStyle: "none", paddingLeft: "0 "}}>
            {

                allTodolistTasks.map(t => {

                    return <Task
                        key={t.id}
                        task={t}
                        onClickHandler={onClickHandler}
                        onChangeHandler={onChangeHandler}
                        changeTaskTitle={changeTaskTitle}
                    />
                })
            }
        </ul>
        <div>
            <Button
                color={props.filter === 'all' ? "secondary" : "primary"}
                variant={props.filter === 'all' ? "contained" : "outlined"}
                onClick={onAllClickHandler}>All</Button>
            <Button
                color={props.filter === 'active' ? "secondary" : "primary"}
                variant={props.filter === 'active' ? "contained" : "outlined"}
                onClick={onActiveClickHandler}>Active</Button>
            <Button
                color={props.filter === 'completed' ? "secondary" : "primary"}
                variant={props.filter === 'completed' ? "contained" : "outlined"}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
})

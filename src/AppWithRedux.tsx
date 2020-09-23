import React, {useReducer, useState} from 'react';
//import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterActionType, ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    let dispatch = useDispatch()


    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatch(ChangeTodoListFilterActionType(value, todoListID))
    }

    function removeTask(taskId: string, todoListID: string) {
        const action = removeTaskAC(taskId, todoListID)
        dispatch(action);
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID));
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatch(action);
        dispatch(action)
    }

    function removeTodoList(todoListID: string) {
        const action = RemoveTodoListAC(todoListID)
        dispatch(action);
        dispatch(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListID));
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskId, title, todoListID));
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatch(ChangeTodoListTitleAC(todoListID, newTitle))
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true);
                            }
                            return (
                                <Grid key={tl.id} item>
                                    <Paper style={{padding: "20px"}} elevation={3}>
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTodoList={removeTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

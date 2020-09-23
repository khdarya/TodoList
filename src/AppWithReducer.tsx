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

function AppWithReducer() {

    let todoListID1 = v1();
    let todoListID2 = v1();


    let [todoLists, dispatchTodoList] = useReducer(todoListReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "active"},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Apple", isDone: true},
            {id: v1(), title: "Lemon", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Coffee", isDone: false},
            {id: v1(), title: "Tea", isDone: false},
        ]
    })


    function changeFilter( value: FilterValuesType, todoListID: string) {
            dispatchTodoList(ChangeTodoListFilterActionType( value, todoListID))
    }

    function removeTask(taskId: string, todoListID: string) {
        const action = removeTaskAC(taskId, todoListID)
        dispatchToTasks(action);
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID));
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatchTodoList(action);
        dispatchToTasks(action)
    }

    function removeTodoList(todoListID: string) {
        // let newTodoLists = todoLists.filter(tl => tl.id !== todoListID);
        // setTodoLists(newTodoLists);
        // delete tasks[todoListID];
        const action = RemoveTodoListAC(todoListID)
        dispatchTodoList(action);
        dispatchToTasks(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListID));
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
            dispatchToTasks(changeTaskTitleAC(taskId, title, todoListID));
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatchTodoList(ChangeTodoListTitleAC(todoListID, newTitle))
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

export default AppWithReducer;

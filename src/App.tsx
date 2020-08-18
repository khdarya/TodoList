import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string] : Array<TaskType>
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "active"},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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


    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if(todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTask(taskId: string, todoListID: string) {
        let todoList = tasks[todoListID];
        tasks[todoListID] = todoList.filter(t => t.id !== taskId)
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoList = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoList]
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        let todoList = tasks[todoListID];
        let task = todoList.find(t => t.id === taskId);
        if(task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function removeTodoList(todoListID: string){
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListID);
        setTodoLists(newTodoLists);
        delete tasks[todoListID];
        setTasks({...tasks});
    }

    return (
        <div className="App">
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
                        />
                    )
                })
            }
        </div>
    );
}

export default App;

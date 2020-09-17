import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, ChangeTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

// type ActionType = {
//     type: string,
//     [key: string]: any
// }

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType

    | AddTodolistActionType
    | RemoveTodolistActionType;


export const tasksReducer = (state: TaskStateType, action: ActionType) => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId];
            copyState[action.todolistId] = todolistTasks.filter(t => t.id != action.taskId);

            return state
        }
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: false};
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId];
            todolistTasks = [task, ...todolistTasks]

            return {...copyState, [action.todolistId]: todolistTasks}
        }
        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId]
                .map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                });
            return {...copyState, [action.todolistId]: todolistTasks}
        }

//2nd option
        // return  {...state, [action.todolistId]: state[action.todolistId]
        //         .map(task => {
        //             if (task.id !== action.taskId) {
        //                 return task
        //             } else {
        //                 return {...task, isDone: action.isDone}
        //             }
        //         })}


        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId]
                .map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                });
            return {...copyState, [action.todolistId]: todolistTasks}
        }


        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }


        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId: todoListID}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}



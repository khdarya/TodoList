import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

// type ActionType = {
//     type: string,
//     [key: string]: any
// }

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}
export type ChangeTodolistActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType
    id: string
}

let initialState: Array<TodoListType> = []

//export type InitialStateType = typeof initialState


type ActionType = ChangeTodolistFilterActionType | ChangeTodolistActionType |
    AddTodolistActionType | RemoveTodolistActionType;


export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: action.todolistId,
                filter: "all",
                title: action.title
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
                return [...state];
            }
            // return state;
        default:
            return state
           // throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todoListID}
}

export const AddTodoListAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todoListID}
}

export const ChangeTodoListFilterActionType = (filter: FilterValuesType, todoListID: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter: filter}
}
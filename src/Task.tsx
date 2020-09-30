import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";


type TaskPropsType = {
    task: TaskType
    onChangeHandler: (taskId: string, newValue: boolean) => void
    onClickHandler: (taskId: string) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {task, onChangeHandler, onClickHandler, changeTaskTitle} = props

    const onClickHandlerDelete = () => onClickHandler(task.id)
    const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(task.id, e.currentTarget.checked)
    }
    const onChangeHandlerTitle = (newValue: string) => {
        changeTaskTitle(task.id, newValue)
    }


    return (
    <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            color={"primary"}
            onChange={onChangeHandlerStatus}
            checked={task.isDone}
        />

        <EditableSpan value={task.title} changeValue={onChangeHandlerTitle}/>

        <IconButton>
            <Delete onClick={onClickHandlerDelete}/>
        </IconButton>

    </li>
    )
})
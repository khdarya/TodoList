import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    };

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                label={"Title"}
              //  className={error ? "error" : ""}
            />
            {/*<input */}
            {/*    value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}

            {/*<button onClick={addTask}>+</button>*/}
            <IconButton
                color={"primary"}
                onClick={addTask}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
}
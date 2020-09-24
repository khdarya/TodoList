import React from "react";
import AppWithRedux from "./AppWithRedux";
import {connect} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";

let AppWithReduxContainer = (props: any) => {
    return (
        <AppWithRedux />
    )
}

let mstp = (state: AppRootStateType) => {
    return {
        todolists: state.todolists,
        tasks: state.tasks
    }
}

let mdtp = (dispatch: any) => {
    return {
        addTask: (title: string, todolistId: string) => dispatch(addTaskAC(title, todolistId))
    }
}

export default connect(mstp, mdtp)(AppWithReduxContainer)
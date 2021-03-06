import $ from 'jquery';
import axios from 'axios';
import config from './config';
import { Server } from 'http';
import { createUnfinishedTask, createFinishedTask, turnTaskIntoTextarea } from './list';
import { showDeleteButton, bindDeleteButton, bindCheckboxes, preventBoxChangeOnLabelClick, bindDoubleClickOnTask, bindEnterOnTextArea } from './binds';

export const getTasksFromServer = () => {
    return $.get(config.url.getTask)
        .then((response) => {
            sortTasks(response);
            showDeleteButton();
            bindDeleteButton();
            bindCheckboxes();
            preventBoxChangeOnLabelClick();
            bindDoubleClickOnTask();
        })
        .catch(() => {
            alert("Error: list loading failed!")
        });
}

const sortTasks = (tasks) => {
    tasks.forEach((task) => {
        task.done ?
            createFinishedTask(task) :
            createUnfinishedTask(task);
    });
}

export const sendTaskToServer = (task) => {
    // $.post(config.url.addTask, {
    //         task: task
    //     }, () => {}, "json")
    //     .then(() => {
    //         location.reload(true);
    //     })
    //     .catch(() => {
    //         alert("Error: your task couldn't be sent!")
    //     });

    axios.post(config.url.addTask, {
            task: task
        })
        .then((response) => {
            console.log('I am working!');
        })
        .catch((error) => {
            console.log('I am not working...');
        });
    location = location;
}

export const deleteTask = (id) => {
    axios.delete(config.url.deleteTask + id)
        .then(() => {
            location.reload(true);
        })
        .catch(() => {
            alert("There was a problem with deleting the task!");
        });
}

export const checkTaskStatus = (id, isDone) => {
    isDone === "done" ?
        moveTask(config.url.taskUndone + id) :
        moveTask(config.url.taskDone + id);
}

const moveTask = (address) => {
    axios.patch(address)
        .then(() => {
            location.reload(true);
        })
        .catch(() => {
            alert("There was a problem with moving the task!");
        });
}

export const editTask = (id, task) => {
    turnTaskIntoTextarea(task);
    bindEnterOnTextArea(id);
}

export const updateTask = (id, newTaskValue) => {
    console.log(newTaskValue);
    axios.put(config.url.editTask + id, { task: newTaskValue })
        .then(() => {
            location.reload(true);
        })
        .catch(() => {
            alert("There was a problem with editing the task!");
        });
}
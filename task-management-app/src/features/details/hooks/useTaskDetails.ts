import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { useCallback, useEffect, useState } from 'react';
import {
    deleteTaskAsync,
    fetchTaskAsync,
    updateTaskAsync,
    Mode,
    setMode as setModeAction,
    resetError,
} from '../taskDetailsSlice';
import { removeTask, storeTask } from '../../tasks-list/tasksSlice';
import { Task } from "task-management-lib/lib/task";
import ROUTES from '../../../constants/routes';
import { unwrapResult } from '@reduxjs/toolkit';

export interface TaskDetailsHook {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    updatedTask: Task | null;
    setUpdatedTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (handleClose: () => void) => void;
    setMode: (mode: Mode) => void;
    dispatchResetError: () => void;
}

/**
 * Custom hook to manage the task details page.
 * 
 * This hook is responsible for fetching the task details, updating, and deleting the task.
 * It separates the logic from the component to provide cleaner and more readable code,
 * especially for the TaskDetailsPage component which handles both edit and view modes,
 * as well as error messages. This promotes separation of concerns, making the component
 * more focused on rendering the UI.
 * 
 * On unmount, the mode is reset to view mode.
 * 
 * @param {string | undefined} id - The ID of the task to fetch. If undefined, no fetch is performed.
 * @returns {TaskDetailsHook} An object containing:
 * - `showModal`: Boolean to show or hide the modal.
 * - `setShowModal`: Function to set the modal visibility.
 * - `updatedTask`: The updated task synched with the form changes.
 * - `setUpdatedTask`: Function to set the updated task.
 * - `updateTask`: Function to update the task.
 * - `deleteTask`: Function to delete the task, takes a callback to close the modal or component.
 * - `setMode`: Function to set the current mode (view or edit).
 * - `dispatchResetError`: Function to reset any error states.
 * 
 * @example
 * const { showModal, setShowModal, updatedTask, setUpdatedTask, updateTask, deleteTask, setMode, dispatchResetError } = useTaskDetails(id);
 */
export const useTaskDetails = (id: string | undefined): TaskDetailsHook => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchTaskAsync(id));
        }
    }, [dispatch, id]);

    const setMode = useCallback((mode: Mode) => {
        dispatch(setModeAction(mode));
    }, [dispatch]);

    // Reset the mode when the component is unmounted
    useEffect(() => {
          return () => {
            setMode(Mode.VIEW);
        }
    }, [setMode]);


    const updateTask = (task: Task) => {
        dispatch(updateTaskAsync(task))
            .then((response) => {
                if (response.payload) {
                    dispatch(storeTask(response.payload));
                }
            }).then(() => {
                setMode(Mode.VIEW);
            })
    };

    const deleteTask = (handleClose: () => void) => {
        if (id) {
            dispatch(deleteTaskAsync(id))
                .then(unwrapResult)
                .then(() => dispatch(removeTask(id)))
                .then(() => navigate(ROUTES.HOME, { replace: true }))
                .catch((error) => console.error(`❌ Unable to delete the task: ${error}`))
                .finally(() => handleClose());
        }
    }

    const dispatchResetError = () => dispatch(resetError());

    return {
        updateTask,
        deleteTask,
        showModal: show,
        setShowModal: setShow,
        setMode,
        updatedTask,
        setUpdatedTask,
        dispatchResetError,
    };
};
import WorkInProgressError from "../error/WorkInProgressError";

function NewTask() {
    return (
        <>
        <WorkInProgressError pageTitle='New Task'/>
        <h1>Hello New Task Component</h1>
        </>
    );
}

export default NewTask;
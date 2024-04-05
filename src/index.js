import "./style.css";
import DOM from "./domManipulation";
import task from "./tasks";
import project from "./projects";

let data = {
    tasks: {},
    projects: {},
};

let taskCounter = 0;
let projectCounter = 0;

const myDOM = new DOM();

const homeBtn = document.querySelector(".home-btn");
const projectBtn = document.querySelector(".project-btn");
const addBtn = document.querySelector(".add-btn");
const dialog = document.querySelector("dialog");
const cancelBtn = document.querySelector(".cancel");
const createBtn = document.querySelector(".submit");

homeBtn.addEventListener("click", (e) => {
    myDOM.setStatus(e);
    myDOM.createBtnStateReset();
    myDOM.populateTasks(data.tasks);
});

projectBtn.addEventListener("click", (e) => {
    myDOM.setStatus(e);
    myDOM.createBtnStateReset();
    myDOM.populateProjects(data);
});

addBtn.addEventListener("click", () => {
    dialog.showModal();
    myDOM.createBtnState();
});

cancelBtn.addEventListener("click", () => {
    myDOM.createBtnStateReset();
    dialog.close();
});

dialog.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
        myDOM.createBtnStateReset();
    }
});

createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (myDOM.createBtnState() == "home") {
        const newTask = new task();
        newTask.id = taskCounter;
        taskCounter++;
        data["tasks"][newTask.id] = myDOM.getInput(newTask);
        myDOM.createBtnStateReset();
        dialog.close();
        myDOM.populateTasks(data.tasks);
    } else if (myDOM.createBtnState() == "editTask") {
        data["tasks"][createBtn.value] = myDOM.getInput(
            data["tasks"][createBtn.value]
        );
        createBtn.classList.remove("edit");
        myDOM.createBtnStateReset();
        dialog.close();
        myDOM.populateTasks(data.tasks);
    } else if (myDOM.createBtnState() == "editProject") {
        data["projects"][createBtn.value] = myDOM.getInput(
            data["projects"][createBtn.value]
        );
        createBtn.classList.remove("edit");
        myDOM.createBtnStateReset();
        dialog.close();
        myDOM.populateProjects(data);
    } else if (myDOM.createBtnState() == 'editProjectTask') {
        data["tasks"][createBtn.value] = myDOM.getInput(
            data["tasks"][createBtn.value]
        );
        createBtn.classList.remove("edit");
        myDOM.inspectView(data);
        myDOM.createBtnStateReset();
        dialog.close();
    } else if (myDOM.createBtnState() == "project") {
        const newProject = new project();
        newProject.id = projectCounter;
        projectCounter++;
        data["projects"][newProject.id] = myDOM.getInput(newProject);
        myDOM.createBtnStateReset();
        dialog.close();
        myDOM.populateProjects(data);
    } else if (myDOM.createBtnState() == "projectTask") {
        const newTask = new task();
        newTask.id = taskCounter;
        taskCounter++;
        newTask.project_id = +createBtn.value;
        data["tasks"][newTask.id] = myDOM.getInput(newTask);
        createBtn.classList.remove("projTasks");
        myDOM.inspectView(data);
        myDOM.createBtnStateReset();
        dialog.close();
    }

    console.log(data);
});

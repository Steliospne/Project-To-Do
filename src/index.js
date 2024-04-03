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
    myDOM.populateTasks(data.tasks);
});

projectBtn.addEventListener("click", (e) => {
    myDOM.setStatus(e);
    myDOM.populateProjects(data);
});

addBtn.addEventListener("click", () => {
    dialog.showModal();
    myDOM.createBtnShaper();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        createBtn.classList.remove('edit');
    }
})

createBtn.addEventListener("click", (e) => {
    

    e.preventDefault();
    if (
        homeBtn.className.includes("active") &&
        !createBtn.className.includes("edit")
    ) {
        const newTask = new task();
        newTask.id = taskCounter;
        taskCounter++;
        data["tasks"][newTask.id] = myDOM.getInput(newTask);
        dialog.close();
        myDOM.populateTasks(data.tasks);
    } else if (
        createBtn.className.includes("edit") &&
        homeBtn.className.includes("active")
    ) {
        data["tasks"][createBtn.value] = myDOM.getInput(
            data["tasks"][createBtn.value]
        );
        createBtn.classList.remove("edit");
        dialog.close();
        myDOM.populateTasks(data.tasks);
    } else if (createBtn.className.includes("edit")) {
        data["projects"][createBtn.value] = myDOM.getInput(
            data["projects"][createBtn.value]
        );
        createBtn.classList.remove("edit");
        dialog.close();
        myDOM.populateProjects(data.projects);
    } else if (
        projectBtn.className.includes("active") &&
        !createBtn.className.includes("projTask")
    ) {
        const newProject = new project();
        newProject.id = projectCounter;
        projectCounter++;
        data["projects"][newProject.id] = myDOM.getInput(newProject);
        dialog.close();
        myDOM.populateProjects(data);
    } else if (createBtn.className.includes("projTask")) {
        const newTask = new task();
        newTask.id = taskCounter;
        taskCounter++;
        newTask.project_id = +createBtn.value;
        data["tasks"][newTask.id] = myDOM.getInput(newTask);
        createBtn.classList.remove("projTasks");
        myDOM.inspectView(data)
        // console.log(temp.filter((task)=> task.project_id == createBtn.value))
        dialog.close();
    }

    console.log(data);
});

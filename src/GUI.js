import task from "./tasks.js";
import project from "./projects.js";
import Storage from "./Storage.js";
import { format } from "date-fns";
import Tasks from "./tasks.js";

export default class GUI {
    static wrapper = document.querySelector(".display");
    static today = new Date().toISOString().split("T")[0];
    static datePicker = document
        .querySelector("#date")
        .setAttribute("min", GUI.today);

    static dialog = document.querySelector("dialog");
    static homeBtn = document.querySelector(".home-btn");
    static projectBtn = document.querySelector(".project-btn");
    static addBtn = document.querySelector(".add-btn");
    static cancelBtn = document.querySelector(".cancel");
    static createBtn = document.querySelector(".submit");

    static initApp() {
        GUI.homeBtn.addEventListener("click", (e) => {
            GUI.screenUpdate();
            GUI.createBtnStateReset();
            GUI.navBarButtonState(e);
            GUI.renderTasks(Storage.getTasks());
        });

        GUI.projectBtn.addEventListener("click", (e) => {
            GUI.screenUpdate();
            GUI.createBtnStateReset();
            GUI.navBarButtonState(e);
            GUI.renderProjects(Storage.getProjects());
        });

        GUI.addBtn.addEventListener("click", () => {
            GUI.dialog.showModal();
            GUI.createBtnState();
        });

        GUI.cancelBtn.addEventListener("click", () => {
            GUI.createBtnStateReset();
            GUI.dialog.close();
        });

        GUI.dialog.addEventListener("keydown", (e) => {
            if (e.key == "Escape") {
                if (
                    GUI.createBtnState() == "projTasks" ||
                    GUI.createBtnState() == "editProjectTask"
                )
                    return;
                GUI.createBtnStateReset();
            }
        });

        GUI.createBtn.addEventListener("click", GUI.handleCreateButton);
    }

    static handleCreateButton(e) {
        e.preventDefault();
        const currentState = GUI.createBtnState();
        if (currentState == "home") {
            Storage.addTask(GUI.getInput(new task()));
            GUI.renderTasks(Storage.getTasks());
            GUI.createBtnStateReset();
        } else if (currentState == "project") {
            Storage.addProject(GUI.getInput(new project()));
            GUI.renderProjects(Storage.getProjects());
            GUI.createBtnStateReset();
        } else if (currentState == "editTask") {
            GUI.getInput(Storage.getTask(GUI.createBtn.value));
            GUI.renderTasks(Storage.getTasks());
            GUI.createBtnStateReset();
        } else if (currentState == "editProject") {
            GUI.getInput(Storage.getProject(GUI.createBtn.value));
            GUI.renderProjects(Storage.getProjects());
            GUI.createBtnStateReset();
        } else if (
            currentState == "editProjectTask" &&
            GUI.homeBtn.className.includes("active")
        ) {
            GUI.getInput(Storage.getTask(GUI.createBtn.value));
            GUI.renderTasks(Storage.getTasks());
            GUI.createBtnStateReset();
        } else if (currentState == "editProjectTask") {
            GUI.getInput(Storage.getTask(GUI.createBtn.value));
            GUI.inspectView(Storage.getTasks());
            GUI.createBtnStateReset();
        } else if (currentState == "projTasks") {
            Storage.addTask(GUI.getInput(new task()));
            GUI.inspectView(Storage.getTasks());
        }
        GUI.dialog.close();

        // console.log(GUI.data);
    }

    static createBtnState() {
        if (
            GUI.createBtn.className.includes("projTasks") &&
            !GUI.createBtn.className.includes("edit")
        ) {
            GUI.createBtn.textContent = "add Task";
            return "projTasks";
        } else if (
            GUI.createBtn.className.includes("edit") &&
            GUI.createBtn.className.includes("projTasks")
        ) {
            GUI.createBtn.textContent = "edit Task";
            return "editProjectTask";
        } else if (
            GUI.createBtn.className.includes("edit") &&
            GUI.homeBtn.className.includes("active")
        ) {
            GUI.createBtn.textContent = "edit Task";
            return "editTask";
        } else if (
            GUI.createBtn.className.includes("edit") &&
            GUI.projectBtn.className.includes("active")
        ) {
            GUI.createBtn.textContent = "edit Project";
            return "editProject";
        } else if (GUI.homeBtn.className.includes("active")) {
            GUI.createBtn.textContent = "add Task";
            GUI.createBtn.classList.add("task");
            return "home";
        } else if (GUI.projectBtn.className.includes("active")) {
            GUI.createBtn.textContent = "add Project";
            GUI.createBtn.classList.add("project");
            return "project";
        } else {
            GUI.createBtnStateReset();
            return null;
        }
    }
    static createBtnStateReset() {
        GUI.createBtn.className = "submit";
    }

    static renderTasks(tasks) {
        if (!GUI.createBtn.className.includes("projTasks")) {
            GUI.screenUpdate();
        }

        console.log(tasks);
        for (let task of tasks) {
            const card = document.createElement("div");
            const name = document.createElement("p");
            const description = document.createElement("p");
            const deleteBtn = document.createElement("button");
            const editBtn = document.createElement("button");
            const dueDateDisplay = document.createElement("p");

            card.classList.add("task-card");
            name.classList.add("task-name");
            description.classList.add("task-description");
            deleteBtn.classList.add("deleteBtn");
            editBtn.classList.add("editBtn");
            dueDateDisplay.classList.add("due-date");

            name.textContent = task.name;
            description.textContent = task.description;
            card.id = task.id;
            dueDateDisplay.textContent =
                task.dueDate == "" ? "" : `Due: ${task.dueDate}`;
            card.append(name, description, dueDateDisplay, editBtn, deleteBtn);
            GUI.wrapper.append(card);

            editBtn.addEventListener("click", (e) => {
                const currentTask = e.target.parentElement.id;
                GUI.createBtn.classList.add("edit");
                GUI.createBtn.value = currentTask;
                GUI.createBtnState();
                GUI.dialog.showModal();
            });

            deleteBtn.addEventListener("click", (e) => {
                GUI.wrapper.removeChild(e.target.parentElement);
                Storage.deleteTask(e.target.parentElement.id);
            });

            GUI.cardAnimation(task);
        }
    }

    static renderProjects(projects) {
        GUI.screenUpdate();
        for (let project of projects) {
            const card = document.createElement("div");
            const name = document.createElement("p");
            const description = document.createElement("p");
            const inspectBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");
            const editBtn = document.createElement("button");
            const dueDateDisplay = document.createElement("p");

            card.classList.add("project-card");
            name.classList.add("project-name");
            description.classList.add("project-description");
            inspectBtn.classList.add("inspectBtn");
            deleteBtn.classList.add("deleteBtn");
            editBtn.classList.add("editBtn");
            dueDateDisplay.classList.add("due-date");

            name.textContent = project.name;
            description.textContent = project.description;
            card.id = project.id;
            card.append(name, description, inspectBtn, editBtn, deleteBtn);
            GUI.wrapper.append(card);
            dueDateDisplay.textContent =
                task.dueDate == "" ? "" : `Due: ${task.dueDate}`;

            inspectBtn.addEventListener("click", (e) => {
                GUI.createBtn.classList.add("projTasks");
                GUI.createBtn.value = e.target.parentElement.id;
                GUI.inspectView(Storage.getTasks());
            });

            editBtn.addEventListener("click", (e) => {
                GUI.createBtn.classList.add("edit");
                GUI.createBtn.value = e.target.parentElement.id;
                GUI.createBtnState();
                GUI.dialog.showModal();
            });

            deleteBtn.addEventListener("click", (e) => {
                const projTasks = Storage.getTasks().filter(
                    (task) => task.project_id == project.id
                );
                for (let task of projTasks) {
                    Storage.deleteTask(task.id);
                }
                GUI.wrapper.removeChild(e.target.parentElement);
                Storage.deleteProject(e.target.parentElement.id);
            });

            GUI.cardAnimation(project);
        }
    }

    static inspectView(tasks) {
        GUI.screenUpdate();
        const header = document.createElement("h1");
        const backBtn = document.createElement("button");

        GUI.wrapper.append(header);
        if (GUI.createBtnState() == "editProjectTask") {
            const currentProject = Storage.getTask(
                GUI.createBtn.value
            ).project_id;
            header.textContent = Storage.getProject(currentProject).name;
            GUI.renderTasks(
                tasks.filter((task) => task.project_id == currentProject)
            );
        } else {
            header.textContent = Storage.getProject(GUI.createBtn.value).name;
            GUI.renderTasks(
                tasks.filter((task) => task.project_id == GUI.createBtn.value)
            );
        }

        backBtn.textContent = "Back";
        GUI.createBtn.classList.add("projTasks");
        GUI.wrapper.append(backBtn);

        backBtn.addEventListener("click", () => {
            GUI.createBtnStateReset();
            GUI.renderProjects(Storage.getProjects());
        });
    }

    static getInput(obj) {
        const name = document.querySelector("#name").value;
        const description = document.querySelector("#description").value;
        const priority = Array.from(
            document.getElementsByName("priority")
        ).filter((radio) => {
            return radio.checked == true;
        })[0].id;
        const dueDate = document.querySelector("#date").value;

        obj.dueDate = dueDate == "" ? "" : format(dueDate, "dd/MM/yyyy");
        obj.name = name;
        obj.description = description;
        obj.priority = priority;

        if (GUI.createBtnState() == "projTasks") {
            obj.project_id = GUI.createBtn.value;
        }

        return obj;
    }

    static navBarButtonState(e) {
        const target = e.target;
        if (!target.className.includes("active")) {
            GUI.homeBtn.className.includes("active") === true
                ? GUI.homeBtn.classList.remove("active")
                : GUI.homeBtn.classList.add("active");
            GUI.projectBtn.className.includes("active") === true
                ? GUI.projectBtn.classList.remove("active")
                : GUI.projectBtn.classList.add("active");
        }
    }

    static cardAnimation(obj) {
        if (Object.getPrototypeOf(obj) === task.prototype) {
            const card = document.querySelector(".task-card");
            if (obj.animation == false) {
                card.classList.add("animation");
                obj.animation = true;
            } else {
                card.classList.remove("animation");
            }
        } else {
            const card = document.querySelector(".project-card");
            if (obj.animation == false) {
                card.classList.add("animation");
                obj.animation = true;
            } else {
                card.classList.remove("animation");
            }
        }
    }

    static screenUpdate() {
        GUI.wrapper.textContent = "";
    }
}

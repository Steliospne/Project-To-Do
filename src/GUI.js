import task from "./tasks.js";
import project from "./projects.js";
import Storage from "./Storage.js";

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
            const taskCard = document.createElement("div");
            const name = document.createElement("p");
            const description = document.createElement("p");
            const deleteBtn = document.createElement("button");
            const editBtn = document.createElement("button");

            taskCard.classList.add("task-card");
            name.classList.add("task-name");
            description.classList.add("task-description");
            deleteBtn.classList.add("deleteBtn");
            editBtn.classList.add("editBtn");

            name.textContent = task.name;
            description.textContent = task.description;
            taskCard.id = task.id;
            taskCard.append(name, description, editBtn, deleteBtn);
            GUI.wrapper.append(taskCard);

            editBtn.addEventListener("click", (e) => {
                const currentTask = e.target.parentElement.id;
                // if (!GUI.createBtn.className.includes("projTasks")) {
                GUI.createBtn.classList.add("edit");
                // } else {
                // GUI.createBtn.classList.add("editProjectTask");
                // }
                GUI.createBtn.value = currentTask;
                GUI.createBtnState();
                GUI.dialog.showModal();
            });

            deleteBtn.addEventListener("click", (e) => {
                GUI.wrapper.removeChild(e.target.parentElement);
                Storage.deleteTask(e.target.parentElement.id);
            });
        }
    }

    static renderProjects(projects) {
        GUI.screenUpdate();
        for (let project of projects) {
            const projectCard = document.createElement("div");
            const name = document.createElement("p");
            const description = document.createElement("p");
            const inspectBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");
            const editBtn = document.createElement("button");

            projectCard.classList.add("project-card");
            name.classList.add("project-name");
            description.classList.add("project-description");
            inspectBtn.classList.add("inspectBtn");
            deleteBtn.classList.add("deleteBtn");
            editBtn.classList.add("editBtn");

            name.textContent = project.name;
            description.textContent = project.description;
            projectCard.id = project.id;
            projectCard.append(
                name,
                description,
                inspectBtn,
                editBtn,
                deleteBtn
            );
            GUI.wrapper.append(projectCard);

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
        }
    }

    static inspectView(tasks) {
        GUI.screenUpdate();
        const header = document.createElement("h1");
        const backBtn = document.createElement("button");

        GUI.wrapper.append(header);
        if (GUI.createBtnState() == "editProjectTask"){
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

        obj.dueDate = dueDate;
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

    static screenUpdate() {
        GUI.wrapper.textContent = "";
    }
}

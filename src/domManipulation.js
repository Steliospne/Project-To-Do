export default class domManipulation {
    body = document.querySelector("body");
    main = document.querySelector(".main");
    wrapper = document.querySelector(".display");

    today = new Date().toISOString().split("T")[0];
    datePicker = document
        .querySelector("#date")
        .setAttribute("min", this.today);

    dialog = document.querySelector("dialog");
    homeBtn = document.querySelector(".home-btn");
    projectBtn = document.querySelector(".project-btn");
    createBtn = document.querySelector(".submit");

    createBtnShaper() {
        if (this.homeBtn.className.includes("active")) {
            this.createBtn.innerHTML = "add Task";
        } else {
            this.createBtn.innerHTML = "add Project";
        }
    }

    populateTasks(obj) {
        this.screenUpdate();

        for (let key in obj) {
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

            name.textContent = obj[key].name;
            description.textContent = obj[key].description;
            taskCard.id = obj[key].id;
            taskCard.append(name, description, editBtn, deleteBtn);
            this.wrapper.append(taskCard);

            editBtn.addEventListener("click", (e) => {
                this.createBtn.classList.add("edit");
                this.createBtn.value = e.target.parentElement.id;
                this.dialog.showModal();
            });

            deleteBtn.addEventListener("click", (e) => {
                this.wrapper.removeChild(e.target.parentElement);
                delete obj[e.target.parentElement.id];
            });
        }
    }

    populateProjectTasks(obj) {

        for (let key in obj) {
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

            name.textContent = obj[key].name;
            description.textContent = obj[key].description;
            taskCard.id = obj[key].id;
            taskCard.append(name, description, editBtn, deleteBtn);
            this.wrapper.append(taskCard);

            editBtn.addEventListener("click", (e) => {
                this.createBtn.classList.add("edit");
                this.createBtn.value = e.target.parentElement.id;
                this.dialog.showModal();
            });

            deleteBtn.addEventListener("click", (e) => {
                this.wrapper.removeChild(e.target.parentElement);
                delete obj[e.target.parentElement.id];
            });
        }
    }

    populateProjects(obj) {
        this.screenUpdate();

        for (let key in obj.projects) {
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

            name.textContent = obj.projects[key].name;
            description.textContent = obj.projects[key].description;
            projectCard.id = obj.projects[key].id;
            projectCard.append(
                name,
                description,
                inspectBtn,
                editBtn,
                deleteBtn
            );
            this.wrapper.append(projectCard);

            inspectBtn.addEventListener("click", (e) => {
                this.screenUpdate();

                this.createBtn.classList.add("projTasks");
                this.createBtn.value = e.target.parentElement.id;
                this.inspectView(obj);
            });

            editBtn.addEventListener("click", (e) => {
                this.createBtn.classList.add("edit");
                this.createBtn.value = e.target.parentElement.id;
                this.dialog.showModal();
            });

            deleteBtn.addEventListener("click", (e) => {
                this.wrapper.removeChild(e.target.parentElement);
                delete obj[e.target.parentElement.id];
            });
        }
    }

    inspectView(obj) {
        this.screenUpdate();
        const filtered = [];
        const header = document.createElement("h1");
        const backBtn = document.createElement("button");
        for (let key in obj.tasks) {
            filtered.push(obj.tasks[key]);
        }

        header.textContent = obj.projects[this.createBtn.value].name;
        backBtn.textContent = "Back";
        this.createBtn.classList.add("projTasks");

        this.wrapper.append(header);
        this.populateProjectTasks(filtered.filter((task => task.project_id == this.createBtn.value)));
        this.wrapper.append(backBtn);

        backBtn.addEventListener("click", () => {
            this.screenUpdate();
            this.createBtn.classList.remove("projTask");
            this.populateProjects(obj);
        });
    }

    getInput(obj) {
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

        return obj;
    }

    setStatus(e) {
        const target = e.target;
        if (!target.className.includes("active")) {
            this.homeBtn.className.includes("active") === true
                ? this.homeBtn.classList.remove("active")
                : this.homeBtn.classList.add("active");
            this.projectBtn.className.includes("active") === true
                ? this.projectBtn.classList.remove("active")
                : this.projectBtn.classList.add("active");
        } else if (
            target.className.includes("editBtn") &&
            !target.className.includes("active")
        ) {
            this.editBtn.className.includes("active") === true
                ? this.editBtn.classList.remove("active")
                : this.editBtn.classList.add("active");
        }
    }

    screenUpdate() {
        this.wrapper.textContent = "";
    }
}

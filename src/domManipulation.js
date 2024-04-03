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

}

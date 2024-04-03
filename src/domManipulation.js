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


            const name = document.createElement("p");
            const description = document.createElement("p");

            name.classList.add("task-name");
            description.classList.add("task-description");

        }
    }
}

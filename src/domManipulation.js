export default class domManipulation {
    body = document.querySelector("body");

    populateProjects(obj) {
        const projects = obj;

        for (const index in projects) {
            const wrapper = document.createElement("div");
            const container = document.createElement("div");
            const name = document.createElement("p");
            const description = document.createElement("p");

            wrapper.classList.add("task-wrapper");
            container.classList.add("task-container");
            name.classList.add("task-name");
            description.classList.add("task-description");

            name.textContent = projects[index].name;
            description.textContent = projects[index].description;
            container.append(name, description);
            wrapper.append(container);
            this.body.append(wrapper);
        }
    }
}

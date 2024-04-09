export default class Storage {
    static tasks = [];
    static projects = [];
    static taskCounter = 0;
    static projectCounter = 0;

    static addTask(task) {
        Storage.tasks.push(task);
        task.id = Storage.taskCounter
        Storage.taskCounter++;
    }

    static addProject(project) {
        Storage.projects.push(project);
        project.id = Storage.projectCounter
        Storage.projectCounter++;
    }

    static getTasks() {
        return Storage.tasks;
    }

    static getProjects() {
        return Storage.projects;
    }

    static getTask(id) {
        return Storage.tasks.filter((task) => task.id == id)[0];
    }

    static getProject(id) {
        return Storage.projects.filter((project) => project.id == id)[0];
    }

    static deleteTask(id) {
        Storage.tasks = Storage.tasks.filter((task) => task.id!= id);
    }

    static deleteProject(id) {
        Storage.projects = Storage.projects.filter((project) => project.id!= id);
    }
}
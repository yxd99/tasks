const Task = require("./task.js");
const { isValid } = require("../src/js/functions.js");

class Tasks {
    constructor() {
        this._listTasks = {};
    }

    createTask( description = "" ) {
        const newTask = new Task(description);
        this._listTasks[newTask.id] = newTask;
        
    }

    readTasks( option = " " ){
        if(!isValid(option)) return;
        if(option == " "){
            return Object.values(this._listTasks);
        }else{
            const taskArray = Object.values(this._listTasks);
            return taskArray.filter(value => value.state === option);
        }
        
    }

    updateTask(id, property, value){
        this._listTasks[id][property] = value;
    }

    deleteTask(id){
        delete this._listTasks[id];
    }
}

module.exports = Tasks;
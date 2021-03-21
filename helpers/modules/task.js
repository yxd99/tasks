const { v4: uuid } = require("uuid");

class Task {

    constructor( description ){
        this.id = uuid();
        this.description = description;
        this.state = "Pendiente";
        this.date = "";
    }

}

module.exports = Task;
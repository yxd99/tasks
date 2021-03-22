require("colors");
const { inquirerMain, readInput, readList, readConfirm, readCheckBox } = require("./helpers/modules/inquirer.js");
const { pause } = require("./helpers/modules/pause.js");
const Tasks = require("./helpers/modules/tasks.js");


const main = async() => {
    let option = "";
    const task = new Tasks();
    do{
        console.clear();
        option = await inquirerMain();
        switch(option){
            case "1":{
                console.clear();
                const newTask = await readInput("¿Cuál es la tarea a guardar?");
                task.createTask(newTask);
                break;
            }
            case "2":{
                console.clear();
                const choices = [
                    {
                        value: " ",
                        name: `${"1.".green} Todas`
                    },
                    {
                        value: "Pendiente",
                        name: `${"2.".green} Pendientes`
                    },
                    {
                        value: "Completada",
                        name: `${"3.".green} Completadas`
                    },
                ]
                let message = "Seleccione la lista a visualizar";
                const typeRead = await readList(message, choices);
                const listTasks = task.readTasks(typeRead);
                message = `Lista de tareas ${typeRead}\n`;

                if(listTasks.length > 0){
                    listTasks.forEach((element, index) => {
                        let name = `${(index+1)}.`;
                        const state = element.state;
                        name = `${name.green} ${element.description} (Estado: ${state == "Completada" ? state.green : state })`;
                        message += `${name}\n`
                    });
                    message 
                    console.log(message);
                }else{
                    console.log("No hay tareas.");
                }
                break;
            }

            case "3": {
                console.clear();
                let message = "";
                const tasks = task.readTasks(" ");
                if(tasks.length > 0){
                    let choices = [];
                    tasks.forEach((element, index) => {
                        const item = `${(index+1)}.`;
                        const value = {
                            value: element.id,
                            name: `${item.green} ${element.description}`
                        }
                        choices.push(value)
                    })
                    message = "Seleccione la tarea que desea editar";
                    const idTask = await readList(message, choices);
                    message = "¿Cuál es la nueva descripción de la tarea? ";
                    const newDescription = await readInput(message);
                    const property = "description";

                    task.updateTask(idTask, property, newDescription);
                }else{
                    console.log("No hay tareas");
                }
                break;
            }

            case "4": {
                console.clear();
                let message = "";
                const tasks = task.readTasks("Pendiente");
                let choices = [];
                if(tasks.length > 0){
                    tasks.forEach((element, index) => {
                        const item = `${(index+1)}.`;
                        const value = {
                            value: element.id,
                            name: `${item.green} ${element.description}`
                        }
                        choices.push(value)
                    })
                    message = "Seleccione la tarea que desea eliminar";
                    const idTask = await readList(message, choices);
                    message = "¿Seguro que desea eliminar está tarea?";
                    const confirmDelete = await readConfirm(message);
                    if(confirmDelete){
                        task.deleteTask(idTask);
                        console.log(`Tarea eliminada ${"satisfactoriamente".green}`);
                    }else{
                        console.log(`No se elimino la tarea.`);
                    }
                }else{
                    console.log("No hay tareas.");
                }
                break;
            }

            case "5": {
                console.clear();
                const listTasks = task.readTasks();
                if(listTasks.length > 0){
                    let choices = [];
                    listTasks.forEach(element => {
                        const state = element.state;
                        const name = `${element.description} (${state == "Completada" ? state.green : state })`

                        choices.push({
                            value: element.id,
                            name: name,
                            checked: (state == "Completada")
                        })
                    })
                    const message = "Lista de tareas";
                    const statusTaks = await readCheckBox(message, choices);
                    for(let i of listTasks){
                        const property = "state";
                        const value = "Pendiente"
                        task.updateTask(i.id, property, value);
                    }
                    for(let i of statusTaks){
                        const property = "state";
                        const value = "Completada"
                        task.updateTask(i, property, value);
                    }
                    console.log("Se cambio de estado las tareas.");
                }else{
                    console.log("No hay tareas.")
                }
                break;
            }

            default:{
                break;
            }
        }

        await pause();

    }while(option !== "0");
}

main();
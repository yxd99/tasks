require("colors");
const inquirer = require("inquirer");

const inquirerMain = async() => {

    const options = [
        { 
            value: "1",
            name: `${"1.".green} Crear tarea`
        },
        { 
            value: "2",
            name: `${"2.".green} Visualizar tareas`
        },
        { 
            value: "3",
            name: `${"3.".green} Editar tarea`
        },
        { 
            value: "4",
            name: `${"4.".green} Eliminar tarea`
        },
        { 
            value: "5",
            name: `${"5.".green} Cambiar estado tareas`
        },
        { 
            value: "0",
            name: `${"6.".green} Salir`
        }
    ]

    const questions = [
        {
            type: "list",
            name: "option",
            message: "Menu principal",
            prefix: ">>",
            suffix: " <<",
            choices: options
        }
    ]

    console.clear();
    const lines = "======================================";

    console.log(lines.green);
    console.log("\tSeleccione una opción".green);
    console.log(lines.green);
    
    const { option } = await inquirer.prompt(questions);

    return option;
}

const readInput = async(message) => {
    const question = [
        {
            type: "input",
            name: "description",
            message,
            validate ( value ) {
                if(value.length === 0)
                    return `${"[ERROR]:".red} Debes ingresar una tarea.`;
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);
    return description;
}

const readList = async(message, choices) => {
    const question = [
        {
            type: "list",
            name: "option",
            message,
            choices,
            validate ( value ) {
                if(value.length === 0)
                    return `${"[ERROR]:".red} Debes seleccionar una opción.`;
                return true;
            }
        }
    ];

    const { option } = await inquirer.prompt(question);
    return option;
}

const readConfirm = async(message) => {
    const question = [
        {
            type: "confirm",
            name: "answer",
            message
        }
    ]
    const { answer } = await inquirer.prompt(question);
    return answer;
}

const readCheckBox = async(message, choices) => {
    const question = [
        {
            type: "checkbox",
            name: "listTasks",
            message,
            choices
        }
    ]

    const { listTasks } = await inquirer.prompt(question);
    return listTasks;
}

module.exports = {
    inquirerMain,
    readInput,
    readList,
    readConfirm,
    readCheckBox
}
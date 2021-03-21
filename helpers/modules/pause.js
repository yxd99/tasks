require("colors");
const inquirer = require("inquirer");

const pause = async() => {
    const question = [
        {
            type: "input",
            name: "confirm",
            message: `\nPresione ${'ENTER'.green} para continuar.\n`
        }
    ];

    const { confirm } = await inquirer.prompt(question);

    return confirm;
}

module.exports = {
    pause
}
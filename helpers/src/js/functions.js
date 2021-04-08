const fs = require("fs");

const isValid = option => {
    const validOptions = [" ", "Pendiente", "Completada"];
    return validOptions.includes(option);
}

const saveFS = task => {
    fs.writeFile("./helpers/src/files/tasks.txt", task, (error) => {
        if(error)
            console.log(error)
        else
            console.log("Archivo creado con exito.")
    })
}

module.exports = {
    isValid,
    saveFS
}
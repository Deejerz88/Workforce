const inquirer = require("inquirer");
const generatePrompts = require("./utils/generatePrompts");
const axios = require("axios").default;
const cTable = require("console.table");

let prompts = generatePrompts();

const prompt = () => {
  inquirer
    .prompt(prompts)
    .then((ans) => {
      if (ans.start) {
        const start = ans.start;
        console.log(start);
        axios
          .get(`http://localhost:3001/api/${start}`)
          .then((res) => {
            console.table(res.data)
            prompt();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
prompt()
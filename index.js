const inquirer = require("inquirer");
const axios = require("axios").default;
const cTable = require("console.table");
const startPrompts = require("./utils/startPrompts");
require("dotenv").config();

const port = process.env.PORT || 3001;

const prompt = () => {
  let prompts = startPrompts();
  inquirer
    .prompt(prompts)
    .then((ans) => {
      console.log(ans.start);
      start = ans.start;
      if (start.includes("add")) {
        let table = ans.start.substring(3).toLowerCase();
        console.log({ table });
        let prompts = require(`./utils/${table}Prompts`)();
        inquirer.prompt(prompts).then((ans) => {
          axios
            .post(`http://localhost:${port}/${table}`, ans)
            .then((res) => {
              console.table(res.data);
              prompt();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else if (start.includes("updated")) {
        let table = ans.start.substring(7).toLowerCase();
        console.log({ table });
        let prompts = require(`./utils/${table}Prompts`)('update');
        inquirer.prompt(prompts).then((ans) => {
          axios
            .put(`http://localhost:${port}/${table}`, ans)
            .then((res) => {
              console.table(res.data);
              prompt();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        axios
          .get(`http://localhost:${port}/${ans.start}`)
          .then((res) => {
            console.table(res.data);
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
};

prompt();

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
    .then(async (ans) => {
      console.log(ans.start);
      start = ans.start;
      if (start.includes("add")) {
        let table = ans.start.substring(3).toLowerCase();
        console.log({ table });
        let prompts = await require(`./utils/${table}Prompts`)();
        console.log({ prompts });
        inquirer.prompt(prompts).then((ans) => {
          console.log("anser", ans);
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
      } else if (start.includes("update")) {
        let table = ans.start.substring(6).toLowerCase();
        console.log({ table });
        let update = { new: {} }
        let prompts = await require(`./utils/${table}Prompts`)("employee");
        inquirer.prompt(prompts).then(async (ans) => {
          update.id = ans.id;
          let field = ans.field
          prompts = await require(`./utils/${table}Prompts`)(field);
          inquirer.prompt(prompts).then((ans) => {
            update.new[field] = ans[field];
            console.log("update", update);
            axios
              .put(`http://localhost:${port}/${table}`, update)
              .then((res) => {
                console.table(res.data);
                prompt();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
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

const inquirer = require("inquirer");
const axios = require("axios").default;
const cTable = require("console.table");
const startPrompts = require("./utils/startPrompts");
require("dotenv").config();

const port = process.env.PORT || 3001;

const prompt = () => {
  let prompts = startPrompts();
  inquirer.prompt(prompts).then(async (ans) => {
    console.log(ans.start);
    const start = ans.start;
    const tableArr = start.split("_");
    const action = tableArr[0];
    const table = tableArr.length > 1 ? tableArr[1].toLowerCase() : "";
    console.log({ action })
    console.log(table) 
    switch (action) {
      case "add":
        console.log({ table });
        prompts = await require(`./utils/${table}Prompts`)();
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
        break;
      case "update":
        const str = ans.start;
        console.log({ table });
        let update = { new: {} };
        prompts = await require(`./utils/${table}Prompts`)(table);
        inquirer.prompt(prompts).then(async (ans) => {
          update.id = ans.id;
          let field = ans.field || "name";
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
        });
        break;
      default:
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
  });
};

prompt();

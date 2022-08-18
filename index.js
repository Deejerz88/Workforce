const inquirer = require("inquirer");
const axios = require("axios").default;
const cTable = require("console.table");
const startPrompts = require("./utils/startPrompts");
require("dotenv").config();

const port = process.env.PORT || 3001;

const prompt = () => {
  let prompts = startPrompts();
  inquirer.prompt(prompts).then(async (ans) => {
    const start = ans.start;
    const tableArr = start.split("_");
    const action = tableArr[0];
    const table = tableArr.length > 1 ? tableArr[1].toLowerCase() : "";
    const ref = tableArr.length > 2 ? tableArr[2].toLowerCase() : "";
    console.log({ ref });
    switch (action) {
      case "add":
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
      case "view":
        prompts = await require(`./utils/${table}Prompts`)(ref);
        inquirer.prompt(prompts).then((ans) => {
          axios
            .get(`http://localhost:${port}/${table}/${ref}/${ans.id}`)
            .then((res) => {
              console.table(res.data);
              prompt();
            })
            .catch((err) => {
              console.log(err);
            });
        });
        break;
      case "remove":
        prompts = await require(`./utils/${table}Prompts`)("remove");
        inquirer.prompt(prompts).then((ans) => {
          axios
            .delete(`http://localhost:${port}/${table}/${ans.id}`)
            .then((res) => {
              axios
                .get(`http://localhost:${port}/${table}`)
                .then((res) => {
                  console.table(res.data);
                  prompt();
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        });
        break;
      default:
        axios
          .get(`http://localhost:${port}/${start}`)
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

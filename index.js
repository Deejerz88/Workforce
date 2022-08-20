const inquirer = require("inquirer");
const axios = require("axios").default;
const cTable = require("console.table");
const startPrompts = require("./lib/prompts/startPrompts");
const art = require("ascii-art");

require("dotenv").config();

const port = process.env.PORT || 3001;

const prompt = async () => {
  let prompts = startPrompts();
  inquirer.prompt(prompts).then(async (ans) => {
    const start = ans.start;
    const tableArr = start.split("_");
    const action = tableArr[0];
    const table = tableArr.length > 1 ? tableArr[1].toLowerCase() : "";
    const ref = tableArr.length > 2 ? tableArr[2].toLowerCase() : "";
    switch (action) {
      case "add":
        prompts = await require(`./lib/prompts/${table}Prompts`)();
        inquirer.prompt(prompts).then((ans) => {
          axios
            .post(`http://localhost:${port}/${table}`, { data: ans, table })
            .then((res) => {
              art.font(
                `${table.replace(table[0], table[0].toUpperCase())}s`,
                "Doom",
                (err, rendered) => {
                  console.log(rendered);
                  console.table(res.data);
                  prompt();
                }
              );
            })
            .catch((err) => {
              console.log(err);
              return;
            });
        });
        break;
      case "update":
        let data = { new: {} };
        prompts = await require(`./lib/prompts/${table}Prompts`)(table);
        inquirer.prompt(prompts).then(async (ans) => {
          data.id = ans.id;
          let field = ans.field || "name";
          prompts = await require(`./lib/prompts/${table}Prompts`)(
            action,
            field
          );
          inquirer.prompt(prompts).then((ans) => {
            data.new[field] = ans[field];
            axios
              .put(`http://localhost:${port}/${table}`, { data, table })
              .then((res) => {
                art.font(
                  `${table.replace(table[0], table[0].toUpperCase())}s`,
                  "Doom",
                  (err, rendered) => {
                    console.log(rendered);
                    console.table(res.data);
                    prompt();
                  }
                );
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
        break;
      case "viewBy":
        prompts = await require(`./lib/prompts/${table}Prompts`)(action, ref);
        inquirer.prompt(prompts).then((ans) => {
          axios
            .get(`http://localhost:${port}/${table}/${ref}/${ans.id}`)
            .then((res) => {
              art.font(
                `${table.replace(table[0], table[0].toUpperCase())}s`,
                "Doom",
                (err, rendered) => {
                  console.log(rendered);
                  console.table(res.data);
                  prompt();
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        });
        break;
      case "remove":
        prompts = await require(`./lib/prompts/${table}Prompts`)(action);
        inquirer.prompt(prompts).then((ans) => {
          const id = ans.emp ? ans.emp.id : ans.id;
          const isManager = ans.emp ? ans.emp.isManager : false;
          axios
            .delete(`http://localhost:${port}/${table}/${isManager}/${id}`)
            .then((res) => {
              axios
                .get(`http://localhost:${port}/${table}`)
                .then((res) => {
                  art.font(
                    `${table.replace(table[0], table[0].toUpperCase())}s`,
                    "Doom",
                    (err, rendered) => {
                      console.log(rendered);
                      console.table(res.data);
                      prompt();
                    }
                  );
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
      case "exit":
        art.font("GoodBye", "Doom", (err, rendered) => {
          console.log(rendered);
        });
        return;
      default:
        axios
          .get(`http://localhost:${port}/${table}`)
          .then((res) => {
            art.font(
              `${table.replace(table[0], table[0].toUpperCase())}s`,
              "Doom",
              (err, rendered) => {
                console.log(rendered);
                console.table(res.data);
                prompt();
              }
            );
          })
          .catch((err) => {
            console.log(err);
          });
    }
  });
};

art.font("WorkForce", "Doom", (err, rendered) => {
  console.log(rendered);
  prompt();
});

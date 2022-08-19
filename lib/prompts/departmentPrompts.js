const axios = require("axios").default;
require("dotenv").config();

const port = process.env.PORT || 3001;

const departmentPrompts = async (action, ref) => {
  let departmentData = await axios.get(`http://localhost:${port}/department`);

  switch (action) {
    case "department":
      return [
        {
          type: "list",
          name: "id",
          message: "Which department would you like to update?",
          choices: departmentData.data.map((department) => {
            return { name: department.Name, value: department.ID };
          }),
        },
      ];
    case "update":
      return [
        {
          type: "input",
          name: ref,
          message: "What is the new department name?",
        },
      ];
    case "remove":
      return [
        {
          type: "list",
          name: "id",
          message: "Which department would you like to remove?",
          choices: departmentData.data.map((dep) => {
            return { name: dep.Name, value: dep.ID };
          }),
        },
      ];
    case "viewBy":
      return [
        {
          type: "list",
          name: "id",
          message: "Which department's utilized budget would you like to view?",
          choices: departmentData.data.map((dep) => {
            return { name: dep.Name, value: dep.ID };
          }),
        },
      ];
    default:
      return [
        {
          type: "input",
          name: "name",
          message: "What is the name of the department?",
        },
      ];
  }
};

module.exports = departmentPrompts;

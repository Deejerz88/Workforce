const axios = require("axios").default;

const departmentPrompts = async (update) => {
  let departmentData = await axios.get("http://localhost:3001/department");

  switch (update) {
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
    case "name":
      return [
        {
          type: "input",
          name: "name",
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

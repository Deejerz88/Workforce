const axios = require("axios").default;


const rolePrompts = async (update) => {
const roleData = await axios.get("http://localhost:3001/role");
const departmentData = await axios.get("http://localhost:3001/department");
  switch (update) {
    case "role":
      return [
        {
          type: "list",
          name: "id",
          message: "Which role would you like to update?",
          choices: roleData.data.map((role) => {
            return { name: role.Title, value: role.ID };
          }),
        },
        {
          type: "list",
          name: "field",
          message: "Which field would you like to update?",
          choices: [
            { name: "Title", value: "title" },
            { name: "Salary", value: "salary" },
            { name: "Department", value: "department_id" },
          ],
        },
      ];
    case "remove":
      return [
        {
          type: "list",
          name: "id",
          message: "Which role would you like to remove?",
          choices: roleData.data.map((role) => {
            return { name: role.Title, value: role.ID };
          }),
        },
      ];
    case update:
      if (update.includes("id")) {
        return [
          {
            type: "list",
            name: update,
            message: `What is the role's new department?`,
            choices: departmentData.data.map((department) => {
              return { name: department.Name, value: department.ID };
            }),
          },
        ];
      } else {
        return [
          {
            type: "input",
            name: update,
            message: `What is the new ${update}?`,
          },
        ];
      }
    default:
      return [
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "number",
          name: "department_id",
          message: "What is the department id of the role?",
        },
      ];
  }
};

module.exports = rolePrompts;

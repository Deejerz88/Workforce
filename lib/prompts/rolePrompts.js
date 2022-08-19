const axios = require("axios").default;
require('dotenv').config();

const port = process.env.PORT || 3001;

const rolePrompts = async (action, ref) => {
  const roleData = await axios.get(`http://localhost:${port}/role`);
  switch (action) {
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
    case "update":
      if (ref === "department_id") {
        const departmentData = await axios.get(
          `http://localhost:${port}/department`
        );
        return [
          {
            type: "list",
            name: ref,
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
            name: ref,
            message: `What is the new ${ref}?`,
          },
        ];
      }
    default:
      const departmentData = await axios.get(
        `http://localhost:${port}/department`
      );
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
          type: "list",
          name: "department_id",
          message: `What is the new role's department?`,
          choices: departmentData.data.map((department) => {
            return { name: department.Name, value: department.ID };
          }),
        },
      ];
  }
};

module.exports = rolePrompts;

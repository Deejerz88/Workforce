const axios = require("axios").default;

const employeePrompts = async (update) => {
  console.log("employeePrompts");
  let empData = await axios.get("http://localhost:3001/employee");
  let roleData = await axios.get("http://localhost:3001/role");
  console.log("employee", { update });
  switch (update) {
    case "employee":
      return [
        {
          type: "list",
          name: "id",
          message: "Which employee would you like to update?",
          choices: empData.data.map((emp) => {
            return { name: `${emp.First} ${emp.Last}`, value: emp.ID };
          }),
        },
        {
          type: "list",
          name: "field",
          message: "Which field would you like to update?",
          choices: [
            { name: "First Name", value: "first_name" },
            { name: "Last Name", value: "last_name" },
            { name: "Job Title", value: "role_id" },
            { name: "Manager", value: "manager_id" },
          ],
        },
      ];
    case update:
      console.log("update", update);
      if (update.includes("id")) {
        const field = update.split("_")[0];
        const data = field === 'manager' ? empData.data : roleData.data;
        return [
          {
            type: "list",
            name: update,
            message: `What is the employee's new ${field}?`,
            choices: data.map((v) => {
              return { name:v.Title || `${v.First} ${v.Last}`, value: v.ID };
            }),
          },
        ];
      } else {
        const field = update.split("_")[0];
        return [
          {
            type: "input",
            name: update,
            message: `What is the new ${field} name?`,
          },
        ];
      }
    default:
      return [
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee's role?",
          choices: roleData.data.map((role) => {
            return {
              name: role.Title,
              value: role.ID,
            };
          }),
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the employee's manager?",
          choices: empData.data.map((emp) => {
            return { name: `${emp.First} ${emp.Last}`, value: emp.ID };
          }),
        },
      ];
  }
};

module.exports = employeePrompts;

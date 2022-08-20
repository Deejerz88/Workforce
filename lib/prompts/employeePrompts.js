const axios = require("axios").default;
require("dotenv").config();

const port = process.env.PORT || 3001;

const employeePrompts = async (action, ref) => {
  let empData = await axios.get(`http://localhost:${port}/employee`);
  let roleData = await axios.get(`http://localhost:${port}/role`);
  switch (action) {
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
    case "remove":
      const managers = empData.data.map((emp) => emp.Manager);
      return [
        {
          type: "list",
          name: "emp",
          message: "Which employee would you like to remove?",
          choices: empData.data.map((emp) => {
            const isManager = managers.includes(`${emp.First} ${emp.Last}`);
            return {
              name: `${emp.First} ${emp.Last}`,
              value: { id: emp.ID, isManager },
            };
          }),
        },
      ];
    case "viewBy":
      //view by [manager, department]
      if (!ref.includes("_")) {
        let departmentData = await axios.get(
          `http://localhost:${port}/department`
        );
        const data =
          ref === "manager"
            ? empData.data
                .map((emp) => emp.Manager)
                .filter(
                  (manager, i, self) =>
                    self.indexOf(manager) === i && manager !== null
                )
            : departmentData.data;
        return [
          {
            type: "list",
            name: "id",
            message: `Which ${ref}'s employees would you like to view?`,
            choices: data.map((item) => {
              return {
                name: item.Name || item,
                value:
                  item.ID ||
                  empData.data.filter(
                    (emp) =>
                      emp.First === item.split(" ")[0] &&
                      emp.Last === item.split(" ")[1]
                  )[0].ID,
              };
            }),
          },
        ];
      }
    case "update":
      if (ref.includes("id")) {
        const field = ref.split("_")[0];
        const data = field === "manager" ? empData.data : roleData.data;
        return [
          {
            type: "list",
            name: ref,
            message: `What is the employee's new ${field}?`,
            choices: data.map((item) => {
              return {
                name: item.Title || `${item.First} ${item.Last}`,
                value: item.ID,
              };
            }),
          },
        ];
      }
      else {
        const field = ref.split("_")[0];
        return [
          {
            type: "input",
            name: ref,
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
          validation: (input) => {
            return input.split(" ").length > 1
              ? "Please enter a single name. Use hyphens for double first names."
              : true;
          },
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

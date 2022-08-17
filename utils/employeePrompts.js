const employeePrompts = (update) => {
  switch (update) {
    case update:
      return [
        {
          type: "number",
          name: "id",
          message: "What is the id of the employee you would like to update?",
        },
      ]
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
          type: "number",
          name: "role_id",
          message: "What is the employee's role id?",
        },
        {
          type: "number",
          name: "manager_id",
          message: "What is the employee's manager id?",
        },
      ];
  }
};

module.exports = employeePrompts;

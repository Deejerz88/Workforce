const startPrompts = () => {
  return [
    {
      type: "list",
      name: "start",
      message: "Please Select One of the Following:",
      choices: [
        { name: "View All Departments", value: "department" },
        { name: "View All Employees", value: "employee" },
        { name: "View All Roles", value: "role" },
        { name: "Add Department", value: "addDepartment" },
        { name: "Add Employee", value: "addEmployee" },
        { name: "Add Role", value: "addRole" },
        { name: "Update Employee Role", value: "updateEmployee" },
      ],
      loop: true,
    },
  ];
};

module.exports = startPrompts;

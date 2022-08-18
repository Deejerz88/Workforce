const startPrompts = () => {
  return [
    {
      type: "list",
      name: "start",
      message: "Please Select One of the Following:",
      choices: [
        { name: "View All Departments", value: "department" },
        { name: "Update Department", value: "update_department" },
        { name: "Add Department", value: "add_department" },
        { name: "View All Employees", value: "employee" },
        { name: "Add Employee", value: "add_employee" },
        { name: "Update Employee", value: "update_employee" },
        { name: "View All Roles", value: "role" },
        { name: "Add Role", value: "add_role" },
        { name: "Update Role", value: "update_role" },
      ],
      loop: true,
    },
  ];
};

module.exports = startPrompts;

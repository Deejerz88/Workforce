
const startPrompts = () => {
const { Separator } = require('inquirer')

  return [
    {
      type: "list",
      name: "start",
      message: "Please Select One of the Following:",
      choices: [
        new Separator(" ==== Departments ==== "),
        { name: "View All", value: "department" },
        { name: "Update Department", value: "update_department" },
        { name: "Add Department", value: "add_department" },
        { name: "Remove Department", value: "remove_department" },
        new Separator(" ==== Employees ==== "),
        { name: "View All", value: "employee" },
        { name: "View by Manager", value: "view_employee_manager" },
        { name: "View by Department", value: "view_employee_department" },
        { name: "Update Employee", value: "update_employee" },
        { name: "Add Employee", value: "add_employee" },
        { name: "Remove Employee", value: "remove_employee" },
        new Separator(" ==== Roles ==== "),
        { name: "View All", value: "role" },
        { name: "Update Role", value: "update_role" },
        { name: "Add Role", value: "add_role" },
        { name: "Remove Role", value: "remove_role" },
      ],
      loop: true,
      pageSize: 15,
    },
  ];
};

module.exports = startPrompts;

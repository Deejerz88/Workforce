const startPrompts = () => {
  const inquirer = require("inquirer");
  const TreePrompt = require("inquirer-tree-prompt");
  inquirer.registerPrompt("tree", TreePrompt);
  return [
    {
      type: "tree",
      name: "start",
      message:
        "Please Select One of the Following:\n(arrow right to expand, left to collapse)",
      tree: [
        {
          name: "Departments",
          value: "view_department",
          open: false,
          children: [
            { name: "View All", value: "view_department" },
            { name: "View Utilized Budget", value: "viewBy_department_salary" },
            { name: "Update Department", value: "update_department" },
            { name: "Add Department", value: "add_department" },
            { name: "Remove Department", value: "remove_department" },
          ],
        },
        {
          name: "Employees",
          value: "view_employee",
          open: false,
          children: [
            { name: "View All", value: "view_employee" },
            { name: "View by Manager", value: "viewBy_employee_manager" },
            { name: "View by Department", value: "viewBy_employee_department" },
            { name: "Update Employee", value: "update_employee" },
            { name: "Add Employee", value: "add_employee" },
            { name: "Remove Employee", value: "remove_employee" },
          ],
        },
        {
          name: "Roles",
          value: "view_role",
          open: false,
          children: [
            { name: "View All", value: "view_role" },
            { name: "Update Role", value: "update_role" },
            { name: "Add Role", value: "add_role" },
            { name: "Remove Role", value: "remove_role" },
          ],
        },
        {
          name: "Exit",
          value: "exit",
          open: false,
        }
      ],
      loop: true,
      pageSize: 20,
    },
  ];
};

module.exports = startPrompts;

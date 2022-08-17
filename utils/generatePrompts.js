const generatePrompts = (question) => {
  switch (question) {
    default:
      return [
        {
          type: "list",
          name: "start",
          message: "Please Select One of the Following:",
          choices: [
            { name: "View All Departments", value: "table/department" },
            { name: "View All Employees", value: "table/employee" },
            { name: "View All Roles", value: "table/role" },
            { name: "Add Department", value: "table/add/department" },
            { name: "Add Employee", value: "table/add/employee" },
            { name: "Add Role", value: "table/add/role" },
          ],
          loop: true,
        },
      ];
  }
};

module.exports = generatePrompts;

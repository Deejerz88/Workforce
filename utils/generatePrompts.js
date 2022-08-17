const generatePrompts = (question) => {
  switch (question) {
    default:
      return [
        {
          type: "list",
          name: "view",
          message: "Please Select One of the Following:",
          choices: [
            {name:"View All Departments",value:'department'},
            {name:"View All Employees",value:'employee'},
            {name:"View All Roles", value:'role'},
          ],
          loop: true,
        },
      ];
  }
};

module.exports = generatePrompts;

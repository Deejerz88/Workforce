const rolePrompts = () => {
  return [
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the role?',
    },
    {
      type: 'number',
      name: 'salary',
      message: 'What is the salary of the role?',
    },
    {
      type: 'number',
      name: 'department_id',
      message: 'What is the department id of the role?',
    },
  ]
}

module.exports = rolePrompts;
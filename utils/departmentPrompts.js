const departmentPrompts = () => {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
    }
  ]
}

module.exports = departmentPrompts;
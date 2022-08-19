const express = require("express");
const employeeRouter = require("./routes/employee.js");
const departmentRouter = require("./routes/department.js");
const roleRouter = require("./routes/role.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employee", employeeRouter);
app.use("/department", departmentRouter);
app.use("/role", roleRouter);


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

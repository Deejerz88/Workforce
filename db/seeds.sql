INSERT into
  department(id, name)
VALUES
(1, 'IT'),
(2, 'HR'),
(3, 'Sales'),
(4, 'Marketing'),
(5, 'Accounting'),
(6, 'Admin');

INSERT into
  role(id, title, salary, department_id)
VALUES
(1, 'Manager', 150000, 1),
(2, 'Developer', 100000, 2),
(3, 'Salesman', 75000, 3),
(4, 'Marketing', 80000, 4),
(5, 'Accountant', 90000, 5),
(6, 'Admin', 100000, 6);

INSERT INTO
  employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Bezalel',
'Simmel', 1, NULL),
(2, 'Parto',
'Bamford', 2, 1),
(3, 'Chirstian',
'Koblick', 3, 1),
(4, 'Kyoichi',
'Maliniak', 4, 1),
(5, 'Anneke',
'Preusig', 5, 1),
(6, 'Lillian',
'Haddadi', 6, 1),
(7, 'Cristinel',
'Bouloucos', 1, NULL),
(8, 'Patricio',
'Bridgland', 2, 7),
(9, 'Duangkaew',
'Piveteau', 3, 7),
(10, 'Berni',
'Genin', 4, 7),
(11, 'Sumant',
'Peac', 5, 7),
(12, 'Eberhardt',
'Terkki', 6, 7);



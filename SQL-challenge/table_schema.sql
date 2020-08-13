Create Table titles
(title_id varchar (10) CONSTRAINT titles_pk PRIMARY KEY,
title varchar (200) 
);

Select * from titles;

create table employees
(emp_no varchar (200) CONSTRAINT empolyees_pk PRIMARY KEY,
emp_title_id varchar,
 birth_date DATE,
 first_name varchar,
 last_name varchar,
 sex char,
 hire_date DATE,
 foreign key(emp_title_id) references titles(title_id)
);

Select * from employees;

Create Table salaries
(emp_no varchar (200),
 salary INT,
 foreign key(emp_no) references employees(emp_no)
);

Select * from salaries;

Create Table departments
(dept_no varchar CONSTRAINT departments_pk PRIMARY KEY,
dept_name varchar (200)
);

Select * from departments;

Create Table dept_manager
(dept_no varchar,
emp_no varchar (200),
 foreign key(dept_no) references departments(dept_no),
 foreign key(emp_no) references employees(emp_no)
);

Select * from dept_manager;

Create Table dept_emp
(emp_no varchar (200),
dept_no varchar,
 foreign key(emp_no) references employees(emp_no),
 foreign key(dept_no) references departments(dept_no)
);

Select * from dept_emp;
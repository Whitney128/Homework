--List the following details of each employee: employee number, last name, first name, sex, and salary.
select E.emp_no, E.last_name, E.first_name, E.sex, S.salary
from "employees" as E
inner join "salaries" as S on
E.emp_no=S.emp_no;

--List first name, last name, and hire date for employees who were hired in 1986.
Select first_name, last_name, hire_date
from "employees"
where hire_date between '01/01/1986' and '12/31/1986'

--List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name.
Select D.dept_no, D.dept_name, DM.emp_no, E.last_name, E.first_name
from "departments" as D
inner join "dept_manager" as DM on
D.dept_no=DM.dept_no
inner join "employees" as E on
DM.emp_no=E.emp_no;

--List the department of each employee with the following information: employee number, last name, first name, and department name.
Select DE.emp_no, E.last_name, E.first_name, D.dept_name
from "employees" as E
inner join "dept_emp" as DE on
E.emp_no=DE.emp_no
inner join "departments" as D on
DE.dept_no=D.dept_no;

--List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."
SELECT first_name, last_name, sex
FROM "employees"
WHERE first_name = 'Hercules'
AND last_name LIKE 'B%';

--List all employees in the Sales department, including their employee number, last name, first name, and department name.
Select E.emp_no, E.last_name, E.first_name, D.dept_name
from "employees" as E
join "dept_emp" as DE on
E.emp_no=DE.emp_no
join "departments" as D on
DE.dept_no=D.dept_no
where dept_name = 'Sales'

--List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
select E.emp_no, E.last_name, E.first_name, D.dept_name
from "employees" as E
join "dept_emp" as DE on 
E.emp_no=DE.emp_no
join "departments" as D on
DE.dept_no=D.dept_no
where D.dept_name = 'Sales'
or D.dept_name = 'Development'

--In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
select last_name, count(last_name) as frequency
from Employees as E
group by last_name
order by frequency desc


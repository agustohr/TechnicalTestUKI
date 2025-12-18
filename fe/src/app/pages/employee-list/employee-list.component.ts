import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'department', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);

  constructor(private empSvc: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.empSvc.getAll().subscribe(list => (this.dataSource.data = list || []));
  }

  newEmployee() {
    this.router.navigate(['/employees/new']);
  }

  edit(id: string) {
    this.router.navigate(['/employees', id]);
  }
}

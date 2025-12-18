import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  isNew = false;
  originalId = '';

  form = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    department: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empSvc: EmployeeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id || id === 'new') {
      this.isNew = true;
      return;
    }

    this.originalId = id;
    this.empSvc.getById(id).subscribe(emp => this.form.patchValue(emp));
  }

  back() {
    this.router.navigate(['/employees']);
  }

  save() {
    if (this.form.invalid) return;

    var payload = this.form.value as any;

    var req = this.isNew
      ? this.empSvc.create(payload)
      : this.empSvc.update(this.originalId, payload);

    req.subscribe(
      (res: any) => {
        alert((res && res.message) || 'Berhasil disimpan');
        this.back();
      },
      (err: HttpErrorResponse) => {
        if (err.status === 409) {
          alert((err.error && err.error.message) || 'Employee ID sudah digunakan');

          var idCtrl = this.form.get('id');
          if (idCtrl) {
            idCtrl.setErrors({ duplicate: true });
            idCtrl.markAsTouched();
          }
          return;
        }

        alert((err.error && err.error.message) || 'Gagal menyimpan data');
        console.error(err);
      }
    );
  }




  delete() {
    if (this.isNew) return;
    if (!confirm('Delete this employee?')) return;

    this.empSvc.delete(this.originalId).subscribe(
      (res: any) => {
        alert((res && res.message) || 'Berhasil dihapus');
        this.back();
      },
      (err: any) => {
        alert((err && err.error && err.error.message) || 'Gagal menghapus data');
        console.error(err);
      }
    );
  }

}

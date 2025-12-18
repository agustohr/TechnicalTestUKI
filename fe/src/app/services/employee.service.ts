import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: string;
  name: string;
  department: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${encodeURIComponent(id)}`);
  }

  create(payload: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, payload);
  }

  update(oldId: string, payload: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${encodeURIComponent(oldId)}`, payload);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${encodeURIComponent(id)}`);
  }
}

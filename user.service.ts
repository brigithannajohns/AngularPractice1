import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserInfo } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  name = 'Angular 6';
  baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  // Fetch users from the API
  getUsers(): Observable<UserInfo> {
    const url = `${this.baseUrl}?page=1`;
    return this.http.get<UserInfo>(url);
  }

  // Add a new user
  postUsers(data: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl, data, { headers });
  }

  // Update an existing user
  putUsers(id: number, updatedData: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const updateUrl = `${this.baseUrl}/${id}`;
    return this.http.put<any>(updateUrl, updatedData, { headers });
  }
}

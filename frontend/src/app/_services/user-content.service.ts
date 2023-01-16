import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const Url = 'https://62ce95da826a88972dfe739a.mockapi.io/api/v1/clients';
@Injectable({
  providedIn: 'root',
})
export class UserContentService {
  constructor(private http: HttpClient) {}

  getClients(): Observable<string> {
    return this.http.get(Url, { responseType: 'text' });
  }
  getClient(id: string): Observable<string> {
    return this.http.get(Url + `/${id}`, { responseType: 'text' });
  }
}

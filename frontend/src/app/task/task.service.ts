import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/task').
      pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + `/task/${id}`).
      pipe(catchError(this.errorHandler));
  }

  create(task: Task): Observable<any> {
    return this.httpClient.post(this.apiURL + '/task', JSON.stringify(task),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.errorHandler));
  }

  update(task: Task): Observable<any>{
    return this.httpClient.put(this.apiURL + '/task', JSON.stringify(task),
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.errorHandler));
  }

  delete(id:number): Observable<any>{
    return this.httpClient.put(this.apiURL + `/task/${id}`,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
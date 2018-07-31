import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Request } from './request';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class RequestService {

    private requestsUrl = 'api/requests';

    constructor (private http: HttpClient) { }

    public getRequests (): Observable<Request[]> {
        return this.http.get<Request[]>(this.requestsUrl).pipe(
            tap((requests: Request[]) => this.log('fetched ' + requests.length + ' requests')),
            catchError(this.handleError('getRequests', []))
        );
    }
    public addRequest (request: Request): Observable<Request> {
        request.status = 'Pending';
        return this.http.post<Request>(this.requestsUrl, request, httpOptions).pipe(
            tap(() => this.log('added request w/ id=' + request.id)),
            catchError(this.handleError<Request>('addRequest'))
        );
    }
    public updateRequest (request: Request): Observable<any> {
        return this.http.put<Request>(this.requestsUrl, request, httpOptions).pipe(
            tap(() => this.log('updated request id=' + request.id)),
            catchError(this.handleError<Request>('updateRequest'))
        );
    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}}`);
            return of(result as T);
        };
    }
    private log (message: string) {
        console.log('RequestService: ' + message);
    }
}

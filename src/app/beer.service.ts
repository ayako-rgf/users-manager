import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user';
import { Request } from './request';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BeerService {

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
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}}`);
            return of(result as T);
        };
    }
    private log (message: string) {
        console.log('BeerService: ' + message);
    }
}

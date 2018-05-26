import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Beer } from './beer';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BeerService {

    private beersUrl = 'api/beers';

    constructor(private http: HttpClient, private messageService: MessageService) { }

    public getBeers(): Observable<Beer[]> {
        return this.http.get<Beer[]>(this.beersUrl).pipe(
            tap(beers => this.log(`fetched beers`)),
            catchError(this.handleError('getBeers', []))
        );
    }
    public getBeer(id: number): Observable<Beer> {
        const url = `${this.beersUrl}/${id}`;
        return this.http.get<Beer>(url).pipe(
            tap(_ => this.log(`fetched beer id=${id}`)),
            catchError(this.handleError<Beer>(`getBeer id=${id}`))
        );
    }
    public searchBeers(term: string): Observable<Beer[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.http.get<Beer[]>(`${this.beersUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found beers matching ${term}`)),
            catchError(this.handleError<Beer[]>('serachHeroes', []))
        );
    }
    public updateBeer(beer: Beer): Observable<any> {
        return this.http.put(this.beersUrl, beer, httpOptions).pipe(
            tap(_ => this.log(`updated beer id=${beer.id}`)),
            catchError(this.handleError<any>('updateBeer'))
        );
    }
    public addBeer(beer: Beer): Observable<Beer> {
        return this.http.post<Beer>(this.beersUrl, beer, httpOptions).pipe(
            tap(_ => this.log(`added beer w/ id=${beer.id}`)),
            catchError(this.handleError<Beer>('addBeer'))
        );
    }
    public deleteBeer(beer: Beer | number): Observable<Beer> {
        const id = typeof beer === 'number' ? beer : beer.id;
        const url = `${this.beersUrl}/${id}`;
        return this.http.delete<Beer>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted beer id=${id}`)),
            catchError(this.handleError<Beer>('deleteBeer'))
        );
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}}`);
            return of(result as T);
        };
    }
    private log(message: string) {
        this.messageService.add('BeerService: ' + message);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,Subject} from 'rxjs';
import { retry, catchError,tap} from 'rxjs/operators';
import { Character } from './home/Character';
import { logs } from './home/logs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  URL_SERVICES = "http://localhost:8080";
  private _refresh$  = new Subject<void>();

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Basic ' + btoa('usuario:12342')
      
    })
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getCharactersMarvel(): Observable<Character[]> {
    let url = this.URL_SERVICES + "/getCharacters";
    return this.http
      .get<Character[]>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getCharactersById(Id:number): Observable<Character[]> {
    let url = this.URL_SERVICES + "/getCharacterById/"+Id;
    return this.http
      .get<Character[]>(url)
      .pipe(
        tap(()=>{
          this._refresh$.next();
        })
      )
  }

  getLogs(): Observable<logs[]> {
    let url =  this.URL_SERVICES + "/getLogs";
    return this.http
      .get<logs[]>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  get logs$(){
    return this._refresh$;
  }
}
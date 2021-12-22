import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import {_throw as observableThrowError} from 'rxjs-compat/observable/throw';
// import { Observable } from 'rxjs/dist/types/internal/Observable';
// import { catchError } from 'rxjs/dist/types/internal/operators/catchError';
// import { catchError } from 'rxjs-compat/operators/catchError';
// import {throwError as observableThrowError} from 'rxjs/src/internal/observable/throwError';

@Injectable()
export class HttpErrorsIntercepter implements HttpInterceptor{

    constructor(){}

    intercept(
        req:HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err)=>{
                console.log(err);
                return observableThrowError(err);
            })
        )
    }
}


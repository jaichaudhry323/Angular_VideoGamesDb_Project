import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersIntercepter implements HttpInterceptor {

    constructor() { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        // From code snippets part of below url:
        // https://rapidapi.com/accujazz/api/rawg-video-games-database/
        req = req.clone({
            setHeaders: {
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
                'x-rapidapi-key': '784cfb171dmsh940d51e7a1c94f8p17bc62jsnadd2ed055fdf'
            },
            setParams: {
                key: 'b68d9baab83e4b2ba6f8e20ec5a059a8'
            }
        });

        return next.handle(req);
    }
}


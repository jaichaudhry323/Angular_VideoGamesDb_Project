import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { env } from 'process';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL = "https://rawg-video-games-database.p.rapidapi.com/games/";

  constructor(private http: HttpClient) { }

  getGameList(ordering: string,search?: string): Observable<APIResponse<Game>> {

    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    // https://rawg-video-games-database.p.rapidapi.com
    return this.http.get<APIResponse<Game>>("https://rawg-video-games-database.p.rapidapi.com/games", {
      params: params
    })

    // return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
    //   params: params
    // })
  }

  // Pending
  getGameDetails(id:string): Observable<Game> {

    const gameInfoRequest = this.http.get(`https://rawg-video-games-database.p.rapidapi.com/games/${id}`);
    const gameTrailerRequest = this.http.get(`https://rawg-video-games-database.p.rapidapi.com/games/${id}/movies`);
    const gameScreenshotsRequest = this.http.get(
      `https://rawg-video-games-database.p.rapidapi.com/games/${id}/screenshots`
    );

    console.log("gameInfoRequest",gameInfoRequest);
    console.log("gameTrailerRequest",gameTrailerRequest);
    console.log("gameScreenshotsRequest",gameScreenshotsRequest);
    console.log(`https://rawg-video-games-database.p.rapidapi.com/games/${id}/screenshots`)

    // Pending
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailerRequest
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailerRequest']?.results,
        }
      })
    );
  
  }

}
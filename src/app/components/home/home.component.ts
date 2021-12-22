import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort: string = "";
  public games: Array<Game> = [];

  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;

  // This won't work inside *ngFor | only pipes that are created via separate file i.e import { Pipe, PipeTransform } from '@angular/core';
  // public stringLowerCase (str: string)
  // {
  //   // return toLowerCase(str);
  //   return str.toLowerCase();
  // }

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }


  ngOnInit(): void {

    // activatedRoute.params.subscribe to subscribe to the params of the link
    // After getting the value of the parameter, we change the value of the route 
    // or navigae dynamically and store the value of the parameter in the params variable
    // https://www.pluralsight.com/guides/accessing-route-parameters-with-activatedroute-vs.-acitivatedroutesnapshot
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      }
      else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string): void {

    console.log("SearchGames function called on mat-select change");

    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);

        // 'name' & 'slug' properties are coming from the model that we have defined
        // If you don't define slug property in your own model then 
        // the property slug coming from the api won't be copied to ur model 
        // and hence u won't be able to access it
        // So, make sure you define everything or use a JSON converter 
        console.log(typeof (gameList.results[0].parent_platforms[0].platform.name));
        console.log(typeof (gameList.results[0].parent_platforms[0].platform.slug));
      })
  }

  openGameDetails(id: string): void {

    // goto url/details/id
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {

    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }


    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}


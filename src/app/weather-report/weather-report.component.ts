import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherAppService } from '../weather-app.service';
import { Observable, Subscription } from 'rxjs';
import { filter, map, concatMap, tap } from 'rxjs/operators'


@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {

  data$: Observable<any>| undefined;
  today = new Date();
  loading:boolean = false;

  constructor(private weatherAppService: WeatherAppService ,private route: ActivatedRoute){

  }

  // ngOnInit(): void {
  //     console.log('this.route: ',this.route.params.subscribe(params => {
  //       console.log('params: ', params['locationName'])
  //     }))

  //     this.data$ = this.route.params.subscribe(params => params['locationName'])
  //     console.log('Data: ',this.data$)
  // }


  // ngOnInit(): void{
  //  this.data$ = this.route.params.pipe(
  //       map(params => {
  //         console.log('Map: ', params['locationName'])
  //         return params['locationName']
  //       }),
  //       filter((name) => {
  //       console.log('name: ', name, '!!name: ', !!name)
  //       return !!name
  //       }),
  //       concatMap(name => {
  //         console.log('name2: ', name)
  //         return this.weatherAppService.getWeatherForCity(name)
  //       })
  //     );
  // }


  ngOnInit() {
    this.data$ = this.route.params.pipe(
      map((params) => params["locationName"]),
      filter((name) => !!name),
      tap( ()=> this.loading = true),
      concatMap((name) => this.weatherAppService.getWeatherForCity(name)),
      tap( ()=> this.loading = false),
    );
  }
  
}

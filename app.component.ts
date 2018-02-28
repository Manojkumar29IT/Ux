import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GithubService } from './Github/github-service.service';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GithubService]
})
export class AppComponent implements OnInit {
  title = 'app';
  userName: any;
  publicRepoNames = [];
  protected dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  ngOnInit() {
  }
  constructor(public githubService: GithubService, private completerService: CompleterService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
  }
  onEnter(userName: string): void {
    console.log(userName);
    if (userName) {
      this.publicRepoNames = [];
      this.githubService.getResponse(userName).subscribe(
        (response: any) => {
          var publicReposArray = JSON.parse(response._body);
          if (publicReposArray.message) {
            this.publicRepoNames.push("Public repos not available");
          }
          else {
            console.log(typeof (publicReposArray))
            publicReposArray.forEach(element => {
              console.log("success");
              this.publicRepoNames.push(element.name);
              console.log(this.publicRepoNames);
            });
          }
        },
        (error: any) => {
          console.log(error);
        })
      event.preventDefault();
    }
  }
}

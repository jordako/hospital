import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';
import { User, Hospital, Doctor } from 'src/app/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  users: User[];
  doctors: Doctor[];
  hospitals: Hospital[];
  loading = true;

  constructor(
    public route: ActivatedRoute,
    public searchService: SearchService
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const term = params['term'];
        this.search(term);
      });
  }

  search(term: string) {
    this.loading = true;
    this.searchService.searchAll(term)
      .subscribe((resp: any) => {
        this.hospitals = resp.hospitals;
        this.doctors = resp.doctors;
        this.users = resp.users;
        this.loading = false;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit {

  constructor() {
    this.countThree().subscribe(
      count => console.log(count),
      error => console.error(error),
      () => console.log('OK!')
    );
  }

  ngOnInit() {
  }

  countThree(): Observable<number> {
    return new Observable(observer => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        const result = {
          value: count
        };
        observer.next(result);

        if (count === 3) {
          clearInterval(interval);
          observer.complete();
        }
      }, 1000);
    }).pipe(
      map((response: any) => response.value)
    );
  }

}

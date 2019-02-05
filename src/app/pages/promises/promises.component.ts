import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html'
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.countThree()
      .then(result => console.log(result))
      .catch(error => console.error('Error:', error));
  }

  ngOnInit() {
  }

  countThree(): Promise<string> {
    return new Promise( (resolve, reject) => {
      let count = 0;
      const interval = setInterval( () => {
        count++;
        console.log(count);

        if (count === 3) {
          resolve('OK!');
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}

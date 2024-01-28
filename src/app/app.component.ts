import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  summaryData: any; // Property to store received summary data

  displaySummary(summary: any) {
    this.summaryData = summary;
  }
}

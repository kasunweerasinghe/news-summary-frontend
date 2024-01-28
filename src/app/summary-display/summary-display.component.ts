import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-summary-display',
  templateUrl: './summary-display.component.html',
  styleUrls: ['./summary-display.component.scss']
})
export class SummaryDisplayComponent implements OnInit {
  @Input() summaryData: any;
  formattedSentiment: string = ''; // Add this property

  public summeryDisplayForm!: FormGroup; // Add '!' to indicate it will be initialized later

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.summeryDisplayForm = this.fb.group({
      title: [null],
      author: [null],
      publishDate: [null],
      summary: [null],
      sentiment: [null]
    });
  }

  ngOnChanges() {
    console.log('ngOnChanges triggered');
    if (this.summaryData && this.summaryData.translated_summary) {
      this.formattedSentiment = `${this.summaryData.sentiment.sentiment}`;
      this.summeryDisplayForm.patchValue({
        title: this.summaryData.title,
        author: this.summaryData.author,
        publishDate: this.summaryData.publication_date,
        summary: this.summaryData.translated_summary,
        sentiment: this.summaryData.sentiment?.sentiment,
      });
    }
  }


  resetSummary() {
    // Reset the form
    this.summeryDisplayForm.reset();
  }
}

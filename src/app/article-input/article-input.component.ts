import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewsSummaryService} from '../news-summary.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-article-input',
  templateUrl: './article-input.component.html',
  styleUrls: ['./article-input.component.scss']
})
export class ArticleInputComponent implements OnInit {

  public articleInputForm!: FormGroup;

  isLoading = false;
  errorMessage = '';
  summaryData: any;

  languages: string[] = ['en', 'fr', 'es', 'ta', 'ja', 'hi', 'zh-CN', 'ar', 'bn', 'ru'];

  @Output() summaryGenerated = new EventEmitter<any>();

  constructor(private http: HttpClient, private newsSummaryService: NewsSummaryService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.articleInputForm = this.formBuilder.group({
      urlInput: [null, Validators.required],
      languageSelect: ['en', Validators.required]
    });
  }

  onSummarize() {
    if (this.articleInputForm.invalid) {
      this.articleInputForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const url = this.articleInputForm.get('urlInput')?.value;
    const selectedLanguage = this.articleInputForm.get('languageSelect')?.value;
    console.log(selectedLanguage)

    this.newsSummaryService.fetchSummary(url, selectedLanguage)
      .subscribe(summaryData => {
          this.summaryData = summaryData;
          this.summaryGenerated.emit(summaryData);
          this.isLoading = false;
        },
        error => {
          this.errorMessage = 'Error fetching summary: ' + error.message;
          this.isLoading = false;
        });
  }

  getLanguageName(language: string): string {
    const languageNames: { [key: string]: string } = {
      'en': 'English',
      'fr': 'French',
      'es': 'Spanish',
      'ta': 'Tamil',
      'ja': 'Japanese',
      'hi': 'Hindi',
      'zh-CN': 'Mandarin Chinese',
      'ar': 'Standard Arabic',
      'bn': 'Bengali',
      'ru': 'Russian',
    };

    return languageNames[language] || language;
  }
}


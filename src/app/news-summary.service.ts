import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {SummaryResponse} from './summary-response';

@Injectable({
  providedIn: 'root'
})
export class NewsSummaryService {
  constructor(private http: HttpClient) {
  }

  fetchSummary(url: string, target_language: string): Observable<SummaryResponse> {
    return this.http.post<SummaryResponse>('http://127.0.0.1:8000/summarize', {url, target_language});
  }


}

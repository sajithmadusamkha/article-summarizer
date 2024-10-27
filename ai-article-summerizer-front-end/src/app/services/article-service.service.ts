import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SummaryResponse {
  summary: string;
  translated_summary: string;
  title: string;
  author: string;
  publication_date: string;
  sentiment: {
    polarity: number;
    sentiment: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://127.0.0.1:8000/summarize';

  constructor(private http: HttpClient) {}

  summarizeArticle(
    url: string,
    targetLanguage: string
  ): Observable<SummaryResponse> {
    return this.http.post<SummaryResponse>(this.apiUrl, {
      url,
      target_language: targetLanguage,
    });
  }
}

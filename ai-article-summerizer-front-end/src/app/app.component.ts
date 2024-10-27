import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ArticleService,
  SummaryResponse,
} from './services/article-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ai-article-summerizer-front-end';

  summaryForm: FormGroup | any;
  summaryData: SummaryResponse | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.summaryForm = this.fb.group({
      url: ['', Validators.required],
      targetLanguage: ['en', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.summaryForm?.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      const { url, targetLanguage } = this.summaryForm.value;

      this.articleService.summarizeArticle(url, targetLanguage).subscribe(
        (response) => {
          this.summaryData = response;
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage =
            'Failed to summarize the article. Please try again.';
          this.isLoading = false;
        }
      );
    }
  }
}

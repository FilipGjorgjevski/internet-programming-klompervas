import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 20px;">
      <h1>Movie List</h1>
      <div *ngIf="errorMessage" style="color: red">{{ errorMessage }}</div>
      
      <div class="grid">
        <div *ngFor="let movie of movies" class="card">
          <h3>{{ movie.title }} ({{ movie.year }})</h3>
          <p>{{ movie.plot }}</p>
          <button (click)="deleteMovie(movie.id)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
    .card { border: 1px solid #ddd; padding: 1rem; border-radius: 4px; }
  `]
})
export class MovieListComponent implements OnInit {
  movieService = inject(MovieService);
  movies: Movie[] = [];
  errorMessage = '';

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load movies. Check console.';
      }
    });
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(() => this.loadMovies());
  }
}
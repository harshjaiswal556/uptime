import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

export interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  twitter_username: string;
  followers: number;
  following: number;
  html_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly baseUrl = 'https://api.github.com/users/';
  private userSubject = new BehaviorSubject<GithubUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  fetchUser(username: string) {
    return this.http.get<GithubUser>(`${this.baseUrl}${username}`).pipe(
      tap((user) => this.userSubject.next(user)),
      catchError((err) => {
        console.error('Error fetching user', err);
        this.userSubject.next(null);
        return of(null);
      })
    );
  }

  /** Optional: direct access to current user value */
  get currentUser() {
    return this.userSubject.value;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CachedDataService } from "./cach/cached-data.service";

/**
 * Service to manage user data.
 * It provides functionalities to fetch user data from the server
 * and utilizes caching to store and retrieve user data efficiently.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private cacheService: CachedDataService) {}

  /**
   * Retrieves a list of users from the server or cache.
   * The data is cached for subsequent requests based on the page and pageSize.
   *
   * @param page The current page number of the user list.
   * @param pageSize The number of users per page.
   * @returns An Observable of the user data.
   */
  getUsers(page: number, pageSize: number): Observable<any> {
    const endpoint = `/users?page=${page}&per_page=${pageSize}`;
    const cacheKey = `users-page-${page}-size-${pageSize}`;
    const cachedData = this.cacheService.get(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<any>(endpoint).pipe(
      tap(data => this.cacheService.set(cacheKey, data)),
      map(data => data),
      catchError(this.handleError('getUsers', []))
    );
  }

  /**
   * Fetches details of a specific user from the server.
   *
   * @param id The unique identifier of the user.
   * @returns An Observable of the user details.
   */
  getUserDetails(id: number): Observable<any> {
    const endpoint = `/users/${id}`;
    return this.http.get<any>(endpoint).pipe(
      map(data => data),
      catchError(this.handleError('getUser', {}))
    );
  }

  /**
   * Handles HTTP operation failures and lets the app continue.
   * @param operation - name of the operation that failed.
   * @param result - optional value to return as the observable result.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

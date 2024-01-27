import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../../core/services/user.service';
import { UserData } from '../../../core/models/user-data.model';
import { Store } from '@ngrx/store';
import { selectSearchValue } from '../../../core/store/selectors/search.selectors';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../../../core/store/reducers';
import { NavigationEnd, Router } from '@angular/router';

/**
 * Component to display a paginated list of users.
 * It allows navigation to user details and implements instant search functionality.
 */
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  totalUsers = 0;
  pageSize = 5;
  currentPage = 1;
  users: UserData[] = [];
  isLoading = true;
  searchValue: string = '';
  private navigationSubscription!: Subscription;
  private searchSubscription!: Subscription;

  constructor(private userService: UserService,
              private store: Store<AppState>, private router: Router) {}

  /**
   * OnInit lifecycle hook. Sets up subscriptions to listen for route changes and search value updates.
   */
  ngOnInit() {
    this.setupNavigationSubscription();
    this.setupSearchSubscription();
    this.loadData(this.currentPage, this.pageSize);
  }

  /**
   * Sets up a subscription to navigation events to reset the search value on route changes.
   */
  private setupNavigationSubscription() {
    this.navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.resetSearchValue());
  }

  /**
   * Sets up a subscription to the search value in the store, redirecting to user details if a search value is present.
   */
  private setupSearchSubscription() {
    this.searchSubscription = this.store.select(selectSearchValue).subscribe(value => {
      this.searchValue = value;
      if (value) this.goToUserDetail(value);
    });
  }

  /**
   * Resets the current search value.
   */
  resetSearchValue() {
    this.searchValue = '';
  }

  /**
   * OnDestroy lifecycle hook. Unsubscribes from subscriptions to prevent memory leaks.
   */
  ngOnDestroy() {
    this.navigationSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  /**
   * Handles page changes for the user list.
   * @param event The page change event from the paginator.
   */
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData(this.currentPage, this.pageSize);
  }

  /**
   * Loads users from the UserService based on the current page and pageSize.
   * @param page The current page index.
   * @param pageSize The number of items per page.
   */
  loadData(page: number, pageSize: number): void {
    this.isLoading = true;
    this.userService.getUsers(page, pageSize).subscribe(data => {
      this.users = data.data;
      this.totalUsers = data.total;
      this.isLoading = false;
    }, error => {
      console.error('Failed to load users', error);
      this.isLoading = false;
    });
  }

  /**
   * Navigates to the detail view of a user.
   * @param userId The ID of the user to navigate to.
   */
  goToUserDetail(userId: any): void {
    this.router.navigate(['/user', userId]);
  }
}

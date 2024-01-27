import { Component } from '@angular/core';
import {UserData} from "../../../core/models/user-data.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {readableStreamLikeToAsyncGenerator} from "rxjs/internal/util/isReadableStreamLike";
import * as SearchActions from "../../../core/store/actions/search.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  user: UserData | undefined;
  isLoading = false
  constructor(
    private route: ActivatedRoute,
    private store:Store,
    private router:Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = +params.get('id')!;
      this.loadUserDetail(userId);
    });
  }

  loadUserDetail(userId: number): void {
    this.isLoading = true
    this.userService.getUserDetails(userId).subscribe(
      (userData: any) => {
        this.user = userData.data;
        this.isLoading = false
        },
      error => {
        console.error('Failed to load user details', error);
        this.isLoading = false
      }
    );
  }

  reset() {
    this.store.dispatch(SearchActions.setSearchValue({ value: '' }));
    this.router.navigate(['/']);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import {MatCardModule} from "@angular/material/card";
import {CoreModule} from "../../core/core.module";
import { UserDetailComponent } from './user-detail/user-detail.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    UsersListComponent,
    UserCardComponent,
    UserDetailComponent,

  ],
  exports: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    UsersRoutingModule,
    MatCardModule,
    CoreModule,
    MatProgressBarModule

  ]
})
export class UsersModule { }

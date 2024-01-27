import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginatorComponent} from "./components/paginator/paginator.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import { FocusDirective } from './directives/focus.directive';
import { LazyLoadImageDirective } from './directives/lazy-load-image.directive';

@NgModule({
  imports: [CommonModule,MatPaginatorModule],
  declarations: [
    PaginatorComponent,
    FocusDirective,
    LazyLoadImageDirective,
    ],
  providers: [
   ],
  exports: [
    PaginatorComponent,
    FocusDirective,
    LazyLoadImageDirective
  ]
})
export class CoreModule {
}

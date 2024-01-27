import {Component, Input} from '@angular/core';
import {UserData} from "../../../core/models/user-data.model";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: UserData;
  @Input() index!: number;

}

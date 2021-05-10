import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  @HostBinding("style.width") width: string;
  @HostBinding("style.height") height: string;
  @HostBinding("style.fontSize") font: string;
  @Input() user: User;
  @Input() size: string;

  constructor() { }

  ngOnInit() {
    this.width = this.size;
    this.height = this.size;
    this.font = this.size;
  }

}

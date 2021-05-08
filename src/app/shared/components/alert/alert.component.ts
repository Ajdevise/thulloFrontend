import { Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { transition, animate, trigger, style, state } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('activeInactive', [
      state('inactive', style({
        transform: 'scaleX(0)'
      })),
      state('active', style({
        transform: 'scaleX(1)'
      })),
      transition('inactive => active', [
        animate('3s')
      ])
    ])
  ]
})
export class AlertComponent implements OnInit, OnChanges {
  @HostBinding("style.display") alertDisplay: string = "none";
  @Input() show: boolean;
  isActive = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.show) {
      this.showAlert();
      this.disappear();
    } 
  }

  private showAlert() {
    this.alertDisplay = "block";
    this.isActive = true;
  }

  private disappear() {
    const timer = setTimeout(() => {
      this.alertDisplay = "none";
      this.isActive = false;
      clearTimeout(timer);
    }, 3000);
  }
}

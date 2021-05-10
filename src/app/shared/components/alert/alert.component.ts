import { Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
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
  }

  private disappear() {
    const timer = setTimeout(() => {
      this.alertDisplay = "none";
      clearTimeout(timer);
    }, 3000);
  }
}

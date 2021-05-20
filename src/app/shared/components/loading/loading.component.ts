import { Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnChanges {
  @Input() position: "fixed" | "absolute";
  @HostBinding("style.position") pos = "fixed";

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.pos = this.position;
  }
}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.scss']
})
export class VisibilityComponent implements OnInit {
  @Input() currentVisibilityType: string;
  @Output() visibilitySelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  emitVisibility(visibilityType: string) {
    this.visibilitySelected.emit(visibilityType);
  }
}

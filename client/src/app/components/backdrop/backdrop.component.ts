import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css']
})
export class BackdropComponent implements OnInit {

  constructor() { }

  @Input() public showBackdrop: Boolean;
  @Output() public backdropEvent = new EventEmitter<Boolean>();

  ngOnInit() {
  }

  hideBackdrop() {
    this.showBackdrop = false;
  }

  clickBackdrop() {
    this.backdropEvent.emit(false);
  }

}

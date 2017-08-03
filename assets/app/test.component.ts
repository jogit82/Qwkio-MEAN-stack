import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <button (click)="decrement()">-</button>
    <span>{{counter}}</span>
    <button (click)="increment()">+</button>
  `
})
export class TestComponent {
  
  counterValue = 0;
  @Output() counterChange = new EventEmitter();
  
  @Input()
  get counter() {
    return this.counterValue;
  }
  
  set counter(val) {
    this.counterValue = val;
    this.counterChange.emit(this.counterValue);
  }
  
  decrement() {
    this.counter--;
  }
  
  increment() {
    this.counter++;
  }
}
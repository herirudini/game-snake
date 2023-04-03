import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Map } from '../app.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnChanges, AfterContentChecked {
  x: number[] = [];
  y: number[] = [];
  @Input() map: Map;
  @Input() snake: string[];
  @Input() prey: string;
  constructor(
    private readonly changeDetector: ChangeDetectorRef
  ) { 
    
  }
  isSnake(id: string):boolean {
    if (id && this.snake) return this.snake.includes(id);
    return false;
  }
  isPrey(id: string):boolean {
    return this.prey === id;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes) {
      if(changes.map) {
        this.x = this.map.x;
        this.y = this.map.y;
      }
    }
  }
  ngAfterContentChecked() : void {
    this.changeDetector.detectChanges();
}
}

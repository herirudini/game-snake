import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { TimeInterval } from 'rxjs';
import { KeyboardArrow } from 'src/assets/enum';

export interface Map {
  coordinatesList: string[];
  x: number[];
  y: number[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Snake';
  potrait: boolean = false;
  max: number = 15;
  map: Map;
  time: any;
  snake: string[];
  prey: string;

  up: boolean = true;
  down: boolean;
  left: boolean;
  right: boolean;
  constructor() {
  }
  @HostListener("window:resize")
  getScreenSize() {
    this.potrait = window.innerWidth < window.innerHeight;
  }
  @HostListener('window:keyup', ['$event'])
  onArrowRight(event: KeyboardEvent) {
    const { key } = event;
    if (key === KeyboardArrow.U && !this.down) {
      this.up = true;
      this.down = false;
      this.left = false;
      this.right = false;
    } else if (key === KeyboardArrow.D && !this.up) {
      this.up = false;
      this.down = true;
      this.left = false;
      this.right = false;
    } else if (key === KeyboardArrow.L && !this.right) {
      this.up = false;
      this.down = false;
      this.left = true;
      this.right = false;
    } else if (key === KeyboardArrow.R && !this.left) {
      this.up = false;
      this.down = false;
      this.left = false;
      this.right = true;
    }
    console.log(event);
  }
  ngOnInit(): void {
    this.generateArena();
  }
  
  generateArena() {
    const tempX: number[] = [];
    const tempY: number[] = [];
    const tmpCoordinatesList: string[] = [];
    for(let i=0; i<=this.max; i+=1) {
      tempX.push(i);
      tempY.push(i);
      for(let j=0; j<=this.max; j+=1) {
        tmpCoordinatesList.push(i+'-'+j);
      }
    }
    this.map = {
      coordinatesList: tmpCoordinatesList,
      x: tempX,
      y: tempY
    }
    const tmpSnake: string[]=[];
    const startPoint = Math.floor(tmpCoordinatesList.length/3);
    for(let i=startPoint; i<startPoint+5; i+=1) {
      tmpSnake.push(tmpCoordinatesList[i])
    }
    this.snake = tmpSnake; // Default Snake Position and Condition
    this.generatPrey();
  }
  generatPrey(): Promise<void> {
    const randomX = Math.floor((Math.random() * this.max) + 0);
    const randomY = Math.floor((Math.random() * this.max) + 0);
    const tmpPrey = randomX+'-'+randomY;
    return new Promise<void>((resolve)=>{
      if (this.snake.includes(tmpPrey)) {
        this.generatPrey();
      } else {
        this.prey = tmpPrey;
      }
      resolve();
    })
  }
  ngAfterViewInit(): void {
    this.run();
  }
  run() {
    this.time = setInterval(()=>{
      const head = this.snake[0];
      const n = head.split('-');
      const nX = Number(n[0]);
      const nY = Number(n[1]);
      const topEnd = nX === 0;
      const bottomEnd = nX === this.max;
      const leftEnd = nY === 0;
      const rightEnd = nY === this.max;
      let newHead: string = head;
      if (this.up) {
        let newnX;
        if (topEnd) {
          newnX = this.max;
        } else {
          newnX = nX - 1;
        }
        newHead = `${newnX}-${nY}`
      } else if (this.down) {
        let newnX;
        if (bottomEnd) {
          newnX = 0;
        } else {
          newnX = nX + 1;
        }
        newHead = `${newnX}-${nY}`
      } else if (this.left) {
        let newnY;
        if (leftEnd) {
          newnY = this.max;
        } else {
          newnY = nY - 1;
        }
        newHead = `${nX}-${newnY}`
      } else if (this.right) {
        let newnY;
        if (rightEnd) {
          newnY = 0;
        } else {
          newnY = nY + 1;
        }
        newHead = `${nX}-${newnY}`
      }
      const newSnake = [newHead, ...this.snake];
      newSnake.pop();
      this.move(newSnake);
    },1000)
  }
  async move(newSnake: string[]) {
    if (newSnake.includes(this.prey)) {
      await this.generatPrey();
      let newTail;
      
      this.snake = newSnake;
    };
    this.snake = newSnake;
  }
}

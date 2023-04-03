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
  gameOver: boolean;
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  locked: string;
  constructor() {
  }
  @HostListener("window:resize")
  getScreenSize() {
    this.potrait = window.innerWidth < window.innerHeight;
  }
  @HostListener('window:keyup', ['$event'])
  onArrowRight(event: KeyboardEvent) {
    const { key } = event;
    if (key === KeyboardArrow.U && this.locked !== KeyboardArrow.U) {
      this.up = true;
      this.down = false;
      this.left = false;
      this.right = false;
    } else if (key === KeyboardArrow.D && this.locked !== KeyboardArrow.D) {
      this.up = false;
      this.down = true;
      this.left = false;
      this.right = false;
    } else if (key === KeyboardArrow.L && this.locked !== KeyboardArrow.L) {
      this.up = false;
      this.down = false;
      this.left = true;
      this.right = false;
    } else if (key === KeyboardArrow.R && this.locked !== KeyboardArrow.R) {
      this.up = false;
      this.down = false;
      this.left = false;
      this.right = true;
    }
  }
  ngOnInit(): void {
    this.generateArena();
  }

  generateArena() {
    const tempX: number[] = [];
    const tempY: number[] = [];
    const tmpCoordinatesList: string[] = [];
    for (let i = 0; i <= this.max; i += 1) {
      tempX.push(i);
      tempY.push(i);
      for (let j = 0; j <= this.max; j += 1) {
        tmpCoordinatesList.push(i + '-' + j);
      }
    }
    this.map = {
      coordinatesList: tmpCoordinatesList,
      x: tempX,
      y: tempY
    }
    const tmpSnake: string[] = [];
    const startPoint = Math.floor(tmpCoordinatesList.length / 3);
    for (let i = startPoint; i < startPoint + 5; i += 1) {
      tmpSnake.push(tmpCoordinatesList[i])
    }
    this.snake = tmpSnake; // Default Snake Position and Condition
    this.generatPrey();
  }
  generatPrey(): Promise<void> {
    const randomX = Math.floor((Math.random() * this.max) + 0);
    const randomY = Math.floor((Math.random() * this.max) + 0);
    const tmpPrey = randomX + '-' + randomY;
    return new Promise<void>((resolve) => {
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
    this.time = setInterval(() => {
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
        this.locked = KeyboardArrow.L;
      } else {
        return;
      }
      if (this.snake.includes(newHead)) {
        this.gameOver = true;
      } else {
        this.gameOver = false;
      }
      const newSnake = [newHead, ...this.snake];
      this.move(newSnake);
    }, 1000)
  }
  async move(newSnake: string[]) {
    if (this.gameOver) {
      return;
    }
    if (newSnake.includes(this.prey)) {
      await this.generatPrey();
      this.snake = newSnake;
    } else {
      newSnake.pop();
      this.snake = newSnake;
    }
    if (this.up) {
      this.locked = KeyboardArrow.D;
    } else if (this.down) {
      this.locked = KeyboardArrow.U;
    } else if (this.left) {
      this.locked = KeyboardArrow.R;
    } else if (this.right) {
      this.locked = KeyboardArrow.L;
    }
  }
}

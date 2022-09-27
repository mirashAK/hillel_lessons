import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
    templateUrl: './quick.component.html',
    styleUrls: ['./quick.component.css'],
    animations: [
        trigger('simpleFadeAnimation', [
            state('in', style({ opacity: 1 })),
            transition(':enter',  [
                style({ opacity: 0 }),
                animate(400),
            ]),
            transition( ':leave',
                animate(400, style({ opacity: 0 }))
            ),
        ]),
    ],
})
export class QuickComponent  implements OnInit {

    arrLength = 12;

    manPos: number | boolean = false;

    arrayRender: any[] = [];
    idxRender: string[] = [];
    arrayCurrent: any[] = [];

    testArray: number[] = [];

    getRandom(max?: number): number {
        const random = Math.floor(Math.random() * (max || 10));
        return random
    }

    getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }

    sleepPromise(time?: number) {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, (time || 100));
        })
    }

    ngOnInit(): void {

        for (let idx = 0; idx < this.arrLength; idx++) {
            this.testArray.push(this.getRandomIntInclusive(-10, 100));
        }

        this.testArray =[9,-3,5,2,6,8,-6,1,3];

        const sortCallback = (el1: number, el2: number) => {
            return el1 > el2;
        }

        this.idxRender = [];
        this.arrayRender = [];
        this.manPos = 8;
        const resArr = this.quickSort(this.testArray, sortCallback)
        this.idxRender.push(`[ Result: ]`)
        this.arrayRender.push(resArr);

    }

    quickSort(array: number[], callback: (el1: number, el2: number) => boolean): number[] {

        if (array.length <= 1) return array;

        let pos;
        if (this.manPos !==  false) {
            pos = this.manPos;
            this.manPos = false;
        }
        else {
            pos = this.getRandom(array.length -1);
        }

        const el = array[<number>pos];

        let less: number[] = [];
        let equal: number[] = [];
        let more: number[] = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i] <  el) less.push(array[i]);
            if (array[i] ==  el) equal.push(array[i]);
            if (array[i] >  el) more.push(array[i]);
        }

        this.idxRender.push(`[ len: ${array.length}, idx: ${pos}, val: ${el}]`)
        this.arrayRender.push([...less, ...equal, ...more]);

        if (less.length > 1) less = this.quickSort(less, callback);
        if (more.length > 1) more = this.quickSort(more, callback);

        return [...less, ...equal, ...more];
    }





}

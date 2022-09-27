import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
    templateUrl: './merge.component.html',
    styleUrls: ['./merge.component.css'],
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
export class MergeComponent  implements OnInit {

    arrLength = 12;

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

//         for (let idx = 0; idx < this.arrLength; idx++) {
//             this.testArray.push(this.getRandom(100));
//         }
        this.testArray = [29, 72, 98, 13, 87, 66, 52, 51, 36];
        this.testArray =[70, 50, 30, 10, 20, 40, 60, 12];

        const sortCallback = (el1: number, el2: number) => {
            return el1 > el2;
        }

        this.idxRender = [];
        this.arrayRender = [];
        const resArr = this.mergeSort(this.testArray, sortCallback)
        this.idxRender.push(`[ Result: ]`)
        this.arrayRender.push(resArr);

    }

    mergeSort(array: number[], callback: (el1: number, el2: number) => boolean): number[] {

        if (array.length <= 1) return array;

        const half = Math.floor(array.length / 2);

        this.idxRender.push(`[ mergeSort.half: ${half}]`);
        this.arrayRender.push([...array.slice(0, half), '<->' ,...array.slice(half)]);

        let left = this.mergeSort(array.slice(0, half), callback);
        let right = this.mergeSort(array.slice(half), callback);

        return this.merge(left, right);
    }

    merge(left: any[], right: any[]): number[] {

        this.idxRender.push(`[ merge.left <-> merge.right]`);
        this.arrayRender.push([...left, '<->' ,...right]);

        if (left.length == 0 || right.length == 0) {
            return [...left, ... right];
        }

        let mArray: number[] = [];

        while (left.length && right.length) {
            if (left[0] < right[0]) {
                mArray.push(left.shift())
            } else {
                mArray.push(right.shift())
            }
        }

        this.idxRender.push(`[ merge.result: ]`);
        this.arrayRender.push([...mArray, ...left, ...right]);

        return [...mArray, ...left, ...right];

    }

}

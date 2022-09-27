import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.css'],
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
export class SelectionComponent  implements OnInit {

    arrLength = 12;

    arrayRender: any[] = [];
    idxRender: string[] = [];
    arrayCurrent: any[] = [];

    testArray: number[] = [];

    getRandom(max?: number): number {
        const random = Math.floor(Math.random() * (max || 10));
        return random
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

        const sortCallback = (el1: number, el2: number) => {
            return el1 > el2;
        }

        this.selectionSort(this.testArray, sortCallback)
        .then((res)=>{
            //console.log(`res: `, res);
        })

    }

    async selectionSort(array: number[], callback: (el1: number, el2: number) => boolean): Promise<number[]> {

        const sArray = [...array];
        this.arrayRender = [];
        this.idxRender = [];

        let min;

        for (let i = 0; i < array.length; i++) {
            // индех минимального элемента. для начала - текущий
            min = i;

            //ищем в последующих элементах массива наименьшее значение
            for (let j = i + 1; j < array.length; j++) {
                if (sArray[j] < sArray[min]) {
                    min = j;
                }
            }

            //compare the indexes
            if (min !== i) {
                //swap
                //[arr[i], arr[min]] = [arr[min], arr[i]];
                const tmp = sArray[i];
                sArray[i] = sArray[min];
                sArray[min] = tmp;
            }

            this.idxRender.push(`[ ${i}, ${min} ]`);
            this.arrayRender.push([...sArray]);
        }

        return sArray;

    }

}

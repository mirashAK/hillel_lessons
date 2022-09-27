import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
    templateUrl: './insertion.component.html',
    styleUrls: ['./insertion.component.css'],
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
export class InsertionComponent  implements OnInit {

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

        this.testArray = [ 79, 32, 85, 48, 36, 71, 27, 19, 53, 86, 16, 6 ];
        this.testArray = [23, 1, 10, 5, 2];

        const sortCallback = (el1: number, el2: number) => {
            return el1 > el2;
        }

        this.insertionSort(this.testArray, sortCallback)
        .then((res)=>{
            //console.log(`res: `, res);
        })

    }

    async insertionSort(array: number[], callback: (el1: number, el2: number) => boolean): Promise<number[]> {

        const sArray = [...array];
        this.arrayRender = [];
        this.idxRender = [];

        // Старт со второго элемента
        for(let i = 1; i < array.length; i++) {

            // Обход элементов перед текущим
            for(let j = i - 1; j > -1; j--) {

                if (sArray[ j+1 ] <  sArray[ j ]) {

                    const tmp = sArray[j];
                    sArray[j] = sArray[j + 1];
                    sArray[j + 1] = tmp;

                }
            }
            this.idxRender.push(`[ ${i}, ${ i - 1} ]`);
            this.arrayRender.push([...sArray]);

        }

        return sArray;

    }

}

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
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
export class AppComponent  implements OnInit {

    title = 'todo-angular';
    arrLength = 12;

    arrayRender: any[] = [];
    idxRender: string[] = [];
    arrayCurrent: any[] = [];

    testArray: number[] = [];

    ngOnInit(): void {
//         let count = this.arrLength;
//         const interval = setInterval(()=>{
//             if (count-- <= 0) clearInterval(interval);
//             this.add();
//         }, 500)


        for (let idx = 0; idx < this.arrLength; idx++) {
            this.testArray.push(this.getRandom(100));
        }

        this.bubbleSort(this.testArray, ()=>1)
        .then((res)=>{
            //console.log(`res: `, res);
        })

    }

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

    add(): void {
        this.arrayCurrent = [];
        for (let start=0; start < this.arrLength; start++) {
            this.arrayCurrent.push(this.getRandom(100));
        }
        this.arrayRender.push(this.arrayCurrent);
    }

    async bubbleSort(array: number[], callback: (el1?: number, el2?: number) => number): Promise<number[]> {

        const sArray = [...array];
        this.arrayRender = [];
        this.idxRender = [];
        //Outer pass
        for(let i = 0; i < array.length - 1; i++){
            await this.sleepPromise(100);
            //Inner pass
            for(let j = 0; j < array.length - i - 1; j++)
            {
                if (sArray[j] > sArray[j + 1]) {
                    const tmp = sArray[j];
                    sArray[j] = sArray[j + 1];
                    sArray[j + 1] = tmp;
                }
            }
            this.idxRender.push(`[ ${i}, ${array.length - i - 1} ]`);
            this.arrayRender.push([...sArray]);
        }
        return sArray;

    }

}

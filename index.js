import { interval, merge, timer } from 'rxjs'
import { map, scan, skipUntil, takeUntil } from 'rxjs/operators'
const rxjsBtn = document.getElementById('rxjs')
const display1 = document.querySelector('#StreamTask .result1')
const display2 = document.querySelector('#StreamTask .result2')
const display3 = document.querySelector('#StreamTask .result3')
const display4 = document.querySelector('#StreamTask .result4')
let str1 = 'Поток 1: '
let str2 = 'Поток 2: '
let str3 = 'Поток 3: '

rxjsBtn.addEventListener('click', () => {
    rxjsBtn.disabled = true

    const timer1$ = interval(1000).pipe(map(id => ({ id: id + 1, stream: 1 }))),
        timer2$ = interval(1500).pipe(map(id => ({ id: id + 1, stream: 2 }))),
        timer3$ = interval(2000).pipe(map(id => ({ id: id + 1, stream: 3 }))),
        timer4$ = merge(timer1$, timer2$.pipe(skipUntil(timer(10000))), timer3$.pipe(skipUntil(timer(20000)))).pipe(
            takeUntil(timer(30000)),
            scan(({ summ: summAcc = 1 }, { id, stream }) => ({ stream, id, summ: summAcc + id }))
        ).subscribe(({ stream, summ = 1, id }) => {
            switch (stream) {
                case 1:
                    str1 += `${id} `
                    display1.textContent = str1
                    break;
                case 2:
                    str2 += `${id} `
                    display2.textContent = str2
                    break;
                case 3:
                    str3 += `${id} `
                    display3.textContent = str3
                    break;
            }
            display4.textContent = `Сумма: ${summ}`
        })
})

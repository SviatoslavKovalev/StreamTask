import { interval, merge, timer } from 'rxjs'
import { map, scan, skipUntil, takeUntil } from 'rxjs/operators'
const rxjsBtn = document.getElementById('rxjs')
const display1 = document.querySelector('#StreamTask .result1')
const display2 = document.querySelector('#StreamTask .result2')
const display3 = document.querySelector('#StreamTask .result3')
const display4 = document.querySelector('#StreamTask .result4')
const display5 = document.querySelector('#StreamTask .result5')
const display6 = document.querySelector('#StreamTask .result6')
const display7 = document.querySelector('#StreamTask .result7')
let str1 = 'Поток 1: '
let str2 = 'Поток 2: '
let str3 = 'Поток 3: '
let str4 = 'Взято с потока 1: '
let str5 = 'Взято с потока 2: '
let str6 = 'Взято с потока 3: '

rxjsBtn.addEventListener('click', () => {
    rxjsBtn.disabled = true

    const timer1$ = interval(1000).pipe(
        map(id => ({ id: id + 1, stream: 1 })),
        takeUntil(timer(30000)))

    timer1$.subscribe(({ id }) => {
        str1 += `${id} `
        display1.textContent = str1
    })

    const timer2$ = interval(1500).pipe(
        map(id => ({ id: id + 1, stream: 2 })),
        takeUntil(timer(30000)))

    timer2$.subscribe(({ id }) => {
        str2 += `${id} `
        display2.textContent = str2
    })

    const timer3$ = interval(2000).pipe(
        map(id => ({ id: id + 1, stream: 3 })),
        takeUntil(timer(30000)))

    timer3$.subscribe(({ id }) => {
        str3 += `${id} `
        display3.textContent = str3
    })

    const timer4$ = merge(timer1$, timer2$.pipe(skipUntil(timer(10000))), timer3$.pipe(skipUntil(timer(20000)))).pipe(
        takeUntil(timer(30000)),
        scan(({ summ: summAcc = 1 }, { id, stream }) => ({ stream, id, summ: summAcc + id }))
    ).subscribe(({ stream, summ = 1, id }) => {
        switch (stream) {
            case 1:
                str4 += `${id} `
                display4.textContent = str4
                break;
            case 2:
                str5 += `${id} `
                display5.textContent = str5
                break;
            case 3:
                str6 += `${id} `
                display6.textContent = str6
                break;
        }
        display7.textContent = `Сумма: ${summ}`
    })


})

import '@scss/index.scss';
import { PrimaryCondition } from '@ts/calculations/functions/PrimaryCondition'; // is necessary for connecting styles to index.html
import { Range } from '@ts/calculations/util/Range';
import { Core } from '@ts/calculations/Core';
import { FirstFunction } from '@ts/calculations/functions/FirstFunction';
import { EulerMethod } from '@ts/calculations/methods/onestepmethods/EulerMethod';
import { ModifiedEulerMethod } from '@ts/calculations/methods/onestepmethods/ModifiedEulerMethod';
import { RungeKuttaMethod } from '@ts/calculations/methods/onestepmethods/RungeKuttaMethod';
import { AdamsMethod } from '@ts/calculations/methods/multistepmethods/AdamsMethod';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Plotly from 'plotly.js-dist';

const elPrimaryConditionX: HTMLInputElement = document.querySelector('.primary-condition-x') as HTMLInputElement;
const elPrimaryConditionY: HTMLInputElement = document.querySelector('.primary-condition-y') as HTMLInputElement;

const elIntervalStart: HTMLInputElement = document.querySelector('.interval-start') as HTMLInputElement;
const elIntervalEnd: HTMLInputElement = document.querySelector('.interval-end') as HTMLInputElement;

const elAccuracy: HTMLInputElement = document.querySelector('.accuracy') as HTMLInputElement;

const elForm: HTMLFormElement = document.querySelector('.form') as HTMLFormElement;


const elEulerMethodStep: HTMLSpanElement = document.querySelector('.euler-method-step') as HTMLSpanElement;
const elEulerMethodBias: HTMLSpanElement = document.querySelector('.euler-method-bias') as HTMLSpanElement;

const elAdamsMethodStep: HTMLSpanElement = document.querySelector('.adams-method-step') as HTMLSpanElement;
const elAdamsMethodBias: HTMLSpanElement = document.querySelector('.adams-method-bias') as HTMLSpanElement;

if ( ! (
    elPrimaryConditionX
    || elPrimaryConditionY
    || elIntervalStart
    || elIntervalEnd
    || elAccuracy
    || elForm)
) {
    throw new Error('Some element is null');
}


let traceEulerMethodXValues: Array<number> = new Array<number>();
let traceEulerMethodYValues: Array<number> = new Array<number>();

let traceAdamsMethodXValues: Array<number> = new Array<number>();
let traceAdamsMethodYValues: Array<number> = new Array<number>();

let traceeRealFunctionXValues: Array<number> = new Array<number>();
let traceRealFunctionYValues: Array<number> = new Array<number>();


init();



function init(): void {

    elForm.addEventListener('submit', (e) => {
        e.preventDefault();
        main();
    });

}


function main(): void {

    try {
        const core = new Core();
        const firstFunction = new FirstFunction( getPrimaryCondition() );
        const range = getRange();
        const accuracy = getAccuracy();

        const eulerMethod = new EulerMethod();
        const modifiedEulerMethod = new ModifiedEulerMethod();
        const rungeKuttaMethod = new RungeKuttaMethod();

        const adamsMethod = new AdamsMethod();

        const eulerMethodResult = core.calc(firstFunction, range, eulerMethod, accuracy, 5);

        const adamsMethodResult = core.calc(firstFunction, range, adamsMethod, accuracy, 5);

        // console.log('eulerMethodResult = ', eulerMethodResult);
        // console.log('adamsMethodResult = ', adamsMethodResult);
        traceEulerMethodXValues = eulerMethodResult.table.getXValues();
        traceEulerMethodYValues = eulerMethodResult.table.getYValues();

        traceAdamsMethodXValues = adamsMethodResult.table.getXValues();
        traceAdamsMethodYValues = adamsMethodResult.table.getYValues();


        const offset = 0.2;

        traceeRealFunctionXValues = new Array<number>();
        traceRealFunctionYValues = new Array<number>();
        for ( let x = range.start - offset; x < range.end + offset; x += eulerMethodResult.step ) {
            traceeRealFunctionXValues.push( x );
            traceRealFunctionYValues.push( firstFunction.func(x) );
        }


        const traceEulerMethod = {
            x: traceEulerMethodXValues,
            y: traceEulerMethodYValues,
            mode: 'lines',
            type: 'scatter',
            name: 'Метод Эйлера.'
        };

        const traceAdamsMethod = {
            x: traceAdamsMethodXValues,
            y: traceAdamsMethodYValues,
            mode: 'lines',
            type: 'scatter',
            name: 'Метод Адамса.'
        };


        const layout = {
            title: 'Решение ОДУ',
            // autosize: false,
            // width: 500,
            // height: 500,
            xaxis: {
                title: {
                    text: 'x'
                }
            },
            yaxis: {
                title: {
                    text: 'F(x)'
                }
            }
        };

        const options = {
            scrollZoom: true,
            displayModeBar: false,
            responsive: true
        };


        const traceRealFunction = {
            x: traceeRealFunctionXValues,
            y: traceRealFunctionYValues,
            mode: 'lines',
            type: 'scatter',
            name: 'Точное решение'
        };

        const data = [traceEulerMethod, traceAdamsMethod, traceRealFunction];
        Plotly.newPlot(document.querySelector('.plot'), data, layout, options);



        setEulerMethodStep( eulerMethodResult.step);
        setEulerMethodBias( eulerMethodResult.bias);
        setAdamsMethodStep( adamsMethodResult.step);
        setAdamsMethodBias( adamsMethodResult.bias);


    } catch (e) {
        showNotification(e);
    }
}





function getPrimaryCondition(): PrimaryCondition {
    return new PrimaryCondition(parseFloat(elPrimaryConditionX.value), parseFloat(elPrimaryConditionY.value));
}

function getRange(): Range {
    return new Range(parseFloat(elIntervalStart.value), parseFloat(elIntervalEnd.value));
}

function getAccuracy(): number {
    return parseFloat(elAccuracy.value);
}


function showNotification(content: string): void {
    // todo show notification
    alert(content); // del
}

function setEulerMethodStep(step: any): void {
    elEulerMethodStep.innerText = step;
}

function setEulerMethodBias(bias: any): void {
    elEulerMethodBias.innerText = bias;
}

function setAdamsMethodStep(step: any): void {
    elAdamsMethodStep.innerText = step;
}

function setAdamsMethodBias(bias: any): void {
    elAdamsMethodBias.innerText = bias;
}
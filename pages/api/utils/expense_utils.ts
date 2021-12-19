import {getDateString} from "./date_utils";
import moment from "moment";
import {Expense} from "../../../Definitions/Expense";
export function sortfunction(a:Expense,b:Expense){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};
export const sumAllExpenses = (previousValue:number, currentValue:Expense) => previousValue + currentValue.price;

export function getSortedExpenses(expenses:Expense[]){

    let sortedExpenses:any={};
    if(!expenses){
        return sortedExpenses;
    }
    if (expenses.length > 0) {
        expenses = expenses.sort(sortfunction);
        console.log(expenses[0].date);
        let currentDate:string = getDateString(expenses[0].date);
        sortedExpenses[currentDate] = [];
        expenses.forEach(expense => {
            if (getDateString(expense.date) !== currentDate) {
                currentDate = getDateString(expense.date);
                sortedExpenses[currentDate] = [];
            }
            sortedExpenses[currentDate].push(expense);
        })
        return sortedExpenses;
    }
    return sortedExpenses;
}

export const  baseSettings = {
    "maxAcceptableRange": {
        type: "number",
        id: "maxAcceptableRange",
        value: 150,
        label: "Max Value"
    },
    "deleteMode": {
        type: "checkbox",
        id: "deleteMode",
        value: false,
        label: "Delete Mode?"
    }
};

export function getDayWiseExpenses(sortedExpenses:any){
    let dayWiseExpenses:any = [];
    Object.entries(sortedExpenses).forEach(function ([date,expenses]:[date:any,expenses:any], index){
        dayWiseExpenses[index] = {date:getDateString(date), expense: expenses.reduce(sumAllExpenses,0)}
    });
    return dayWiseExpenses;
}

export function getWeekWiseExpenses(sortedExpenses:any){

    const moment = require('moment');

    let tempWeekWiseExpenses:any = {};


    getDayWiseExpenses(sortedExpenses).forEach(({date, expense}:{date:Date, expense:number})=>{
        if(!tempWeekWiseExpenses[moment(date).week()]) tempWeekWiseExpenses[moment(date).week()] = 0;
        tempWeekWiseExpenses[moment(date).week()] += expense;
    })

    let weekWiseExpenses:any = [];

    Object.entries(tempWeekWiseExpenses).forEach(([week, expense], index)=>{
        weekWiseExpenses[index] = {date:week, expense:expense};
    })

    return weekWiseExpenses;
}

export function getMonthWiseExpenses(sortedExpenses:any){
    const moment = require('moment');

    let tempMonthWiseExpenses:any = {};


    getDayWiseExpenses(sortedExpenses).forEach(({date, expense}:{date:Date, expense:number})=>{
        if(!tempMonthWiseExpenses[moment(date).month()]) tempMonthWiseExpenses[moment(date).month()] = 0;
        tempMonthWiseExpenses[moment(date).month()] += expense;
    })

    let monthWiseExpenses:any = [];
    Object.entries(tempMonthWiseExpenses).forEach(([month, expense], index)=>{
        monthWiseExpenses[index] = {date:month, expense:expense};
    })

   return monthWiseExpenses;


}

export function getHello(){
    return "Yellow";
}
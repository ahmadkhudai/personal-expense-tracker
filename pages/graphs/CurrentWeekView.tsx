// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    getCurrentWeeksExpenses,
    getSortedExpenses
} from "../api/utils/expense_utils";
import {Expense} from "../../Definitions/Expense";
import {Area, CartesianGrid, Tooltip, XAxis, YAxis,ComposedChart, Line} from 'recharts';
import {SettingsObj} from "../../Definitions/SettingsObj";
import exp from "constants";

type Props = {
    expenses:any;
};
type State = {};

export function CurrentWeekView({expenses}:Props) {


    const [displayData, setDisplayData] = useState([] as Expense[]);
    const [graphWidth, setGraphWidth] = useState(500);


    useEffect(() => {
        setDisplayData(expenses);
        // setDisplayData(getCurrentWeeksExpenses(getSortedExpenses(expenses)));
        // window.onresize = ()=>{
            setGraphWidth(window.innerWidth<700?(0.8*window.innerWidth):500);

        // }
    }, []);


    useEffect(() => {
        setDisplayData(expenses);
            // setDisplayData(getCurrentWeeksExpenses(getSortedExpenses(expenses)));
    }, [expenses]);




    // if(displayData.length<=1){
    //     return (
    //         <NoData customMessage={Messages.NotEnoughData} />
    //     )
    // }

    return (
        <div className={"container flex flex-column flex-xl-row align-items-center  bg-white/10"}>
            {displayData.length > 1 &&
                <div
                    className="ak_max_600px bg-transparent border-0 container py-2 px-3 card my-4 flex justify-content-center align-items-center px-1 mx-1">

                    <ComposedChart className={"py-2 px-2"} width={graphWidth} height={graphWidth}
                                   data={displayData} margin={{top: 25, right: 30, left: 40, bottom: 1}}>

                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#8454ff" stopOpacity={0.9}/>
                                <stop offset="85%" stopColor="#23ffd0" stopOpacity={0.3}/>
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="date" axisLine={false} reversed={true} height={30}/>
                        <CartesianGrid vertical={false} opacity={0.4}/>
                        <YAxis width={10} axisLine={false}/>
                        <Tooltip/>

                        <Line type="monotone" strokeLinecap="round" strokeWidth={2}
                              style={{strokeDasharray: `40% 60%`}}
                              dataKey="date"
                              name={"Day"}
                              stroke="#932bfa"
                              dot={false}
                              legendType="none"
                        />
                        <Line type="monotone" strokeLinecap="round" strokeWidth={2}
                              style={{strokeDasharray: `0 60% 40%`}}

                              stroke="#7A58BF"
                              name={"Money Spent"}
                              dot={false}
                              legendType="none"
                        />
                        <Area type="monotone"
                              name={"Money Spent"} dataKey="expense" strokeWidth={2} fillOpacity={1}
                              fill="url(#colorUv)"/>
                    </ComposedChart>


                </div>
            }
            {/*<div  className={" py-3 my-3 bg-gray-200/30 rounded current-expenses gradient ak_max_600px"}>*/}
            {/*    <p className={"text-center  font-monospace font-bold p-1 h5"}>Your Expenses This Week</p>*/}
            {/*    <div className={"p-4 scrollable  rounded"} style={{"height":"300px", "overflowY":"scroll", overflowX:"hidden", msScrollbarArrowColor:"transparent" ,"scrollbarWidth":"thin"}}>*/}
            {/*        <DateSortedView expenses={getRenderableCurrentWeeksExpenses(sortedExpenses)}  />*/}
            {/*    </div>*/}
            {/*</div>*/}


        </div>
    );
}

export default CurrentWeekView;
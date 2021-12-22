// @flow
import * as React from 'react';
import {Expense} from "../../../Definitions/Expense";
import {SettingLabels} from "../../../Definitions/Setting";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {baseSettings} from "../../api/utils/expense_utils";
import moment from "moment";
import {useState} from "react";

type Props = {
 expense:Expense;
 settings?:SettingsObj;
 deleteExpense?:any;
};
type State = {

};

export function ExpenseComponent(props: Props) {
    let expense = props.expense;
    let onclickHandler: any = (expense: Expense) => {
        props.deleteExpense(expense);
    };
    if (!props.deleteExpense) {
        onclickHandler = null;
    }
    let settings: any = props.settings || baseSettings;
    const [desc, setDesc] = useState(false);
    return (
        <div className=" py-1 rounded font-monospace my-1 rounded" onClick={(e)=>{e.stopPropagation();setDesc(!desc)}} onMouseEnter={()=>{setDesc(true)}} onMouseLeave={()=>{setDesc(false)}}>
            <ul className="bg-white p-3 justify-content-between border-0 m-2 p-1 flex items-center rounded-2">
                <li className="list-group-item border-0  ak_black"
                    style={expense.price > settings[SettingLabels.maxAcceptableRange].value ? {
                        color: "#bb0a0a",
                        "fontWeight": "normal"
                    } : {}}>{expense.price}</li>
                <li className="list-group-item border-0 flex-fill">{expense.name}</li>
                <li className="list-group-item border-0">{moment(expense.date).format("hh:mm A")}</li>

                <li className="list-group-item p-1 m-0 border-0">
                    <button
                        className="m-0 btn w-100 h-100  btn-danger hover:font-bold hover:bg-teal-400 hover:border-teal-300"
                        style={
                            onclickHandler ? (settings[SettingLabels.deleteMode].value ? {} : {"display": "none"}) : {"display": "none"}}
                        onClick={() => onclickHandler(expense)
                        }>X
                    </button>
                </li>
            </ul>
            {desc && expense.description.length>0 && <div className={"p-3 mx-2 px-3 bg-white/60 ak_slow_transition mb-0 rounded-3"}><p>{expense.description}</p></div>}

        </div>
    );
};

export default ExpenseComponent;
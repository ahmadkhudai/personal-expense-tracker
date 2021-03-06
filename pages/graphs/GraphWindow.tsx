// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {GraphPanels} from "../../libs/component_config/graphs/GraphPanels";
import HomeFooter from "../components/HomeFooter";
import {Expense} from "../../Definitions/Expense";
import NoData from "../components/_partials/NoData";
import {baseSettings, sortfunction} from "../../libs/utils/expense/grouping";
import {SettingsObj} from "../../Definitions/SettingsObj";
import {dumdumData} from "../../libs/dummy_data/data";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import {MainWindows} from "../../libs/component_config/MainWindows";
import GroupedNewGraph from "./GroupedNewGraph";



type Props = {
    switchWindow: any;
};
type State = {};

export default function GraphWindow({switchWindow}: Props) {
    let loadedExpenses: Expense[] = [];
    let loadedSettings: SettingsObj = baseSettings;
    const [expenses, setExpenses] = useState(loadedExpenses);
    const [settings, setSettings] = useState(loadedSettings);
    useEffect(() => {
        modifyExpenses(JSON.parse(localStorage.getItem("ak_expenses") as string) || dumdumData);
        modifySettings(JSON.parse(localStorage.getItem("ak_settings") as string) || baseSettings);
    }, []);


    function modifyExpenses(modifiedExpenses: Expense[]) {
        modifiedExpenses = modifiedExpenses.sort(sortfunction);
        setExpenses(modifiedExpenses);
        localStorage.setItem("ak_expenses", JSON.stringify(modifiedExpenses));
    }

    function modifySettings(modifiedSettings: SettingsObj) {
        setSettings(modifiedSettings);
        localStorage.setItem("ak_settings", JSON.stringify(modifiedSettings));
    }


    const [openedPanel, setOpenPanel] = useState(GraphPanels.grouped);

    function openPanel(panel: GraphPanels) {
        if (openedPanel == panel) {
            setOpenPanel(GraphPanels.none);
        } else {
            setOpenPanel(panel);
        }
    }


    return (
        <div className={"flex flex-column items-center"}>
            <HomeHeader switchWindow={switchWindow} currentlyOpenWindow={MainWindows.graphs}/>
            <div className={"container  w-full h-full ak_max_600px"}>
            {expenses.length == 0 && <NoData/>}
            {expenses.length > 0 &&
                <div>
                    <HomeFooter openHomePanelFunc={()=>{switchWindow(MainWindows.home)}}/>



                        {openedPanel === GraphPanels.grouped &&
                           <>
                                <GroupedNewGraph expenses={expenses}/>

                                {/*<GroupedExpensesGraph expenses={expenses}/>*/}
                            </>
                        }




                </div>}
            </div>
        </div>

    );
}

// @flow
import * as React from 'react';
import {useState} from 'react';
import {OptionsPanels} from "../../../libs/component_config/Main/OptionsPanels";
import {MainWindows} from "../../../libs/component_config/MainWindows";
import OutlineRoundedButton from "../buttons/OutlineRoundedButton";
import Image from 'next/image';
import settingsIcon from '../../../assets/icons8-setting-64.png';
import updownIcon from '../../../assets/updown.png';
import trendStat from '../../../assets/trend_station.png';
import trendGif from '../../../assets/trend.gif';
import LabelPurple from "../labels/LabelPurple";
import HoverGif from "../hoverables/HoverGif";
import {Quota} from "../../../Definitions/Quota";
import {SettingsObj} from "../../../Definitions/SettingsObj";

type Props = {
    settings?: SettingsObj;
    quota?: Quota;
    openPanel?: any;
    switchWindow: any;
    currentlyOpenWindow?: MainWindows;
};
type State = {};

export default function HomeHeader(props: Props) {
    const {openPanel, switchWindow, currentlyOpenWindow, settings} = props;

    const [currentWindow, setCurrentWindow] = useState(currentlyOpenWindow || MainWindows.home);

    // const selectedButtonClasses= "btn-dark text-white";

    function goTo(window: MainWindows) {
        switchWindow(window);
        setCurrentWindow(window);
    }

    const [focused, setFocused] = React.useState(false)
    const onFocus = () => {
        setFocused(true);
    }


    const onBlur = () => setFocused(false)

    return (
        <nav onMouseEnter={onFocus} onMouseLeave={onBlur} onFocus={onFocus} onBlur={onBlur}
             className="fixed_header bg-white navbar position-sticky top-0 navbar-expand navbar-light shadow-sm w-100 flex justify-center py-0">
            <div className=" flex align-items-center justify-content-between w-100 ak_max_600px px-2 unselectable">

                {/*{currentWindow === MainWindows.home && }*/}

                <div className={"w-100 flex align-items-center justify-content-between py-2 w-75"}>
                    {currentWindow === MainWindows.home &&
                        // <div className={"w-100 flex align-items-center justify-content-center py-2"}>
                        <div className={"flex align-items-center justify-content-between w-100"}>
                            <p className={" sm:hidden md:visible text-center w-auto text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-600 text-3xl px-3"}>Expense
                                Tracker</p>
                            <div className={"flex justify-content-between w-auto"}>
                                <OutlineRoundedButton
                                    styleClasses="btn mx-2 hover:font-thin   ak_slow_transition  p-1  hover:ring-purple-700 hover:ring  flex align-items-center justify-between "
                                    onClick={() => {
                                        openPanel(OptionsPanels.DownloadUploadForm)
                                    }}>
                                    {/*<FontAwesomeIcon   icon={["far", "sliders-h"]} />*/}
                                    <Image height={30} width={30} src={updownIcon}/>
                                    {/*<p className={"text-center w-75 px-2"}>Settings</p>*/}

                                </OutlineRoundedButton>

                                <OutlineRoundedButton
                                    styleClasses="btn mx-2  hover:font-thin  ak_slow_transition  py-0 px-0  hover:bg-purple-700  flex align-items-center justify-between "
                                    onClick={() => {
                                        openPanel(OptionsPanels.SettingsPanel)
                                    }}>
                                    {/*<FontAwesomeIcon   icon={["far", "sliders-h"]} />*/}
                                    <Image height={40} width={40} src={settingsIcon}/>
                                    {/*<p className={"text-center w-75 px-2"}>Settings</p>*/}

                                </OutlineRoundedButton>
                            </div>


                        </div>

                    }

                    {currentWindow !== MainWindows.home &&
                        <OutlineRoundedButton
                            styleClasses={"btn bg-teal-400 text-white hover:bg-purple-500  hover:font-black  mr-3 w-75"}
                            onClick={() => {
                                goTo(MainWindows.home)
                            }}>home</OutlineRoundedButton>
                    }
                    {currentWindow === MainWindows.graphs &&
                        <LabelPurple styleClasses={"h3 py-0"}>/trends</LabelPurple>}
                    {currentWindow !== MainWindows.graphs &&
                        <button className="btn mx-2 bg-white px-0 mx-0 py-0 my-0 pt-1" onClick={() => {
                            goTo(MainWindows.graphs)
                        }}><HoverGif focused={focused} stationaryImage={trendStat} gifImage={trendGif}/>
                        </button>

                    }

                </div>

                {/*<button className="w-50 btn hover:bg-teal-400 text-white bg-purple-500 hover:font-black " onClick={()=>{openPanel(OptionsPanels.AddExpensePanel)}}>add +</button>*/}


            </div>


        </nav>
    );
};

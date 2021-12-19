// @flow
import * as React from 'react';
import {SettingLabels} from "../../../Definitions/Setting";
import {SettingsObj} from "../../../Definitions/SettingsObj";
import {useDispatch, useSelector} from "react-redux";
import {modifySettings} from "../../api/features/settings/settingsSlice";

let useState = React.useState;
// import  from "react";

type Props = {



};
type State = {};

export default function AK_SettingsPanel() {
    // let {settings, updateSettings} = props;
    const settings:SettingsObj = useSelector((state: any) => state.settings.value);
    // console.log(settings);
    const dispatch = useDispatch()
    // console.log(settings);
    let visibilityStyle = {};

    const [newSettings, setNewSettings] = useState(settings);

    // console.log(newSettings);

    function handleSettingsChange(fieldName: SettingLabels, fieldValue: any) {
        // let nSettings = {...newSettings};
        // let testSettins = {...settings1};
        // // testSettins["deleteMode"].value = true;
        console.log("YES", {
            ...settings, ...{
                [fieldName]: {
                    ...settings[fieldName], ...{
                        value: fieldValue
                    }
                }
            }
        })
        let newSettingsState =  {
            ...settings, ...{
                [fieldName]: {
                    ...settings[fieldName], ...{
                        value: fieldValue
                    }
                }
            }
        };
        dispatch(modifySettings(newSettingsState));

    }


    return (
        <div className={"container ak_max_600px text-center ak_card"} id={"settingsPanel"} style={visibilityStyle}>
            <h3>Settings</h3>
            <div className={"grid "}>

                {Object.values(settings).map(setting => {

                    console.log(setting);
                    return (
                        <div className={"m-2 flex align-items-center justify-content-between"} key={setting.label}>
                            <label className="col-form-label p-2"
                                   htmlFor={setting.label}>{setting.name}</label>
                            {setting.type === "number" &&
                                <input type="number" name={setting.label} id={setting.label} value={setting.value}
                                       className="form-control flex-1"
                                       onChange={(e) => handleSettingsChange(setting.label, e.target.value)}/>
                            }


                            {setting.type === "text" &&
                                <input type="text" name={setting.label} id={setting.label} value={setting.value}
                                       className="form-control"
                                       onChange={(e) => handleSettingsChange(setting.label, e.target.value)}/>
                            }

                            {setting.type === "date" &&
                                <input type="date" name={setting.label} id={setting.label} value={setting.value}
                                       className="form-control"
                                       onChange={(e) => handleSettingsChange(setting.label, e.target.value)}/>
                            }


                            {setting.type === "checkbox" &&
                                <div className="d-inline-block flex items-center justify-content-center">
                                    <div className="toggle colour">
                                        <input id="check3" className="toggle-checkbox hidden" type="checkbox"
                                               checked={setting.value}
                                               onChange={(e) => handleSettingsChange(setting.label, !setting.value)}/>
                                        <label htmlFor="check3"
                                               className="toggle-label block w-12 h-6 rounded-full transition-color duration-150 ease-out"></label>
                                    </div>
                                </div>

                            }
                        </div>
                    );

                })}


            </div>
            {/*<button onClick={() => {*/}
            {/*    // updateSettings(newSettings)*/}
            {/*}} className="btn btn-outline-dark w-full">Save*/}
            {/*</button>*/}
        </div>
    );
}
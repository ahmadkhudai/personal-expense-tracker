// @flow
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import moment from "moment";
import {Day, getSubtractableDays} from "../../constants/day";
import PurpleButton from "../components/buttons/PurpleButton";
import TealButton from "../components/buttons/TealButton";
import LabelPurple from "../components/labels/LabelPurple";
import {startsWithSpace} from "../api/utils/string_utils";
import RedButton from "../components/buttons/RedButton";
import NewExpenseContainer from "../components/modals/currentExpense/NewExpenseContainer";
import {addDaysPreserveTime, concat} from "../api/utils/date_utils";
import NewExpenseView from "./_components/NewExpenseView";
import LargeFormDisplay from "./_components/FormCenteredDisplay";
import newExpenseView from "./_components/NewExpenseView";

//
// let itemsList = ["chai", "Shwarma", "Steak Burger", "GB Ginger Special"];

type Props = {
    addNewExpense: any;
    handleClose: any;
};
type State = {};

export function AddExpenseForm({addNewExpense, handleClose}: Props) {


    const [currentlySelectedDate, setCurrentlySelectedDate] = useState(new Date());
    const [expenseName, setExpenseName] = useState("chai");
    const defaultExpense = {
        name: "chai",
        price: 30,
        description: "chai from cafe",
        location:"cafe",
        date: currentlySelectedDate
    };
    const [newExpense, setNewExpense] = useState(defaultExpense);


    useEffect(() => {
       handleFieldChange("description", newExpense.price + " spent on " + newExpense.name + " from " + newExpense.location)
    }, [newExpense.name, newExpense.price, newExpense.location]);


    function handleFieldChange(fieldName: string, fieldValue: any) {

        // if(fieldValue)
        let tempObj: any = {...newExpense};

        tempObj[fieldName] = fieldValue;
        if (fieldName === "date") {
            setCurrentlySelectedDate(fieldValue);
        }
        setNewExpense(tempObj);
    }


    enum dateSelectors {
        "none" = "none",
        "thisWeek" = "thisWeek",
        "custom" = "custom"
    }

    const [dateSelector, setDateSelector] = useState(dateSelectors.none);

    // const [weekSelector, setWeekSelector] = useState(false);

    function openSelector(selector: dateSelectors) {
        if (dateSelector === selector) {
            setDateSelector(dateSelectors.none);
        } else {
            setDateSelector(selector);
        }

    }


    const [lastCreatedExpense, setLastExpense] = useState({} as any);


    const [expenseAdded, setExpenseAdded] = useState(false);
    const [descriptionModified, setDescriptionModified] = useState(false);
    const [showCurrentExpense, setShowCurrentExpense] = useState(false);

    function dontShowCurrentExpense() {
        setShowCurrentExpense(false);
    }

    function handleAddExpense() {
        //todo allow user to chose if they want to edit the expense before adding it
        setLastExpense({...newExpense});
        addNewExpense(newExpense);
        setExpenseAdded(true);
        setNewExpense(defaultExpense);

        // document.getElementById("add_expense_form")?.focus();
    }

    function resetState() {
        setExpenseAdded(false);
        setLastExpense(newExpense);
        setShowCurrentExpense(false);
        // scrollToTop();
    }

    const myRef = useRef(null)

    //@ts-ignore
    const executeScroll = () => myRef.current.scrollIntoView()


    function toggleShowCurrentExpense() {
        setShowCurrentExpense(!showCurrentExpense);
    }

    return (

        <div className={"  ak_max_600px wrapper wrapper_inner scrollable w-100"}>


            <div className={"fixed_header w-100"}>
                <div
                    className="w-100 flex h-100 ak_max_600px justify-content-between align-items-center shadow   bg-white/95 p-2 px-3 w-100 rounded-[10px] rounded-tl-0">
                    <p className={" text-xl text-teal-700 hover:text-purple-700 w-75"}>Add Expense</p>


                    <RedButton styleClasses={"    text-sm  rounded-pill     "} text={"cancel"}
                               onClick={() => {
                                   handleClose()
                               }}/>


                    {/*</div>*/}

                </div>

            </div>
            {expenseAdded &&
                <NewExpenseContainer handleClose={() => {
                }}>
                    <div
                        className={"w-100 ak_max_600px   flex flex-column align-items-center  bg-gradient-to-l from-gray-100   via-teal-50  to-purple-100 h-100 p-4 rounded-[20px] "}
                        style={{"zIndex": "1000"}}>
                        <div className={"w-100 flex flex-column py-4 bg-white p-3 rounded-[10px] shadow-sm"}>
                            <LabelPurple text={"Expense Added!"} styleClasses={" h1 text-4xl"}/>
                            <PurpleButton styleClasses={" p-2 my-1 rounded-full"} text={"add more!"} onClick={() => {
                                executeScroll();
                                resetState();
                            }}/>


                        </div>
                        <NewExpenseView
                            expenses={[{...lastCreatedExpense, id: "1", date: newExpense.date.toString()}]}/>

                        <TealButton styleClasses={"  my-2 py-2 text-3xl rounded-full w-75"} text={"home"}
                                    onClick={() => {
                                        handleClose()
                                    }}/>

                        {/*<Expense expense={lastCreatedExpense}/>*/}
                    </div>
                </NewExpenseContainer>

            }

            <div className={"h-[5rem]  w-100 py-4"} ref={myRef}></div>
            <div className={"  shadow-sm"}>
                <div id={"add_expense_form h-100  "}
                     className={"  flex flex-column bg-white/90 hover:bg-white ak_slow_transition p-3 "}
                     style={{"marginBottom": "4rem"}}

                >


                    <div id="expense_form" className="pt-3 ">

                        <div className="form-group hover:font-bold ak_slow_transition">
                            <LargeFormDisplay  text={newExpense.price.toString() + " spent"} styleClasses={"p-2 text-center font-thin text-3xl unselectable"}/>
                            <label htmlFor="amountSpent" className="text-xl text-teal-700 hover:text-purple-700">Amount
                                Spent</label>
                            <div className="">
                                <input type="number"
                                       min={0}
                                       className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                       id="amountSpent" placeholder="30"
                                       value={newExpense.price} onChange={(e) => {
                                    handleFieldChange("price", e.target.value)
                                }}/>
                            </div>
                        </div>
                        <div className="form-group  hover:font-bold ak_slow_transition">
                            <LargeFormDisplay  text={(newExpense.name)+ " from "+ newExpense.location} styleClasses={"p-2 text-center text-2xl font-normal unselectable"}/>

                            <div className="">
                                <label htmlFor="name" className="  p-2 text-teal-700 hover:text-purple-700 text-lg">spent on</label>
                                <input type="text"
                                       className="form-control border-0 mb-0  hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                       id="name" placeholder="Chai"
                                       value={newExpense.name} onChange={e => {
                                    // setExpenseName(e.target.value);
                                    handleFieldChange("name", e.target.value)
                                }}/>
                                <label htmlFor="location" className=" p-2 text-teal-700 hover:text-purple-700 text-lg">from</label>

                                <input type="text"
                                       className="form-control border-0   hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                       id="location" placeholder="location"
                                       value={newExpense.location} onChange={e => {
                                    handleFieldChange("location", e.target.value)
                                }}/>
                            </div>
                        </div>



                        <div className={"py-3"}>

                            <LargeFormDisplay text={Day[(moment(newExpense.date).day())] + " " + (moment(newExpense.date).date())}/>
                           {dateSelector !== dateSelectors.custom &&
                                <div>
                                    <div className={"flex justify-content-between pb-3"}>

                                        <div className={" flex flex-column justify-content-between "}>
                                            <button className={"my-1 mx-2  btn bg-teal-400 text-white"}
                                                    onClick={() => {
                                                        handleFieldChange("date", addDaysPreserveTime(new Date(), 0, newExpense.date))
                                                    }}>today
                                            </button>
                                            <button
                                                className={"my-1 mx-2 btn border-teal-500 hover:bg-teal-400 hover:text-white"}
                                                onClick={() => {
                                                    handleFieldChange("date", addDaysPreserveTime(new Date(), -1, newExpense.date))
                                                }}>yesterday
                                            </button>
                                            <button
                                                className={"my-1 mx-2 btn bg-purple-500 hover:font-bold hover:bg-teal-400 text-white"}
                                                onClick={() => {
                                                    openSelector(dateSelectors.thisWeek)
                                                }}>this week
                                            </button>
                                            <button
                                                className={"my-1 mx-2  btn border-black hover:bg-black hover:text-white"}
                                                onClick={() => {
                                                    openSelector(dateSelectors.custom)
                                                }}>specific date
                                            </button>
                                        </div>
                                        <div className={"text-center"}>

                                        </div>

                                        {dateSelector === dateSelectors.thisWeek &&
                                            <div
                                                className={"flex flex-column overflow-x-scroll align-items-center justify-content-between scrollable px-3 "}>
                                                {getSubtractableDays(moment(new Date()).weekday()).map
                                                (
                                                    day => {

                                                        return <button key={day}
                                                                       className={"btn bg-purple-400 hover:font-bold hover:bg-teal-400 text-white my-1 w-100"}
                                                                       onClick={() => {
                                                                           handleFieldChange("date", addDaysPreserveTime(new Date(), -day, newExpense.date));
                                                                       }}>{Day[moment(new Date()).weekday() - day]}</button>

                                                    })
                                                }

                                            </div>}

                                    </div>
                                </div>
                            }

                            {dateSelector === dateSelectors.custom &&
                                <div className={" flex flex-column"}>
                                    <button
                                        className={"btn border-purple-500 hover:bg-purple-500 hover:text-white hover:font-bold"}
                                        onClick={() => {
                                            openSelector(dateSelectors.none)
                                        }}>simple menu
                                    </button>

                                    <div className="form-group hover:font-bold py-2 my-2">

                                        <label htmlFor="Date"
                                               className="text-teal-700 hover:text-purple-700 h3 hidden">Date</label>
                                        <div className="">
                                            <input type="datetime-local"
                                                   className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                                   id="Date"
                                                   value={moment(new Date(newExpense.date)).format("YYYY-MM-DDTHH:mm")}
                                                   onChange={(e) => {
                                                       if ((e.target.value) !== "") {
                                                           handleFieldChange("date", new Date(e.target.value));
                                                       }
                                                   }}/>
                                        </div>
                                    </div>
                                </div>


                            }
                            <h2 className={"p-2 text-center h2 text-teal-700 hover:text-purple-700"}>{(moment(newExpense.date).format("hh:mm a"))}</h2>

                            <div className="form-group hover:font-bold mt-2">
                                <label htmlFor="Time"
                                       className="text-teal-700 hover:text-purple-700 h3 hidden">Time</label>
                                <div className="">
                                    <input type="time"
                                           className="form-control border-0 hover:bg-purple-500 hover:text-white hover:font-bold hover:text-[1.3rem]"
                                           id="Time" value={moment(newExpense.date).format("HH:mm")}
                                           onChange={(e) => {
                                               if ((e.target.value) !== "") {
                                                   handleFieldChange("date", new Date(concat(newExpense.date, e.target.value)));
                                               }
                                           }}/>
                                </div>


                            </div>
                            <div className={"w-100 flex justify-content-center py-3"}>
                                <TealButton
                                    styleClasses={"ak_max_600mx w-75   text-white text-xl  rounded-full"}
                                    text={showCurrentExpense ? "keep editing" : "done!"}
                                    onClick={() => toggleShowCurrentExpense()}

                                />
                            </div>


                        </div>


                    </div>
                    <div className={" ak_footer_low_z bg-white/80 w-100 flex justify-content-center h-auto shadow-lg "}>
                        <div className="form-group flex justify-content-around  w-75   ak_max_600px py-2  m-0">

                            <PurpleButton
                                styleClasses={"ak_max_600mx w-50   text-white text-xl  rounded-full"}
                                text={"quick add"}
                                onClick={() => handleAddExpense()}

                            />
                        </div>
                    </div>

                </div>

                {showCurrentExpense &&

                    <NewExpenseContainer handleClose={() => {
                        dontShowCurrentExpense()
                    }}
                    >
                        <div className="  bg-gradient-to-r from-teal-100/90 via-purple-100 to-purple-200  rounded-[10px]  shadow-sm p-2 form-group position-sticky bottom-0 px-0 pb-0 flex flex-column align-items-end w-100">

                            <div className={"w-100 flex flex-column align-items-center pb-3"}>
                                {/*@ts-ignore*/}
                                <NewExpenseView expenses={[{
                                    ...newExpense,
                                    id: "1",
                                    date: newExpense.date.toString()
                                }]}/>
                                <div className={"flex w-100 align-items-center justify-content-center "}>
                                    <PurpleButton styleClasses={" rounded-full py-1 w-auto"} text={"keep editing"}
                                                  onClick={() => {
                                                      dontShowCurrentExpense()
                                                  }}/>

                                    <TealButton styleClasses={" d-block w-50 rounded-full  text-white  text-xl m-1 "}
                                                text={"create!"}
                                                onClick={() => {
                                                    handleAddExpense();
                                                }}/>

                                </div>
                            </div>
                        </div>
                    </NewExpenseContainer>
                }

            </div>


        </div>
    )
}

export default AddExpenseForm;
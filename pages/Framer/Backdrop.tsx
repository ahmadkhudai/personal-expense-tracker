// @flow
// @flow
import { motion } from 'framer-motion';
import * as React from 'react';
import {useEffect, useState} from "react";
import exp from "constants";
import {randomIntFromInterval} from "../api/utils/date_utils";

type Props = {
    children:any;
    onClick:any;
    styleClasses?:any;
    blurBackdrop?:boolean;
};
type State = {};

export function Backdrop({children, onClick, styleClasses="", blurBackdrop}:Props) {
    // const [height, setHeight] = useState();


    //
    // useEffect(() => {
    //     setAllStates();
    //     return () => {
    //         setHeight((window.innerHeight+window.scrollY+100)+"px");
    //     };
    // }, []);
    //
    // const setAllStates = () => {
    //     window.onresize = ()=>setHeight((window.innerHeight+window.scrollY)+"px");
    //     window.onscroll = ()=>setHeight((window.innerHeight+window.scrollY)+"px");
    // }
    return (
       <motion.div
           id={"backdrop"}
           className={randomIntFromInterval(1,100)<50?"bg-teal-200/20":"bg-purple-400/20"}
           // className={" "+styleClasses}
           onClick={onClick}
           initial={{opacity:0}}
           animate={{opacity:1}}
           exit={{opacity:0}}
           style={{ height: "100%",
               width: "100%"}}
       >
           {children}
       </motion.div>
    );
};

export default Backdrop;
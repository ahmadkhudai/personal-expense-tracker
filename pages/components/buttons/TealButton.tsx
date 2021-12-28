// @flow
import * as React from 'react';

type Props = {
    text?:any;
    onClick:any;
    styleClasses?:string;
    children?:any;
};
type State = {};

export function TealButton({onClick, text, styleClasses, children}:Props) {
    let classes = "btn hover:shadow-lg   text-white bg-gradient-to-l from-teal-200   via-teal-400  to-teal-300 hover:font-bold";
    if(styleClasses){
        classes+=styleClasses;
    }

    return (
        <button className={classes.toString()} onClick={onClick}>{text?text:children}</button>
    );
};

export default TealButton;
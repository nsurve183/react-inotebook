
import NoteContext from "../../../src/context/note/NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const personalData = {
        name: "Nikhil Surve",
        age: 36
    }

    const [nameAge, setNameAge] = useState(personalData);

    const update = () => {
        setTimeout(() => {
            setNameAge({
                name: "Madhavi Surve",
                 age: 35
            })
        }, 2000)
    }
    return (
        <NoteContext.Provider value={{nameAge, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
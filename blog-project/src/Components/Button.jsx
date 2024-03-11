import { ImSpinner8 } from "react-icons/im";

function Button({text,disabled,loading,eventHandler}){
    return(
        <button disabled={disabled} onClick={eventHandler}>{loading ? <ImSpinner8 className="animate-spin" /> : text}</button>
    )
}

export default Button
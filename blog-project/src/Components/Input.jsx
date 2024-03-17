function Input({id,value,placeHolder="",inputStyling="",labelStyling="",type,disabled=false,isRequired,label,eventHandler,name,error,inputRef}){
    return(
        <div className="relative flex flex-col gap-1">
            <input ref={inputRef} disabled={disabled} value={value} id={`${id}`} onChange={eventHandler} type={type} name={name} placeholder={placeHolder} required={isRequired} className={inputStyling} />
            {label && <label className={labelStyling} htmlFor={id}>{label}</label>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}

export default Input
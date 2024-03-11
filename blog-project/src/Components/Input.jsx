function Input({id,value,placeHolder,type,disabled=false,isRequired,label,eventHandler,name,error,inputRef}){
    return(
        <div className="flex flex-col justify-between">
            {label && <label htmlFor={id}>{label}</label>}
            <input ref={inputRef} disabled={disabled} value={value} id={`${id}`} onChange={eventHandler} type={type} name={name} placeholder={placeHolder} required={isRequired} />
            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}

export default Input
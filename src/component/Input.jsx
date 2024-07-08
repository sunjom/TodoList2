import { forwardRef } from "react"

let Input = forwardRef( function Input({ label ,textarea , ...props},ref){
        const Classes = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        return(
        <p className="flex flex-col hap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            {textarea ? <textarea ref={ref} className={Classes}{...props} /> : <input ref={ref} className={Classes}{...props}/>}
        </p>
        )
    }
)
export default Input;
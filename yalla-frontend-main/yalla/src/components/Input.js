import React from "react"

function Input({ validator, label, onEnter, ...rest }) {
    let ref = React.useRef()
    let [isBadInput, setIsBadInput] = React.useState(false)
    let [isGoodInput, setIsGoodInput] = React.useState(false)

    //useEffect(() => testInput(), [validator])
    let testInput = () => {
        if (!validator) {
            setIsGoodInput(false)
            setIsBadInput(false)
        } else if (validator.test(ref.current.value)) {
            setIsGoodInput(true)
            setIsBadInput(true)
        } else if (!ref.current.value || ref.current.value.length === 0) {
            setIsGoodInput(false)
            setIsBadInput(false)
        } else {
            setIsBadInput(true)
            setIsGoodInput(false)
        }
    }

    let checkEnter = (e) => {
        if (onEnter && e.keyCode === 13) {
            onEnter()
        }
    }
    return (
        <div className="m-px w-full" style={{ width: '100%' }}>
            {label && <label className="text-xs text-gray-500 ml-2 leading-1">{label}</label>}
            <input
                ref={ref}
                className={`${isBadInput ? "border-2 border-red-400" : ""} ${
                    isGoodInput ? "border-2 border-green-500" : ""
                }  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                onBlur={() => testInput()}
                style={{ width: '100%' }}
                onKeyDown={(e) => checkEnter(e)}
                {...rest}
            ></input>
        </div>
    )
}

export default Input
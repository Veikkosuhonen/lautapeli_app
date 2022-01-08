const validation = (setValid, condition, message) => (value) => {
    const isValid = condition(value)
    setValid(isValid)
    return isValid ? "" : message
}

const multiValidation = (setValid, ...optionss) => {
    optionss.forEach(options => {
        if (!(options.condition && options.message)) {
            throw new Error("Invalid options for validation function")
        }
    })

    return (value) => {
        let valid = true
        let message = ""
        optionss.forEach(options => {
            if (!options.condition(value)) {
                message = options.message
                valid = false
            }
        })
        
        setValid(valid)
        return message
    }
}

export {
    validation, multiValidation
}
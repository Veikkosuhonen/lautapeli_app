const validation = (condition, setValid, message) => (value) => {
    const isValid = condition(value)
    setValid(isValid)
    return isValid ? "" : message
}

export {
    validation
}
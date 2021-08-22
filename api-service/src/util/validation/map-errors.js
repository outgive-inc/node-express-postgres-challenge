module.exports = (errors) => {
    let errorObj = {}

    errors.map(({ param, msg }) => errorObj[param] = msg)
    
    return errorObj
}
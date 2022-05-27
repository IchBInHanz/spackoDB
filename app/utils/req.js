exports.checkParams = (body, params) => {
    return new Promise((resolve, reject) => {
        if (body.action && params[body.action]) {
            console.log(body)
            console.log(params)
            resolve(true)
        } else {
            resolve(false);

        }
    })
}
exports.checkParams = (body, params) => {
    return new Promise((resolve, reject) => {
        if (body.action && params[body.action]) {
            missing = false;
            for (const [key, value] of Object.entries(params[body.action].params)) {
                
                // checking if present
                if (!body[key] && value.req == true) {
                    missing = true;
                }

                // checking type
                if (value.type || value.type !== null) {
                    if (value.type == 'object') {
                        try {
                            body[key] = JSON.parse(body[key])
                        } catch (error) {
                            resolve({
                                code: 400,
                                response: {
                                    error: `${key} is invalid`
                                }
                            });
                        }
                    }

                    if (value.type == 'number') {
                        if (parseInt(body[key]) == NaN) {
                            resolve({
                                code: 400,
                                response: {
                                    error: `${key} is invalid`
                                }
                            });
                        } else {
                            body[key] = parseInt(body[key])
                        }
                    }
                    if (!typeof body[key] == value.type) {
                        resolve({
                            code: 400,
                            response: {
                                error: `${key} is invalid`
                            }
                        });
                    }
                }
                // checking minLength
                if (value.minLength || value.minLength !== null) {
                    if (body[key].length < value.minLength) {
                        resolve({
                            code: 400,
                            response: {
                                error: `${key} is invalid`
                            }
                        });
                    }
                }
                // checking maxLength
                if (value.maxLength || value.maxLength !== null) {
                    if (body[key].length > value.maxLength) {
                        resolve({
                            code: 400,
                            response: {
                                error: `${key} is invalid`
                            }
                        });
                    }
                }
                // checking regEx
                if (value.regex || value.regex !== null) {
                    if (!body[key].test(value.regex)) {
                        resolve({
                            code: 400,
                            response: {
                                error: `${key} is invalid`
                            }
                        });
                    }
                }
            }
            if (!missing) {
                resolve({
                    code: 200
                });
            } else {
                resolve({
                    code: 400,
                    response: {
                        error: 'Missing Argument'
                    }
                });
            }
        } else {
            resolve({
                code: 400,
                response: {
                    error: 'Missing Action'
                }
            });
        }
    })
}
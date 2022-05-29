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
            // if (!missing) {
            //     console.log('HMM')
            //     for (const [key, value] of Object.entries(params[body.action].params)) {
            //         if (!body[key] && value.req == true) {
            //             console.log(body[key])
            //             // checking type
            //             if (value.type || value.type !== null) {
            //                 if (!typeof body[key] == value.type) {
            //                     resolve({
            //                         code: 400,
            //                         response: {
            //                             error: `${body[key]} is invalid`
            //                         }
            //                     });
            //                 }
            //             }
            //             // checking minLength
            //             if (value.minLength || value.minLength !== null) {
            //                 // console.log(body[key].length)
            //                 if (body[key].length < value.minLength) {
            //                     resolve({
            //                         code: 400,
            //                         response: {
            //                             error: `${body[key]} is invalid`
            //                         }
            //                     });
            //                 }
            //             }
            //         }
            //     }
                // resolve({
                //     code: 200
                // });
            // } else {
                // resolve({
                //     code: 400,
                //     response: {
                //         error: 'Missing Argument'
                //     }
                // });
            // }
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
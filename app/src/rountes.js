const reqUtils = require('../utils/req')
const reqConfig = require('../configs/req.json')


exports.routes = async (req) => {
    if (await reqUtils.checkParams(req.body, reqConfig.actions)) {
        return {
            code: 200,
            response: {
                data: "Some Success Data"
            }
        }
    } else {
        return {
            code: 200,
            response: {
                error: "Some Error"
            }
        } 
    }
}
const reqUtils = require('../utils/req')
const reqConfig = require('../configs/req.json')


exports.routes = async (req) => {
    checkParams = await reqUtils.checkParams(req.body, reqConfig.actions)
    if (checkParams.code == 200) {
        return {
            code: 200,
            response: {
                data: "Some Success Data"
            }
        }
    } else {
        return {
            code: checkParams.code,
            response: checkParams.response
        } 
    }
}
const reqUtils = require('../utils/req')
const reqConfig = require('../configs/req.json')
const adminConfig = require('../configs/admins.json')
const funcDocSet = require('../src/functions/docSet')


exports.routes = async (req) => {
    checkParams = await reqUtils.checkParams(req.body, reqConfig.actions)
    console.log(req.body)
    if (checkParams.code == 200) {
        if (req.body.adminKey == adminConfig.key) {
            if (req.body.action == 'set') {
                actionResp = await funcDocSet.docSet(req)
            }
            return actionResp
        } else {
            return {
                code: 403,
                response: {
                    error: 'Invalid Admin Key'
                }
            }  
        }
    } else {
        return {
            code: checkParams.code,
            response: checkParams.response
        } 
    }
}
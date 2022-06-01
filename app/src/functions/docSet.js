const dbUtils = require('../../utils/db')
const fs = require('fs')
const path = require('path')

exports.docSet = (req) => {
    return new Promise(async (resolve, reject) => {
        // await new Promise(res => setTimeout(res, 3000));
        refResp = dbUtils.refParser(req.body.ref)
        refAbsolutePath = '../../../data'+refResp.refPath
        if (await dbUtils.dbExits(refResp.splitRef[0])) {
            try {
                fs.mkdirSync(refAbsolutePath);
            } catch (error) {
                if (!error.code == 'EEXIST') {
                    resolve({
                        code: 500,
                        response: {
                            error: 'Server Error creating the ref'
                        }
                    });
                }
            }
            try {
                fs.writeFileSync(refAbsolutePath+'/data.json', JSON.stringify(req.body.data));
                resolve({
                    code: 200,
                    response: {
                        data: refResp
                    }
                });
            } catch (err) {
                console.error(err);
                resolve({
                    code: 200,
                    response: {
                        error: err
                    }
                });
            }
        } else {
            resolve({
                code: 400,
                response: {
                    error: 'Databse do not exist'
                }
            });
        }
    })
}
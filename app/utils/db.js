exports.refParser = (ref) => {
    refConstruct = {
        rawRef: ref,
        splitRef: ref.split('/')
    }
    refPath = `/DB.${refConstruct.splitRef[0]}`
    refDeltail = [
        {
            type: 'db',
            name: refConstruct.splitRef[0]
        }
    ]
    for (let i=1; i < refConstruct.splitRef.length; ++i) {
        if (i % 2 == 0) { 
            type = 'doc'
        } else {
            type = 'coll'
        }
        refDeltail.push({
            type: type,
            name: refConstruct.splitRef[i]
        })
        refPath += `/${type.toUpperCase()}.${refConstruct.splitRef[i]}`
    }
    refConstruct.refDeltail = refDeltail
    refConstruct.refPath = refPath
    return refConstruct
}

exports.dbExits = (db) => {
    return true
}
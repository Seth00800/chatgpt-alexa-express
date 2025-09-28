import express, {json} from 'express'
export const api = express.Router()

import { ErrorHandler } from '../../node/middleware/resphandlers/errors.mjs'
import { appJsonHeader, authCheck } from "../../node/middleware/contentchecks/headers/headerCheck.mjs";
import { SuccessHandler } from "../../node/middleware/resphandlers/success.mjs";
import { healthStatus } from "../../node/middleware/health/checkHealth.mjs";
import { mongoConnectGetExpress, mongoConnectPostHomework } from "../../node/middleware/databases/mongo/mongoClient.mjs";

//Application Middleware
// api.use( authCheck )
// api.use( appJsonHeader )
// api.use( qpCheck )
// api.use( bodyData )


//GET Methods
api.get('/health', healthStatus, (req, res, next) => {
    console.log("EXITED health")
    next()
})

api.get('/mongo', mongoConnectGetExpress, (req, res, next) => {
    console.log("EXITED getMongo")
    next()
})

//POST Methods
api.post('/uploadHomework', mongoConnectPostHomework, (req, res, next) => {
    console.log("EXITED postMongo")
    next()
})



api.use(SuccessHandler)

api.use(ErrorHandler)
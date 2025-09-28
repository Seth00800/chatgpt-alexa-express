import { MongoClient } from "mongodb"
import { configVars } from "../../../../../Config/configVars.mjs";
// const uname = JSON.parse(configVars.mongoUname);
const username = configVars.mongoUname;
// const username = uname.MONGO_INITDB_ROOT_USERNAME
// const pwd = JSON.parse(configVars.mongoPwd);
const pwd = configVars.mongoPwd;
// const transPwd = pwd.MONGO_INITDB_ROOT_PASSWORD
// const password = encodeURIComponent(transPwd)
const password = encodeURIComponent(pwd)
const uri = 'mongodb://'+username+':'+password+'@3.222.192.115:27017'
const client = new MongoClient(uri)



// export const mongoConnectPost = async(qsp, req, res, next) => {
//     console.log("IN MONGO POST")
//     let collection;
//     let database;
//     let docType
//
//     if(qsp.coll){
//         collection = qsp.coll
//     }
//
//     if(qsp.db){
//         database = qsp.db
//     }
//
//     if(qsp.type){
//         docType = qsp.type
//     }
//
//     try {
//         await client.connect();
//         console.log("Connected To Mongo Successfully")
//         const coll = client.db(database).collection(collection);
//         let newDocument = docType
//         console.log(newDocument)
//         newDocument.date = new Date();
//         let result = await coll.insertOne(newDocument);
//         await client.close();
//         console.log("Closed Connection To Mongo Successfully")
//         return result
//     }catch (e){
//         e.statusCode = 400
//         e.message = {
//             "Status": "Failed To Upload",
//             "Message": "Issue Uploading Homework To MongoDB"
//         }
//         e.name = "Failed To Upload"
//         return next(e)
//     }
// }

export const mongoConnectPostHomework = async(req, res, next) => {
    console.log("IN MONGO POST HOMEWORK")
    let collection;
    let database;

    database = req.body.id.replaceAll(" ", "_")
    collection = req.body.object

    try {
        console.log("I AM IN MONGO TRY");
        await client.connect();
        console.log("Connected To Mongo Successfully");

        const db = client.db(database);
        const coll = db.collection(`${collection}`);

        let newDocument = req.body


        let result = await coll.insertOne(newDocument);

        await client.close();
        console.log("Closed Connection To Mongo Successfully");

        res.statusCode = 200
        res.message = "Successfully Posted Homework All Data To Mongo"
        res.success = [{
            "data": result
        }]

        next()
    }catch (e){
        console.log(e)
        e.statusCode = 400
        e.message = {
            "Status": "Failed To Upload",
            "Message": "Issue Uploading Homework To MongoDB"
        }
        e.name = "Failed To Upload"
        next(e)
    }
}

export const mongoConnectGetExpress = async(req, res, next) => {
    console.log(req.query)
    let qsp = req.query
    try {
        console.log("IM IN MONGO CONNECT GET TRY")

        let searchFilter;
        let myId;
        let myVersion;
        let collection;
        let database;


        if(qsp.version){
            myVersion = qsp.version
        }

        if(qsp.coll){
            collection = qsp.coll
        }

        if(qsp.db){
            database = qsp.db
            myId = qsp.db
        }

        if(qsp.id && qsp.version){
            searchFilter = {"id": myId, "version": myVersion};
        }

        await client.connect();
        console.log("Connected To Mongo Successfully")
        const coll = client.db(database).collection(`${collection}`);
        const cursor = coll.find(searchFilter);
        let result = await cursor.toArray();
        console.log("THIS IS MY RESULT: "+result)
        if(qsp.id && qsp.version){
            result = JSON.parse(JSON.stringify(result[0], null, 2))
        }else {
            result = JSON.parse(JSON.stringify(result, null, 2))
        }
        await client.close();
        console.log("Closed Connection To Mongo Successfully")
        res.statusCode = 200
        res.message = "Successfully Pulled All Data From Mongo"
        res.success = [{
            "data": result
        }]
        // console.log(res.success)
        next()
    }catch (e){
        console.log("IM IN MONGO CONNECT GET CATCH")
        console.log(e)
        e.statusCode = 400
        e.message = {
            "Status": "Failed To GET",
            "Message": "Failed To GET Document From MongoDB"
        }
        e.name = "Failed To GET"
        return next(e)
    }
}
// export const createUpdateMongoUser = async() => {
//
//     try{
//         await client.connect()
//         console.log("Connected to MongoDB")
//         const db = client.db('admin');
//         const roles = [{role: 'readWrite', db: 'admin'}];
//         const roleToRemove = 'readWrite';
//         const database = 'admin,TESSTDB';
//
//         await db.command({
//             createUser: username,
//             pwd: password,
//             roles: roles
//         })
//
//         // await db.command({
//         //     updateUser: username,
//         //     roles: [{ role: roleToRemove, db: database, drop: true }]
//         // });
//
//         console.log(`User ${username} created successfully`)
//     }catch (e) {
//         console.log("An error occurred: ", e)
//     }finally {
//         await client.close()
//     }
//
// }
//
//
//
// export const createMongoDB = async() => {
//
//
//         try{
//             await client.connect()
//             console.log("Connected to MongoDB")
//             const db = client.db('admin');
//
//             const roles = [{role: 'readWrite', db: 'admin'}];
//             const roleToRemove = 'readWrite';
//             const database = 'admin,TESSTDB';
//
//             await db.command({
//                 createUser: username,
//                 pwd: password,
//                 roles: roles
//             })
//
//             // await db.command({
//             //     updateUser: username,
//             //     roles: [{ role: roleToRemove, db: database, drop: true }]
//             // });
//
//             console.log(`User ${username} created successfully`)
//         }catch (e) {
//             console.log("An error occurred: ", e)
//         }finally {
//             await client.close()
//         }
//
//
// }
//
//
// await getMongo()
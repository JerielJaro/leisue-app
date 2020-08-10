const express = require('express');
const router = express.Router();
const { MongoClient, Server, ObjectId } = require('mongodb');
const HOST = 'localhost';
const MPORT = '27017';
const DB    = "sampleDB";
const COL   = "Users"
const PAGELIMIT = 100;

router.get('/', async (req, res, next) => {
    try {
        let client = await (new MongoClient(new Server(HOST, MPORT)).connect());
        let data = await client.db(DB).collection(COL).find({}).toArray();
        res.status(200).json(data).end();
        await client.close();
    }
    catch(err) {
        res.status(400).end();
    }
});

router.get('/page/:page', async (req, res, next) => {
    try{
        let client = await (new MongoClient(new Server(HOST, MPORT)).connect());
        let data = await client.db(DB).collection(COL).find({}).skip(parseInt(req.params.page)*PAGELIMIT - PAGELIMIT).limit(PAGELIMIT).toArray();
        res.status(200).json(data).end();
        await client.close();
    } catch(err) {
        res.status(400).end();
    }
});

router.get('/id/:id', async (req, res, next) => {
    try{
        let client = await (new MongoClient(new Server(HOST, MPORT)).connect());
        let data = await client.db(DB).collection(COL).findOne({"_id" : ObjectId(req.params.id)});
        res.status(200).json(data).end();
        await client.close();
    } catch(err) {
        res.status(400).end();
    }
});

router.post('/id/:id', async (req, res, next) => {
    try{
        let client = await (new MongoClient(new Server(HOST, MPORT)).connect());
        let data = req.query; data._id = ObjectId(req.params.id);
        await client.db(DB).collection(COL).insertOne(data);
        res.status(200).json({"msg": "successful"}).end();
        await client.close();
    } catch(err) {
        res.status(400).end();
    }
});

router.put('/id/:id', async (req, res, next) => {
    try{
        let client = await (new MongoClient(new Server(HOST, MPORT)).connect());
        await client.db(DB).collection(COL).findOneAndUpdate(
            {"_id": ObjectId(req.params.id)},
            req.query
        );
        res.status(200).json({"msg": "successful"}).end();
        await client.close();
    } catch(err) {
        res.status(400).end();
    }
});

router.delete('/id/:id', async (req, res, next) => {
    try{
        let client = await (new MongoClient(new Server(HOST, MPORT)).connect());
        await client.db(DB).collection(COL).findOneAndDelete({"_id": ObjectId(req.params.id)});
        res.status(200).json({"msg": "successful"}).end();
        await client.close();
    } catch(err) {
        res.status(400).end();
    }
});

module.exports = router;

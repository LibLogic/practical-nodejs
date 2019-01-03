const MongoClient = require('mongodb').MongoClient;
const myIP = process.env.IP;
const url = 'mongodb://' + myIP + ':27017';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if(err){
        return process.exit(1);
    } 
    const db = client.db('edx-course-db');
    console.log('Connection is okay');
    //perform queries
    insertDocuments(db, () => {
        updateDocument(db, () => {
            removeDocument(db, () => {
                findDocuments(db, () => {
                    client.close();
                });    
            });
        });
    });
});

const insertDocuments = (db, callback) => {
    const collection = db.collection('edx-course-students');
    collection.insertMany([
        {name: "Bob"},
        {name: "John"},
        {name: "Peter"}
    ], (error, result) => {
        if(error) { 
            return process.exit(1); 
        }
        console.log(result.result.n); //will be 3
        console.log(result.ops.length); //will be 3
        console.log('Inserted 3 documents into the edx-course-students collection');
        callback(result);
    });
};

const updateDocument = function(db, callback){
    // get the edx-course-students collection
    const collection = db.collection('edx-course-students');
    //update document where a is 2, set b equal to 1
    const name = 'Peter';
    collection.updateOne({ name: name }, { $set: { grade: 'A' } }, (error, result) => {
        if(error) {
            return process.exit(1);
        }
        console.log(result.result.n); //will be 1
        console.log(`Updated the student document where name = ${name}`);
        callback(result);    
    });
};
    
const removeDocument = (db, callback) => {
  // Get the documents collection
  const collection = db.collection('edx-course-students');
  // Insert some documents
  const name = 'Bob';
  collection.removeOne({ name : name }, (error, result) => {
    if (error) return process.exit(1);
    console.log(result.result.n); // will be 1
    console.log(`Removed the document where name = ${name}`);
    callback(result);
  });
};

const findDocuments = (db, callback) => {
  // Get the documents collection
  const collection = db.collection('edx-course-students');
  // Find some documents
  collection.find({}).toArray((error, docs) => {
    if (error) return process.exit(1);
    console.log('\n\n', 2, docs.length); // will be 2 because we removed one document
    console.log(`Found the following documents:`);
    console.dir(docs);
    callback(docs);
  });
};
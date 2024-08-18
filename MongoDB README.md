## MongoDB

### Installation

- [MongoDB Community Edition Download](https://www.mongodb.com/try/download/community?tck=docs_server)
- [MongoDB Community Edition Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x-tarball/)
- [MongoDB Shell Download](https://www.mongodb.com/try/download/shell)
- [MongoDB Shell Installation](https://www.mongodb.com/docs/mongodb-shell/install/)
- [MongoDB Compass Download (GUI)](https://www.mongodb.com/try/download/compass)

### Commands

Create data directory:

```sh
SOME_FOLDER_WITH_READ_WRITE_ACCESS
├── MongoDB
│   ├── data
│   │   └── AUTO_GENERATED_DB_FILES
│   ├── logs
│   │   └── mongo.log
```

Start DB Server:

```sh
mongod --dbpath="PATH_TO_MongoDB_DATA_FOLDER" --logpath="PATH_TO_MongoDB_LOG_FILE" --port="PORT_NO" --directoryperdb --fork
```

Running DB as a Service:

mongodb.cfg

```sh
storage:
  dbPath: "/your/path/to/the/db/folder"
systemLog:
  destination:  file
  path: "/your/path/to/the/logs.log"
```

```sh
mongod --config="PATH_TO_MongoDB_CFG_FILE"
```

Other Server Options:

```sh
mongod --help
```

Shutdown a Forked DB Server:

```sh
use admin
db.shutdownServer()
```

Run MongoDB Shell:

```sh
mongosh
cls # to clear the shell
```

Other Shell Options:

```sh
mongosh --help
```

List all databases:

```sh
show dbs
```

Connect to a databases (it will create it if it doesnot exist):

```sh
use <DB_NAME>
```

Drop database

```sh
db.dropDatabase()
```

Drop Collection

```sh
db.<COLLECTION_NAME>.drop()
```

#### References

- [More Details about Config Files](https://docs.mongodb.com/manual/reference/configuration-options/)
- [More Details about the Shell (mongo) Options](https://www.mongodb.com/docs/manual/reference/method/)
- [More Details about the Server (mongod) Options](https://docs.mongodb.com/manual/reference/program/mongod/)

### CRUD Operations

Atomicity - MongoDB CRUD operations are `Atomic` in nature but on a per document level, this includes embedded documents.

Create

```sh
insertOne(data, options)

insertMany(data, options)
```

Read

```sh
find(filter, options)

findOne(filter, options)
```

Update

```sh
updateOne(filter, data, options)

updateMany(filter, data, options)

replaceOne(filter, data, options)
```

Delete

```sh
deleteOne(filter, options)

deleteMany(filter, options)
```

#### Create Operations Examples

Insert one item into a collection (it will create the collection if it doesnot exist):

```sh
db.products.insertOne({ name: "Book", price: 100 }) # db.<COLLECTION_NAME>.insertOne({...})
```

Insert multiple items into a collection:

```sh
db.products.insertMany([{ name: "Book", price: 100 }, { name: "Cake", price: 500 }])
```

#### Read Operations Examples

get all item from a collection:

```sh
db.products.find() # db.<COLLECTION_NAME>.find()

db.products.find().pretty() # to pretty print in console

```

get some item in a collection:

using filters:

```sh
db.products.find({ price: 100 })
```

using operators:

```sh
db.products.find({ price: { $gt: 100 } }) # find price greater than 100
```

#### Update Operations Examples

update an item in a collection:

```sh
db.products.updateOne({ price: "100" }, { $set: { price: 500 }})
```

update multiple items in a collection:

```sh
db.products.updateMany({ price: "100" }, { $set: { price: 500 }})

db.products.updateMany({}, { $set: { price: 500 }}) # updates all
```

replace an item in a collection:

```sh
db.products.replaceOne({ price: "100" }, { price: 500 })

db.products.update({ price: "100" }, { price: 500 })
```

delete multiple items from a collection:

```sh
db.products.deleteMany({ price: 100 })

db.products.deleteMany({}) # deletes all
```

#### Delete Operations Examples

delete an item from a collection:

```sh
db.products.deleteOne({ name: "Book" })
```

delete multiple items from a collection:

```sh
db.products.deleteMany({ price: 100 })
```

#### Understanding Cursor

find doesnot return all the objects, it returns a cursor

```sh
db.products.find()
> type "it" for more
it
```

force find to give all the data

```sh
db.products.find().toArray() # .toArray() will exhaust all the cursors
```

```sh
db.products.find().forEach((product) => { printjson(product) })
```

```sh
db.products.find().pretty() #  on .findOne() as it returns only one data
```

#### Understanding Projection

It is a way to limit the set of data that is retrieved. This filtering happens on the server thus saving bandwidth.

include keys in the projection

```sh
db.products.find({}, { name: 1 }) # this will return only the name and _id(always returned) and omit any other keys present in the document
```

exclude keys from the projection

```sh
db.products.find({}, { name: 1, _id: 0 }) # this will return only the name and omit any other keys present in the document including the _id which is returned by default
```

#### Understanding Embedded Documents

- Documents can be stored inside documents in mongodb. This is known as embedded documents.
- Arrar of documents can also be stored
- Limitations

  - Max 100 level of nesting is possible in case of documents
  - Overall document size cannot exceed 16mb

#### Searching in an Embedded Document

Will look for material equals gold inside feature key

```sh
db.products.find({ "feature.material": "gold" }).pretty()
```

#### Searching in an Array

Will look for gaming inside tag key or gaming inside an object with tag key

```sh
db.products.find({ tag: "gaming" }).pretty()
```

### Data Types

- Text (limitation - max 16mb)
- Boolean
- Number [NumberInt(int32), NumberLong(int64), NumberDecimal]
- Id [ObjectId]
- Date [ISODate, Timestamp]
- Embedded Documents (limitation - 100 levels of embedded documents)
- Array

#### References

- [MongoDB DataType Limits](https://docs.mongodb.com/manual/reference/limits/)
- [All DataTypes Supported by MongoDB](https://docs.mongodb.com/manual/reference/bson-types/)

### Schemas & Relations

#### Lookup

```sh
db.books.aggregate([{ $lookup: { from: "authors", localField: "authors", foreignField: "_id", as: "creators" }  }])
```

#### Schema Validation

- **validationLevel** (which documents gets validated?)
  - _strict_ (all inserts and updates)
  - _moderate_ (all inserts and updates to correct document)
- **validationAction** (what happens if validation fails)
  - _error_ (throw error and deny insert/update)
  - _warn_ (log warning but proceed)

##### Set Validation Schema

```js
db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be an objectid and is required",
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              author: {
                bsonType: "objectId",
                description: "must be an objectid and is required",
              },
            },
          },
        },
      },
    },
  },
});
```

##### Update Validation Schema

```js
db.runCommand({
  collMod: "posts",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be an objectid and is required",
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              author: {
                bsonType: "objectId",
                description: "must be an objectid and is required",
              },
            },
          },
        },
      },
    },
  },
  validationAction: "warn",
});
```

#### References

[More on Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/)

### MongoDB Compass

#### References

- [The MongoDB Compass Docs](https://docs.mongodb.com/compass/master/install/)
- [Only available in the Enterprise Edition](https://docs.mongodb.com/compass/master/schema/)

### Create

#### Ordered Insert

When doing insertMany if any of the documents fails to insert then the operations stop there and mongo db doesnot try to insert the rest of the valid items this is the default behaviour where `{ ordered: true }`, when set to true modo db will try to insert the other valid items in the array `{ ordered: false }`.
`Note:` in both these cases the items that are already inserter are not rolled back incase of any aerror, this is the default behaviou of MongoDB.

#### Write Concern

Write concern describes the level of acknowledgment requested from MongoDB for write operations to a standalone mongod , replica sets, or sharded clusters

- Settings `w: 1` means we will get an acknowledgment when the data is wriiten to the primary DB and not to the replica, which telss that it will eventually be wriiten to all replicas
- Setting `j: undefined` means we will not wait for the data to be written to the journal, if we want to want for the data to be written to the hournal we will set `j: true` (journals are like a todo list mentained by the mogodb engine which tells what data needs to be added to the other replicas, this is so that write are faster and even if the server crashes mogodb can know what operations were left to perform)
- Settings `wtimeout: 300` means if the acknowledgment taken more than 300ms in this case to come then we will cancel it, setting it too low will cause writes to fail even if they would have passed eventually

eg: `{ writeConcern: { w:1, j: true , wtimeout: 500 }}` means wait for acknowledgment after the data is written to the primary storage and the journal ans incase the time taken for the acknowledgment to arrive is more than 500ms then cancel the operation

#### Importing Data

This command is used to import existing data into a mongodb collection in a certain database. For this you need to be out of the mongodb shell

```sh
mongoimport <PATH_TO_JSON_FILE> -d <DATABASE_NAME> -c <COLLeCTION_NAME> --jsonArray  --drop
```

`-d`: database name
`-c`: collection name
`--jsonArray`: tells MongoDB that threr are more then one entries
`--drop`: tells MongoDB to drop the exisitng collection an then import these data or else it will be appended to it

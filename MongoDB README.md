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
mongod --dbpath="PATH_TO_MongoDB_DATA_FOLDER" --logpath="PATH_TO_MongoDB_LOG_FILE" --port="PORT_NO"
```

Run MongoDB Shell:

```sh
mongosh
cls # to clear the shell
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

### CRUD Operations

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

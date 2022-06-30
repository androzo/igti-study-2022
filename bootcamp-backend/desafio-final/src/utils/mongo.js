import mongodb from "mongodb";

function getClient() {
  const uri = "mongodb://localhost:27017";
  return new mongodb.MongoClient(uri);
}

export { getClient };

db = db.getSiblingDB("mydatabase");

db.examples.insertMany([
  { name: "Item 1", value: 100 },
  { name: "Item 2", value: 200 },
  { name: "Item 3", value: 300 }
]);
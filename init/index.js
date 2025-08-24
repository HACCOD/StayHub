const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=>{
    console.log("database has been connected.");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


let addInitialData = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((data)=>({...data, owner: '688df45bca495c1bf696f957'}))
    await Listing.insertMany(initData.data);
    console.log("data has been added");
}

addInitialData();
const iPhoneModel = require("../models/iPhoneModel")
const iPhoneData = require("./iphones.json")

const connect = require("../config/dbConnection")

const initIphones = async () => {
    await connect();
    iPhoneData.iphones.forEach(async iphone => {
        const iPhoneObject = await iPhoneModel.create(iphone);
        if (iPhoneObject) {
            console.log(`${iPhoneObject.name} is created`);
        }

        else {
            console.log("error")
        }
    })
}

initIphones()
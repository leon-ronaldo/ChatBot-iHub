const asyncHandler = require("express-async-handler")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const iPhoneModel = require("../models/iPhoneModel")
const macBookModel = require("../models/macBookModel")
const connectDB = require("../config/dbConnection");
const { exit } = require("process");

const genAI = new GoogleGenerativeAI("AIzaSyCM3_2TIq7lhJZTnGJyvUy_U1P7m1kXngA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const rephrase = [
  "I'm sorry, I couldn't understand that. Could you please rephrase your question?",
  "Hmm, that seems a bit unclear. Could you try asking in a different way?",
  "I'm having trouble finding an answer. Could you rephrase your question for me?",
  "I'm not sure how to help with that. Can you ask in another way?",
  "Apologies, I didn't catch that. Could you rephrase your question?",
  "I'm not sure I have the right information. Would you mind rephrasing?",
  "I didn't quite get that. Can you ask again with different wording?",
  "That's a bit unclear. Could you rephrase your question for me to assist better?",
  "Sorry, I couldn't find an answer. Can you try asking your question differently?",
  "I'm having trouble understanding. Could you ask the question in a different way?",
  "It looks like I don't have an answer for that. Can you rephrase your query?",
  "I'm not sure I follow. Could you ask your question again with different wording?"
];

// const query = "how can i access AWS";  

// const prompt = consider you are a chatbot of apple, the user asked you "${query}"\n\return me with only these things under the following criteria\nreturn "greeting" if the question is a greeting or a normal chat.\nreturn "invalid" if the question is not related to apple company\nreturn "product" if the question is about an apple product\nreturn "service" if the question is about an apple service\nreturn "about" if the question is related to apple company 

const getResult = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text()
}

const getContext = asyncHandler(async (req, res, next) => {
  const query = req.body.query;  

  const prompt = `consider you are a chatbot of apple, the user asked you "${query}"\n\return me with only these things under the following criteria\nreturn "greeting" if the question is a greeting or a normal chat.\nreturn "invalid" if the question is not related to apple company\nreturn "product" if the question is about an apple product\nreturn "service" if the question is about an apple service\nreturn "about" if the question is related to apple company`

  const result = await model.generateContent(prompt);
  const context = result.response.text()

  req.body.context = context
  next()
})

const respond = asyncHandler(async (req, res) => {
  const query = req.body.query;
  const context = req.body.context;

  if (context == "product") {
    const category = await respondProduct(query)
    
  }
});

const respondProduct = async (query) => {
  const prompt = `the user asked a query about an apple product. The query is "${query}". Can you classify under which category the product falls?
      \nreturn "iPhone" if the product is an iPhone
      \nreturn "macBook" if the product is an macBook
      \nreturn "macDesktop" if the product is desktop mac
      \nreturn "iPad" if the product is an iPad\nreturn "appleWatch" if the product is an apple wearable
      \nreturn "airPods" if the product is an apple air pod
      \nreturn "invalid" if the product doesn't belong to apple company
      \nremember to return only the tags which i have provided and not anything else.`

  var result = (await getResult(prompt)).trim()

  if (result === "invalid") {
    const randomIndex = Math.floor(Math.random() * rephrase.length);
    return rephrase[randomIndex];
  }

  if (result === "iPhone") {
    const iPhones = await iPhoneModel.find();
    const iPhonePrompt = `${iPhones}
      \nthese are the list of iphones we have.
      \nthe user asked ${query}
      \nas a chatbot give a suitable reply based on the given data`;
                    
    return await getResult(iPhonePrompt);
  }
  return result
}

const hey = async () => {
  await connectDB();
  const res = await respondProduct("how many stocks do you have on iphone 12")
  console.log(res)
  exit()
}

hey()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 1000;
const app = express();

//  Middlewere
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Technology Shop server is runing')
});




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gcfawql.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const brandsCollecation = client.db('technologyShopsBD').collection('brands');
    const myCartsCollecation = client.db('technologyShopsBD').collection('myCarts');
    const nokiaPhonesCollecation = client.db('technologyShopsBD').collection('nokiaPhones');
    const appleWatchsCollecation = client.db('technologyShopsBD').collection('appleWatchs');
    const oppoPhonesCollecation = client.db('technologyShopsBD').collection('oppoPhones');
    const samsungComputersCollecation = client.db('technologyShopsBD').collection('samsungComputers');
    const huaweiPhonesCollecation = client.db('technologyShopsBD').collection('huaweiPhones');
    const googlePhonesCollecation = client.db('technologyShopsBD').collection('googlePhones');
    const xiaomiHeadphonesCollecation = client.db('technologyShopsBD').collection('xiaomiHeadphones');



    // get method all data handle function
    const handleGetAllData =(productsName, collecationName)=>{
        app.get(`/${productsName}`, async(req, res)=>{
            const cursor = collecationName.find()
            const result = await cursor.toArray()
            res.send(result || [])
        })
    }

    // get method onle one data handle function
    const handleGetOnlyOneData =(productsName, collecationName)=>{
        app.get(`/${productsName}/:id`, async(req, res)=>{
            const id = req.params.id
            console.log(id);
            const filter = {_id: new ObjectId(id)};
            const result = await collecationName.findOne(filter)
            res.send(result)
        });
    };


    // post method create data handle function
    const handlePostData =(productsName, collecationName)=>{
        app.post(`/${productsName}`, async(req, res)=>{
            const brand = req.body
            const result = await collecationName.insertOne(brand);
            res.send(result)
        })
    }

    // update method onle one data handle function
    const handleUpdateData =(productsName, collecationName)=>{
        app.put(`/${productsName}/:id`, async(req, res)=>{
            const id = req.params.id;
            const productDetails = req.body;
            const filter = {_id: new ObjectId(id)};
            const options = { upsert: true };
            const updateProduct ={
                $set:{
                    form: productDetails.form ,
                    productName: productDetails.productName ,
                    productImage: productDetails.productImage ,
                    brandName: productDetails.brandName ,
                    category: productDetails.category ,
                    Price: productDetails.Price ,
                    details: productDetails.details ,
                }
            };
            const result = await collecationName.updateOne(filter,updateProduct,options);
            res.send(result)
        });
    }


    // Delete method onle one data handle function
    const handleDeleteData =(productsName,collecationName)=>{
        app.delete(`/${productsName}/:id`, async(req, res)=>{
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const result = await collecationName.deleteOne(filter);
            res.send(result)
        })
    }


    // get method all data from mongodb database
    handleGetAllData('brands', brandsCollecation );
    handleGetAllData('myCarts', myCartsCollecation );
    handleGetAllData('nokia-phones', nokiaPhonesCollecation);
    handleGetAllData('apple-watchs', appleWatchsCollecation);
    handleGetAllData('oppo-phones', oppoPhonesCollecation);
    handleGetAllData('samsung-computers', samsungComputersCollecation);
    handleGetAllData('huawei-phones', huaweiPhonesCollecation);;
    handleGetAllData('google-Phones', googlePhonesCollecation);
    handleGetAllData('xiaomi-headphones', xiaomiHeadphonesCollecation);


    // get method only one data from mongodb database
    handleGetOnlyOneData('apple-watchs', appleWatchsCollecation);
    handleGetOnlyOneData('nokia-phones', nokiaPhonesCollecation);
    handleGetOnlyOneData('oppo-phones', oppoPhonesCollecation);
    handleGetOnlyOneData('samsung-computers', samsungComputersCollecation);
    handleGetOnlyOneData('huawei-phones', huaweiPhonesCollecation);
    handleGetOnlyOneData('google-phones', googlePhonesCollecation);
    handleGetOnlyOneData('xiaomi-headphones', xiaomiHeadphonesCollecation);


    // post method create data for mongodb database;
    handlePostData('brands', brandsCollecation);
    handlePostData('myCarts', myCartsCollecation);
    handlePostData('apple-watchs', appleWatchsCollecation);
    handlePostData('nokia-phones', nokiaPhonesCollecation);
    handlePostData('oppo-phones', oppoPhonesCollecation);
    handlePostData('samsung-computers', samsungComputersCollecation);
    handlePostData('huawei-Phones', huaweiPhonesCollecation);
    handlePostData('google-Phones', googlePhonesCollecation);
    handlePostData('xiaomi-headphones', xiaomiHeadphonesCollecation);


    // Update  only one data from mongodb database
    handleUpdateData('brands', brandsCollecation);
    handleUpdateData('apple-watchs', appleWatchsCollecation);
    handleUpdateData('nokia-phones', nokiaPhonesCollecation);
    handleUpdateData('oppo-phones', oppoPhonesCollecation);
    handleUpdateData('samsung-computers', samsungComputersCollecation);
    handleUpdateData('huawei-phones', huaweiPhonesCollecation);
    handleUpdateData('google-phones', googlePhonesCollecation);
    handleUpdateData('xiaomi-headphones', xiaomiHeadphonesCollecation);



    // Delete  only one data from mongodb database
    handleDeleteData('brands', brandsCollecation);
    handleDeleteData('apple-watchs', appleWatchsCollecation);
    handleDeleteData('nokia-phones', nokiaPhonesCollecation);
    handleDeleteData('oppo-phones', oppoPhonesCollecation);
    handleDeleteData('samsung-computers', samsungComputersCollecation);
    handleDeleteData('huawei-phones', huaweiPhonesCollecation);
    handleDeleteData('google-phones', googlePhonesCollecation);
    handleDeleteData('xiaomi-headphones', xiaomiHeadphonesCollecation);





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.dir);








app.listen(port, (req, res)=>{
    console.log('Server port in running', port);
})
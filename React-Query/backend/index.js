import express from 'express'
import Post from './models/Posts.js';
import connectDB  from './config/db.js'
const app = express();


const products = [
 {
     id:1,
     name: 'table wooden newer one',
     price: 200,
     image:'https://images.pexels.com/photos/172289/pexels-photo-172289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
 }, {
     id:2,
     name: 'table glass',
     price: 250,
     image:'https://images.pexels.com/photos/30714538/pexels-photo-30714538/free-photo-of-dark-moody-coffee-and-orange-still-life.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
 }, {
     id:3,
     name: 'table plastic',
     price: 200,
     image:'https://images.pexels.com/photos/198101/pexels-photo-198101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
 }, {
     id:4,
     name: 'table metal',
     price: 200,
     image:'https://images.pexels.com/photos/162534/grinder-hitachi-power-tool-flexible-162534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
 }, {
     id:5,
     name: 'table polyester',
     price: 200,
     image:'https://images.pexels.com/photos/4440574/pexels-photo-4440574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
 },
]  

const fruits = [
    {
      "id": 1,
      "name": "Apple"
    },
    {
      "id": 2,
      "name": "Banana"
    },
    {
      "id": 3,
      "name": "Orange"
    },
    {
      "id": 4,
      "name": "Mango"
    },
    {
      "id": 5,
      "name": "Pineapple"
    },
    {
      "id": 6,
      "name": "Strawberry"
    },
    {
      "id": 7,
      "name": "Blueberry"
    },
    {
      "id": 8,
      "name": "Grapes"
    },
    {
      "id": 9,
      "name": "Watermelon"
    },
    {
      "id": 10,
      "name": "Peach"
    },
    {
      "id": 11,
      "name": "Cherry"
    },
    {
      "id": 12,
      "name": "Pear"
    },
    {
      "id": 13,
      "name": "Kiwi"
    },
    {
      "id": 14,
      "name": "Pomegranate"
    },
    {
      "id": 15,
      "name": "Guava"
    },
    {
      "id": 16,
      "name": "Papaya"
    },
    {
      "id": 17,
      "name": "Coconut"
    },
    {
      "id": 18,
      "name": "Dragonfruit"
    },
    {
      "id": 19,
      "name": "Fig"
    },
    {
      "id": 20,
      "name": "Lychee"
    }
  ]
  
  app.use(express.json());
  connectDB();

  
app.get('/api/fruits/', (req,res)=> {
    let{_limit = 4 , _page = 1} = req.query // passing in default values
    _limit = parseInt(_limit);
    _page = parseInt(_page);

    if(!req.query._limit && !req.query._page){
        res.json(fruits);
        return
    }
    const startIndex = (_page - 1) * _limit;
    const endIndex = startIndex + _limit;

    const paginatedFruits = fruits.slice(startIndex, endIndex)
    
    setTimeout(() => {
    res.json(paginatedFruits)
    }, 3000)
    

})

app.post('/api/posts', async (req,res) => {
  try {
    console.log("recieved data", req.body)
      const postData =  req.body;
     const {title, content, imageUrl} = postData;
  
     const newPost = new Post({title,content,image: imageUrl});
     await newPost.save();
     res.json({status:200, body: newPost})
  } catch (error) {
    console.log(error)
  }
})

app.get('/api/getposts', async (req,res) => {
    try {
    const response = await Post.find({})
    res.json(response)
       
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Internal server error"})
    }
  })


app.get('/api/products',(req,res) => {

//    if(req.query.search){
//     const filterProducts = products.filter(product => product.name.includes(req.query.search))
//     res.send(filterProducts);
//     return;
//    }

   setTimeout(() => {
   res.send(products);
   }, 3000)
})

app.get('/api/products/:id', (req,res) => {
    const param = req.params.id;
    console.log(param);
    const filderProducts = products.filter(product => product.id.toString().includes(param))
    res.send(filderProducts)
})

app.get('/api/todos', (req,res) => {
    const todos = [{
    "id": "1",
    "title" : "Go to the doctor",
    }
    ]
    res.send(todos)
})



const PORT = 3004;

app.listen(PORT, () => {
    console.log(`Port running on ${PORT}`)
});
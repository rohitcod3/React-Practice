import express from 'express'

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
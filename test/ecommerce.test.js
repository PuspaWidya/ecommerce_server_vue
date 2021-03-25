const jwt = require('jsonwebtoken')

const request = require('supertest');
const app = require('../app')
const user = {
    id: 2,
    email: 'admin@mail.com',
    password: 1234,
    role: 'admin'
}

let token = jwt.sign(user,'top secret')

//LOGIN
describe('login',function(){
    
})
beforeAll(function(){
        
})


//CRUD
//GET -> READ
describe.only('GET/products',function(){
    it('should return 200 with data',function(done){
        request(app)
        .get('/products')
        .set('access_token',token)
        .end((err,res)=>{
            if(err){
                done(err)
            }else{

                console.log(res.body)
            
                // expect(res.status).toEqual(200)
                // expect(Array.isArray(res.body)).toEqual(true)
                // expect(res.body).toEqual("object")
                expect(Array.isArray(res.body)).toBeTruthy()
                done()
            }
        })
    })
})


//POST
describe('POST/products',function(){
    it('should return 201 with new Data ',function(done){
        // butuh req.body (id, name,imageUrl,price(int),stock(int?))
        // bawa data = .send
        let body = {
            name : 'testing',
            imageUrl : 'testing description',
            price :123123,
            stock:12
        }

        request(app)
        .post('/products')
        .send(body)
        // .set('acess_token',token) ==>headers
        .end((err,res)=>{
            if(err){ 
                done(err)
            }else{
                // status created 201, 
                expect(res.status).toEqual(201)
                expect(typeof res.body).toEqual("object") //!data yang dikirim berbentuk obj
                expect(typeof res.body.id).toEqual("number")
                expect(res.body).toHaveProperty("id")
                expect(res.body).toHaveProperty("name")
                expect(res.body).toHaveProperty("imageUrl")
                expect(res.body).toHaveProperty("price")
                expect(res.body).toHaveProperty("stock",body.stock)

                done()
            }
        })
    })
})


// error post
// //missing variable
// describe('POST/products',function(){
//     it('should return 400 ',function(done){
//         // butuh req.body (id, name,imageUrl,price(int),stock(int?))
//         // bawa data = .send
//         let body = {
//             name : '',
//             imageUrl : '',
//             price : 0,
//             stock:0
//         }

//         request(app)
//         .post('/products')
//         .send(body)
//         // .set('acess_token',token) ==>headers
//         .end((err,res)=>{
//             if(err){ 
//                 done(err)
//             }else{
//                 // status created 201, 
//                 expect(res.status).toEqual(400)
//                 expect(typeof res.body).toEqual("object") 
//                 expect(Array.isArray(res.body.errors)).toEqual(true)
//                 expect(res.body.errors).toEqual(
//                     expect.arrayContaining(["name is required"])
//                 )
//                 expect(res.body.errors).toEqual(
//                     expect.arrayContaining(["imageUrl is required"])
//                 )
//                 expect(res.body.errors).toEqual(
//                     expect.arrayContaining(["price is required"])
//                 )
//                 expect(res.body.errors).toEqual(
//                     expect.arrayContaining(["stock is required"])
//                 )
//                 done()
//             }
//         })
//     })
// })



//error minus
describe('POST/products',function(){
    it('should return 400 ',function(done){
        // butuh req.body (id, name,imageUrl,price(int),stock(int?))
        // bawa data = .send
        let body = {
            name : 'test1',
            imageUrl : 'test1',
            price : -1,
            stock:  -1
        }

        request(app)
        .post('/products')
        .send(body)
        // .set('acess_token',token) ==>headers
        .end((err,res)=>{
            if(err){ 
                done(err)
            }else{
                // status created 201, 
                expect(res.status).toEqual(400)
                expect(typeof res.body).toEqual("object") 
                expect(Array.isArray(res.body.errors)).toEqual(true) //?errors?
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(["minus price is not allowed"])
                )
                expect(res.body.errors).toEqual(
                    expect.arrayContaining(["minus stock is not allowed"])
                )
                done()
            }
        })
    })
})



// //edit
describe ('PUT/products/:id',function(){
    it('should return with 200 with new data that has been modified',function(done){
        let id = 1
        
        let body = {
            name : 'newtesting',
            imageUrl : 'new testing description',
            price :543,
            stock:543
    }
    request(app)
    .put('/products/'+id)
    .send(body)
    .end((err,res)=>{
        if(err){
            done(err)
        }else{
            expect(res.status).toEqual(200)
            expect(res.body).toHaveProperty("id")
            expect(res.body).toHaveProperty("name")
            expect(res.body).toHaveProperty("imageUrl")
            expect(res.body).toHaveProperty("price")
            expect(res.body).toHaveProperty("stock")
            done()
        }
    })
    })
})


//delete
describe ('DELETE/products/:id',function(){
    it('should return with 200 after deleting some data',function(done){
        let id = 1

        request(app)
        .delete('/products/'+ id)
        .end((err,res)=>{
            if(err){
                done(err)
            }else{
                expect(res.status).toEqual(200)
                done()
            }
        })

    })
})

// set('Accept', 'application/json')
// set('acess_token','token yang di generate')
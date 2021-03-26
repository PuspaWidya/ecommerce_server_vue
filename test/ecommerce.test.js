const jwt = require('jsonwebtoken')

const request = require('supertest');
const app = require('../app')
const user = {
    id: 2,
    email: 'admin@mail.com',
    password: '1234',
    role: 'admin'
}
let login = {
    email: 'admin@mail.com',
    password: '1234',
}

let token = jwt.sign(user,'top secret')

//LOGIN
describe('login',function(){
    it('should return 200 with token',function(done){
        request(app)
        .post('/login')
        .send(login)
        .end((err,res)=>{
            if(err){
                done(err)
            }else{
                expect(res.status).toEqual(200)
                expect.anything()
                done()
            }
        })
    })
})


//CRUD
//GET -> READ
describe('GET/products',function(){
    it('should return 200 with data',function(done){
        request(app)
        .get('/products')
        .set('access_token',token)
        .end((err,res)=>{
            if(err){
                done(err)
            }else{
                expect(res.status).toEqual(200)
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
        .set('access_token',token)
        .end((err,res)=>{
            if(err){ 
                done(err)
            }else{
                expect(res.status).toEqual(201)
                expect(typeof res.body).toEqual("object") //!data yang dikirim berbentuk obj
                expect(typeof res.body.id).toEqual("number")
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


//edit
describe('PUT/products/:id',function(){
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
    .set('access_token',token)
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
describe('DELETE/products/:id',function(){
    it('should return with 200 after deleting some data',function(done){
        let id = 2

        request(app)
        .delete('/products/'+ id)
        .set('access_token',token)
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



//?ERROR / FAILED TEST

//error login
//salah password
let userSalah = {
    email: 'admin@mail.com',
    password: 'salahpassword',
}
describe('login',function(){
    it('should return 400 with token',function(done){
        request(app)
        .post('/login')
        .send(userSalah)
        .end((err,res)=>{
            if(err){
                done(err)
            }else{
                expect(res.status).toEqual(401)
                expect.anything()
                done()
            }
        })
    })
})

let errDB = {
    email: 'salahemail@mail.com',
    password: 'salahpassword',
}
describe('login',function(){
    it('should return 400 with token',function(done){
        request(app)
        .post('/login')
        .send(errDB)
        .end((err,res)=>{
            if(err){
                done(err)
            }else{
                expect(res.status).toEqual(500)
                expect.anything()
                done()
            }
        })
    })
})


// error post
//missing variable
describe('POST/products',function(){
    it('should return 400 ',function(done){
        let body = {
            name : '',
            imageUrl : '',
            price : 0,
            stock:0
        }

        request(app)
        .post('/products')
        .send(body)
        .set('access_token',token)
        .end((err,res)=>{
            if(err){ 
                done(err)
            }else{
                expect(res.status).toEqual(400)
                expect(typeof res.body).toEqual("object") 
                expect(Array.isArray(res.body.errors)).toEqual(false)
                done()
            }
        })
    })
})



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
        .set('access_token',token)
        .end((err,res)=>{
            if(err){ 
                done(err)
            }else{
                expect(res.status).toEqual(400)
                expect(typeof res.body).toEqual("object") 
                expect(Array.isArray(res.body.errors)).toEqual(false) //?errors?
                done()
            }
        })
    })
})


//tidak menyertakan access token
describe('POST/products',function(){
    it('should return 400 ',function(done){
        let body = {
            name : '',
            imageUrl : '',
            price : 0,
            stock:0
        }

        request(app)
        .post('/products')
        .send(body)
        .end((err,res)=>{
            if(err){ 
                done(err)
            }else{
                expect(res.status).toEqual(500)
                expect(Array.isArray(res.body.errors)).toEqual(false)
                done()
            }
        })
    })
})

//error update product
//tanpa access_token
describe('PUT/products/:id',function(){
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
            expect(res.status).toEqual(500)
            expect(Array.isArray(res.body.errors)).toEqual(false)
            done()
        }
    })
   })
})


describe('PUT/products/:id',function(){
    it('should return with 200 with new data that has been modified',function(done){
        let id = 1
        
        let body = {
            name : 123123,
            imageUrl : 123123,
            price :-3,
            stock:-3
    }
    request(app)
    .put('/products/'+id)
    .send(body)
    .end((err,res)=>{
        if(err){
            done(err)
        }else{
            expect(res.status).toEqual(500)
            expect(Array.isArray(res.body.errors)).toEqual(false)
            done()
        }
    })
   })
})

//error delete

const user1 = {
    id: 2,
    email: 'admin@mail.com',
    password: '1234',
    role: 'customers'
}
let token1 = jwt.sign(user1,'top secret')

describe('DELETE/products/:id',function(){
    it('should return with 200 after deleting some data',function(done){
        let id = 1

        request(app)
        .delete('/products/'+ id)
        .set('access_token',token1)
        .end((err,res)=>{
            if(err){
                done(err)
            }else{
                expect(res.status).toEqual(500)
                done()
            }
        })

    })
})
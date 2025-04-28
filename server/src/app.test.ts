import request from 'supertest';
import app from './app';
 
describe('App Endpoints', () => {
  it('should respond with pong', async () => {
    const res = await request(app).get('/check');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('SUCESS');
  });


  it("upload post" ,async  ()=>{
    const newPost = {
      user_id: 1,
      title: "Leftover pizza from party ",
      description: "2 large pizzas, clean and fresh. Can pick up from my house.",
      lat: 40.7128,
      lng: -74.0060,
      status: "available"
    };

    const res = await request(app)
      .post('/api/posts/')       // your route (adjust if it's like /api/posts)
      .send(newPost)
      .expect('Content-Type', /json/)
      // .expect(201);          // usually creation returns 201 Created

    // Assertions
    expect(res.body).toHaveProperty('post_id');   // should return created post_id
    expect(res.body.user_id).toBe(newPost.user_id);
    expect(res.body.title).toBe(newPost.title);
    expect(res.body.status).toBe('available');
  });

  // it('should sum two numbers', async () => {
  //   const res = await request(app)
  //     .post('/sum')
  //     .send({ a: 5, b: 7 });
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.result).toBe(12);
  // });
});

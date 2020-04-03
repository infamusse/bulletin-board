const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const Post = require("../../../models/post.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("/GET /api/posts", () => {
  it("should return all post", async () => {
    const res = await request(server).get("/api/posts");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
  });
});

describe(" /api/post/1", () => {
  beforeEach(async () => {
    const testPost = new Post({
      _id: "5d9f1140f10a81216cfd4408",
      author: "Test Author",
      created: "2019-01-01T12:00:00.000Z",
      updated: "2019-01-01T12:00:00.000Z",
      status: "published",
      title: "Test title",
      text: "Test text"
    });
    await testPost.save();
  });

  afterEach(async () => {
    const testPost = await Post.findById("5d9f1140f10a81216cfd4408");
    testPost.remove();
  });

  it("/GET: should return post with ID 1", async () => {
    const res = await request(server).get("/api/post/5d9f1140f10a81216cfd4408");
    expect(res.status).to.be.equal(200);
    expect(res.body._id).to.be.equal("5d9f1140f10a81216cfd4408");
  });
});

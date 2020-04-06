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

describe("GET/ TEST", () => {
  beforeEach(async () => {
    const testPost = new Post({
      _id: "5d9f1140f10a81216cfd4408",
      author: "Test Author",
      created: "2019-01-01T12:00:00.000Z",
      updated: "2019-01-01T12:00:00.000Z",
      status: "published",
      title: "GET TEST",
      text: "GET TEST"
    });
    await testPost.save();
  });

  afterEach(async () => {
    const testPost = await Post.findById("5d9f1140f10a81216cfd4408");
    testPost.remove();
  });

  it("should return post with choosen ID", async () => {
    const res = await request(server).get("/api/post/5d9f1140f10a81216cfd4408");
    expect(res.status).to.be.equal(200);
    expect(res.body._id).to.be.equal("5d9f1140f10a81216cfd4408");
  });
});

describe("POST/ TEST", () => {
  const testPost = {
    author: "Test Author",
    created: "2019-01-01T12:00:00.000Z",
    updated: "2019-01-01T12:00:00.000Z",
    status: "published",
    title: "POST TEST",
    text: "POST TEST"
  };

  afterEach(async () => {
    await Post.deleteOne({ author: "Test Author" });
  });

  it("should add post and return succes", async () => {
    const res = await request(server)
      .post("/api/post")
      .send(testPost);
    const newPost = await Post.find({ author: "Test Author" });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal("OK");
    expect(newPost).to.not.be.null;
  });
});

describe("PUT/ POST", () => {
  beforeEach(async () => {
    const testPost = new Post({
      _id: "5d9f1140f10a81216cfd4408",
      author: "Test Author",
      created: "2019-01-01T12:00:00.000Z",
      updated: "2019-01-01T12:00:00.000Z",
      status: "published",
      title: "PUT TEST",
      text: "PUT TEST"
    });
    await testPost.save();
  });

  afterEach(async () => {
    const testPost = await Post.findById("5d9f1140f10a81216cfd4408");
    testPost.remove();
  });

  const changedPost = {
    _id: "5d9f1140f10a81216cfd4408",
    author: "CHANGED_AUTHOR",
    created: "2019-01-01T12:00:00.000Z",
    updated: "2019-01-01T12:00:00.000Z",
    status: "published",
    title: "PUT_TEST_CHANGED",
    text: "PUT TEST"
  };

  it("shoud change attributes in choosen post", async () => {
    const res = await request(server)
      .put("/api/post/5d9f1140f10a81216cfd4408")
      .send(changedPost);
    const resChangedPost = await Post.findById("5d9f1140f10a81216cfd4408");
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal("OK");
    expect(resChangedPost.title).to.be.equal("PUT_TEST_CHANGED");
  });
});

describe("DELETE/ POST", () => {
  const testPost = {
    _id: "5d9f1140f10a81216cfd4408",
    author: "Test Author",
    created: "2019-01-01T12:00:00.000Z",
    updated: "2019-01-01T12:00:00.000Z",
    status: "published",
    title: "DELETE TEST",
    text: "DELETE TEST"
  };

  afterEach(async () => {
    await Post.deleteOne({ author: "Test Author" });
  });
  it("shoud delete post with choosen ID", async () => {
    const res = await request(server).delete(
      "/api/post/5d9f1140f10a81216cfd4408"
    );
    const deletedPost = await Post.findById("5d9f1140f10a81216cfd4408");
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal("OK");
    expect(deletedPost).to.be.null;
  });
});

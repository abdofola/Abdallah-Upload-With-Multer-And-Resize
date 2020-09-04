const app = require("../app");
const chai = require('chai'),// Assertion library
    chaiHttp = require('chai-http');// HTTP integration testing with Chai assertions
const fs = require("fs");

// Assertion styles
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("app API", function () {
    // Test the GET route for upload.js

    describe("upload.js GET", () => {
        // happy path /upload
        it("should get the upload page", function (done) {
            chai.request(app)
                .get("/upload")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(err).to.be.null;
                    done();
                })
        });
        // unhappy path 
        it("should not get the upload page", function (done) {
            chai.request(app)
                .get("/uploads")// little tweak with original route name
                .end(function (err, res) {
                    res.should.have.status(404);
                    should.not.exist(err);
                    done();
                })
        })
        // happy path /success 
        it("should get the success page", function (done) {
            chai.request(app)
                .get("/success")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(err).to.be.null;
                    done();
                })
        });
        // unhappy path 
        it("should not get the success page", function (done) {
            chai.request(app)
                .get("/succes")// little tweak with original route name
                .end(function (err, res) {
                    res.should.have.status(404);
                    should.not.exist(err);
                    done();
                })
        })
    });

    // Test the POST route for upload.js
    describe("upload.js POST", () => {
        // happy path /upload
        it("should post form shipped with input[type=file] & img src", function (done) {
            chai.request(app)
                .post("/upload")
                .field("description", "First time we met mocha")
                .attach("sampleFile", fs.readFileSync("public/images/sampleFile-1599070557768.png"), "sampleFile-1599070557768.png")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                })
        });
        // unhappy path
        it("should not post form shipped with input[type=file] & img src", function (done) {
            chai.request(app)
                .post("/uploade")// little tweak with original route name
                .field("description", "First time we met mocha")
                .attach("sampleFile", fs.readFileSync("public/images/sampleFile-1599070557768.png"), "sampleFile-1599070557768.png")
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    done();
                })
        });
    });

});


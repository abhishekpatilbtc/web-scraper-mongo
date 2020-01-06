import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Article from "../components/Article";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Home extends Component {
  state = {
    articles: [],
    message: "Click on Scrape To Begin!"
  };


  getArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({
          articles: res.data   
        })
      )
      .catch(() =>
        this.setState({
          articles: [],
          message: "No New Articles Found, Try a Different Query"
        })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getArticles();
  };

  handlearticleSave = id => {
    const article = this.state.articles.find(article => article.id === id);

    API.savearticle({
      articleid: article.id,
      title: article.title,
      link: article.link,
    }).then(() => this.getArticles());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              {/* <h1 className="text-center">
                <strong>(React) Mongo Scrapper</strong>
              </h1> */}
              <h2 className="text-center">(WSJ) Technology</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Article Search" icon="far fa-article">
              <Form
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <Article
                     key={article.id}
                      title={article.title}
                      link={article.link}
                      Button={() => (
                        <button
                          onClick={() => this.handlearticleSave(article.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;

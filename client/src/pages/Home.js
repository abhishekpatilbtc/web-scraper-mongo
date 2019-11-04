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
    Articles: [],
    q: "",
    message: "Search For A Article To Begin!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getArticles = () => {
    API.getArticles(this.state.q)
      .then(res =>
        this.setState({
          Articles: res.data
        })
      )
      .catch(() =>
        this.setState({
          Articles: [],
          message: "No New Articles Found, Try a Different Query"
        })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getArticles();
  };

  handleArticleSave = id => {
    const Article = this.state.Articles.find(Article => Article.id === id);

    API.saveArticle({
      googleId: Article.id,
      title: Article.volumeInfo.title,
      subtitle: Article.volumeInfo.subtitle,
      link: Article.volumeInfo.infoLink,
      authors: Article.volumeInfo.authors,
      description: Article.volumeInfo.description,
      image: Article.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getArticles());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Mongo Scrapper</strong>
              </h1>
              <h2 className="text-center">Scrape articles from the website</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Article Search" icon="far fa-Article">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.Articles.length ? (
                <List>
                  {this.state.Articles.map(Article => (
                    <Article
                      key={Article.id}
                      title={Article.volumeInfo.title}
                      subtitle={Article.volumeInfo.subtitle}
                      link={Article.volumeInfo.infoLink}
                      authors={Article.volumeInfo.authors.join(", ")}
                      description={Article.volumeInfo.description}
                      image={Article.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleArticleSave(Article.id)}
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

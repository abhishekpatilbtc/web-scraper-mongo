import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Article from "../components/Article";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {
    Articles: []
  };

  componentDidMount() {
    this.getSavedArticles();
  }

  getSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({
          Articles: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleArticleDelete = id => {
    API.deleteArticle(id).then(res => this.getSavedArticles());
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
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Articles" icon="download">
              {this.state.Articles.length ? (
                <List>
                  {this.state.Articles.map(Article => (
                    <Article
                      key={Article._id}
                      title={Article.title}
                      subtitle={Article.subtitle}
                      link={Article.link}
                      authors={Article.authors.join(", ")}
                      description={Article.description}
                      image={Article.image}
                      Button={() => (
                        <button
                          onClick={() => this.handleArticleDelete(Article._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Articles</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;

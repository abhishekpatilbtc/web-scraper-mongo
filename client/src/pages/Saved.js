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
    articles: []
  };

  componentDidMount() {
    this.getSavedarticles();
  }

  getSavedarticles = () => {
    API.getSavedarticles()
      .then(res =>
        this.setState({
          articles: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handlearticleDelete = id => {
    API.deletearticle(id).then(res => this.getSavedarticles());
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
            <Card title="Saved articles" icon="download">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <article
                      key={article._id}
                      title={article.title}
                      subtitle={article.subtitle}
                      link={article.link}
                      authors={article.authors.join(", ")}
                      description={article.description}
                      image={article.image}
                      Button={() => (
                        <button
                          onClick={() => this.handlearticleDelete(article._id)}
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

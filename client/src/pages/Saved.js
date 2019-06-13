import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ 
          books: res.data, 
          title: "",
          author: "",
          description: "",
          image: "",
          link: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <p>Search for and Save Books of Interest</p>
            </Jumbotron>
            
            <Jumbotron>

              <div className="text-left">

                <h3>Results</h3>

                {this.state.books.length ? (
                  
                    <div>

                        {this.state.books.map(each => {
                          return (
                          <>

                              <div className="card bg-light mb-3">

                                <div className="card-header">

                                  <Row>
                                    <div className="col-md-3">
                                      <h5>
                                        {each.volumeInfo.title}
                                      </h5>
                                    </div>
                                    
                                    <div className="col-md-9 text-right">
                                      <button className="btn btn-outline-primary ml-2" onClick={this.deleteBook} id={each.id}>Delete</button>
                                    </div>
                                  </Row>

                                </div>

                                <div className="card-body">

                                  <Row>
                                    <Col size="md-3">
                                      <h5 className="card-title">{each.volumeInfo.authors}</h5>
                                      <img src={each.volumeInfo.imageLinks.thumbnail} />
                                    </Col>
                                    <Col size="md-9">
                                      <p>{each.volumeInfo.description}</p>
                                    </Col>
                                  </Row>

                                  </div>

                              </div>
                          </>)
                        })}
                        
                    </div>
                  
                ) : (
                  <h3>No Results to Display</h3>
                )}
                  
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;

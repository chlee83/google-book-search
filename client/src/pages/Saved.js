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
    link: "",
    _id: ""
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
          link: "",
          _id: ""
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

                              <div className="card bg-light mb-3" key={each._id}>

                                <div className="card-header">

                                  <Row>
                                    <div className="col-md-9">
                                      <h5>
                                        {each.title}
                                      </h5>
                                    </div>
                                    
                                    <div className="col-md-3 text-right">
                                    <a href={each.link} target="_blank"><button className="btn btn-outline-info">View</button></a>
                                      <button className="btn btn-outline-primary ml-2" onClick={() => this.deleteBook(each._id)} id={each._id}>Delete</button>
                                    </div>
                                  </Row>

                                </div>

                                <div className="card-body">

                                  <Row>
                                    <Col size="md-3">
                                      <h5 className="card-title">{each.authors}</h5>
                                      <img src={each.image} />
                                    </Col>
                                    <Col size="md-9">
                                      <p>{each.description}</p>
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

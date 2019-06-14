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

  saveButton = event => {
    const bookID = event.currentTarget.id;

    const book = this.state.books;
    for (var i = 0; i < this.state.books.length; i++) {

      if(bookID === book[i].id) {
        console.log(book[i])

        const dataToSave = {
          title: book[i].volumeInfo.title,
          author: book[i].volumeInfo.authors[0],
          description: book[i].volumeInfo.description,
          image: book[i].volumeInfo.imageLinks.thumbnail,
          link: book[i].volumeInfo.infoLink
        }
        console.log(dataToSave);

        API.saveBook(dataToSave);

      } 
    }
  };
  

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.state.title)
      .then(data => data.json())
      .then(data => this.setState({books: data.items}));
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">

            {/* Header */}
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <p>Search for and Save Books of Interest</p>
            </Jumbotron>

            {/* Search Book */}
            <Jumbotron>
            <form className="text-left">
              <h3>Book Search</h3>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Book Title"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
            </Jumbotron>
            
            {/* Results of search */}
            <Jumbotron>

            <div className="text-left">

              <h3>Results</h3>

              {this.state.books.length ? (
                
                  <div>

                      {this.state.books.map(each => {
                        return <>

                            <div className="card bg-light mb-3" key={each._id}>

                              <div className="card-header">

                                <Row>
                                  <div className="col-md-9">
                                    <h5>
                                      {each.volumeInfo.title}
                                    </h5>
                                  </div>
                                  
                                  <div className="col-md-3 text-right">
                                  <a href={each.volumeInfo.infoLink} target="_blank"><button className="btn btn-outline-info">View</button></a>
                                    <button className="btn btn-outline-primary ml-2" onClick={this.saveButton} id={each.id}>Save</button>
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
                        </>
                      })}
                      
                  </div>
                 
              ) : (
                <h3>No Results to Display</h3>
              )}
                

              {/* {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id}>
                      <Link to={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
                
              ) : (
                <h3>No Results to Display</h3>
              )} */}
            </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;

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
    // this.loadBooks();
    console.log("did mount")
  }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  saveButton = event => {
    const bookID = event.currentTarget.id;
    
    for (var i = 0; i < this.state.books[i].length; i++) {

      if(bookID === this.state.books[i].id) {
        console.log(this.state.books[i])
        API.saveBook(this.state.books[i]);
        
      } 

    }
  }

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

                            <div className="card bg-light mb-3">

                              <div className="card-header">

                                <Row>
                                  <div className="col-md-3">
                                    <h5>
                                      <a href={each.volumeInfo.infoLink} target="_blank">{each.volumeInfo.title}</a>
                                    </h5>
                                  </div>
                                  
                                  <div className="col-md-9 text-right">
                                  <button className="btn btn-outline-info"><a href={each.volumeInfo.infoLink} target="_blank">View</a></button>
                                    <button onClick={this.saveButton} id={each.id}>Save</button>
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

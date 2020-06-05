import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      /*
        Your code goes here
      */
      books :[]
    }
  }

  /* 
    Your code goes here
  */
  componentDidMount(){
    fetch()
  }

  render(){
    return(
      <div>
        <h1>Welcome to the book app</h1>
        <div className="contentContainer">
          <div id="booksForm">
            <BookForm />
          </div>
          <div id="books">
            {this.state.books.map((book, index) =>{
              return(
                <Book >
              )
            }
            )}
          </div>
        </div>
        {/* 
          
        */}
      </div>
    )
  }

}

export default App;

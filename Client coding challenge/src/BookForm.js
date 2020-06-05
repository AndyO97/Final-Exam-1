import React from 'react';

class BookForm extends React.Component{
    constructor(props){
        super( props );
        this.state = {
          books : []
        }
    }

    postBooks = (event) => {
        event.preventDefault();
        const nameBook = event.currentTarget.nameBook;

        const url = "";

        const settings = {
            method : "GET",
            Headers : {'content-type' : 'application/json'
            }
        }
        fetch(url, settings)
        .then(response =>{
            if(response.ok){
                response.json()
                .then(responseJSON => {
                    this.setState({books : responseJSON});
                })
            }
        })
        .catch(error =>{
            console.log(error);
        })
    }

    render(){
        return(
            <div>
                <h2>Search for a book</h2>
                <form onSubmit={this.postBooks}>
                    <label htmlFor="nameBook"> Name of the book: </label>
                    <input type="text" name="nameBook" id="nameBook"></input>
                    <button>
                        Search
                    </button>
                </form>
            </div>
        );
    }
}


export default BookForm;
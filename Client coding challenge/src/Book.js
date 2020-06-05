import React from 'react';
import { render } from 'react-dom';

class Book extends React.Component{
    constructor(props){
        super( props );
        this.state = {
            title : props.title,
            author : props.author,
            thumbnail : props.thumbnail,
            textSnippet : props.textSnippet
        }
    }

    render(){
        return(
            <div>
                {/*
                    Your code goes here
                */}
                <div className="books"> 
                <h3>Title: {this.state.title}</h3>
                <h4> author: {this.state.author}</h4>
                <h4> thumbnail: {this.state.thumbnail}</h4>
                <h4> textSnippet: {this.state.textSnippet}</h4>
                </div>
            </div>
        );
    }
}

export default Book;
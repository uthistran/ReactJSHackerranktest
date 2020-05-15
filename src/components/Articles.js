import React from 'react';

class Articles extends React.Component {
constructor(props){
  super(props)
  
  this.state ={
    result : [],
    textInput : ""
  }
  this.handleFetchClick = this.handleFetchClick.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this)
}

handleInputChange(event) {
  this.setState({
    textInput : event.target.value
  })
}

handleFetchClick(){
  let url = "https://jsonmock.hackerrank.com/api/articles?author=" + this.nameValue.value + "&page=1"
  fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            result: result.data,
            textInput : this.nameValue.value
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          
        }
      )
}


  render() {
    var result;
    if(this.state.result.length > 0){
      const getdetails = this.state.result.filter((item) => {return item.title != null});
      const books = getdetails.slice(0,3).map((item, index ) => {
        return <li key={item.title+index} data-testid="result-row">{item.title}</li>
      })
      result =  <div className="results">
        {books}
      </div>;
    } else if (this.state.textInput !== ""){
      result =  <div data-testid="no-results">No results</div>
    }
    

    

    return (
      <React.Fragment>
        <div className="controls">
          <div className="input-container">
            <span>author:</span>
            <input type="text" className="text-input" data-testid="text-input" ref={el => this.nameValue=el} />
            <button className="fetch-button" onClick={this.handleFetchClick} data-testid="fetch-button">Fetch</button>
          </div>
        </div>
       {result}
       
      </React.Fragment>
    );
  }
}

export default Articles;

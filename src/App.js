import React from 'react';
import './App.css';


const axios = require('axios')

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: '',
      randomNum: String(Math.floor(Math.random() * 5000)),
      genreApi: '',
      response: '',
      errorDes: '',
      data: [],
    };

    this.getRequest = this.getRequest.bind(this);

  }


  // Make a request for a user with a given ID
  getRequest() {
    var genre = document.getElementById('genreOption').value;
    var randomNum = String(Math.floor(Math.random() * 5000))
    var genreApi = 'https://api.jikan.moe/v3/' + genre + '/' + randomNum;


    this.setState({
      errorDes: ""
    })

    if (genre !== '') {
      axios.get(genreApi)
        .then((response) => {
          console.log(response.data)

          this.setState({
            data: [response.data.title,
            response.data.image_url,
            response.data.synopsis,
            ]
          })

          // handle success
          return response
        })
        .catch((error) => {
          // handle error
          if (error.response.status === 404) {

            randomNum = String(Math.floor(Math.random() * 5000))
            genreApi = 'https://api.jikan.moe/v3/' + genre + '/' + randomNum;
            axios.get(genreApi)
              .then((response) => {
                console.log(response.data)

                this.setState({
                  data: [response.data.title,
                  response.data.image_url,
                  response.data.synopsis,
                  ]
                })

                // handle success
                return response
              })
              .catch((error) => {
                var fileNotFounderror = "Search not found, please retry"
                console.log(typeof fileNotFounderror)
                this.setState({
                  errorDes: fileNotFounderror
                })
              })
            /*
            var fileNotFounderror = "Search not found, please retry"
            console.log(typeof fileNotFounderror)
            this.setState({
              errorDes: fileNotFounderror 
            })
            */
          } else if (error.response.status === 429) {
            this.setState({
              errorDes: "Too many searches within a period of time.  Please wait and try again."
            })
          }
          console.log(error);
        })
        .finally(() => {
          // always executed
        })
    } else {
      this.setState({
        errorDes: "Please choose anime or manga from selection"
      })
    }
  }


  // Make a request for a user with a given ID
  getSearchRequest() {
    var genre = document.getElementById('genreSearch').value;
    var searchCh = document.getElementById('searchchar').value;
    var genreApi = 'https://api.jikan.moe/v3/search/' + genre + "?q=" + searchCh + "&page=1";
    console.log(genreApi)

    axios.get(genreApi)
      .then(function (response) {
        console.log(response.data.results)

        // handle success
        return response
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });


  }



  render() {
    return (
      <div className="App">
        <h1>Anime/Manga Searcher</h1>
        <SelectOption gRequest={this.getRequest} noGenre={this.showNoGenreAlert} data={this.state.data} errorDescr={this.state.errorDes} />
        <br />

        {/* 
        <SearchOption />
        <button onClick={this.getSearchRequest}>Search</button>
        <br />
        <h2>Testing</h2>
        <p>{this.state.response}</p>
        */}
      </div>
    )
  }
}

function SelectOption(props) {
  return (
    <div>
      <h2>Find a random anime or manga:</h2>
      <select id="genreOption">
        <option value=""></option>
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
      </select>
      <br />
      <button onClick={props.gRequest}>Get Request</button>
      <p id="errorDesc">{props.errorDescr}</p>
      <section id="showResults"></section>
      <div>
        <br />
        <img src={props.data[1]}></img>
        <h3>{props.data[0]}</h3>
        <p id="searchSummary">{props.data[2]}</p>
      </div>
    </div>
  )
}

/*
function SearchOption(){
  return(
    <div>
      <h2>Search:</h2>
      <select id="genreSearch">
        <option value=""></option>
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
        <option value="person">Person</option>
        <option value="character">Character</option>
      </select>
      <br/>
      <label id="searchfield">What to search for:</label>
      <br/>
      <input id="searchchar" name="searchfield" type="text" minLength="3" placeholder="Must be 3 characters" />
      <br/>
    </div>
    )
  }
  */


export default App;

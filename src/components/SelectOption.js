import React from 'react';
import '../App.css';

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


export default SelectOption
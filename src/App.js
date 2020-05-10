import React, { Component } from "react";
import "./App.css";

import ArtistUIComponent from "./components/ArtistUIComponent";
import TracksUIComponent from "./components/TracksUIComponent";
import ErrorUIComponent from "./components/ErrorUIComponent";

const API = "https://spotify-api-wrapper.appspot.com/";

class App extends Component {
  state = {
    error: null,
    artistQuery: "",
    artist: null,
    tracks: null,
  };

  updateAristQuery = (event) => {
    this.setState({ artistQuery: event.target.value });
  };

  fadeAlert = (time) => {
    setTimeout(() => {
      this.setState({ error: null });
    }, time);
  };

  searchArist = () => {
    if (!this.state.artistQuery) {
      this.setState({ error: "Empty Search" });
      return;
    }
    fetch(`${API}/artist/${this.state.artistQuery}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.artists.total > 0) {
          const artist = json.artists.items[0];
          this.setState({ artist });

          fetch(`${API}/artist/${artist.id}/top-tracks`) //grab tracks
            .then((response) => response.json())
            .then((json) => {
              this.setState({ tracks: json.tracks });
            })
            .catch((error) =>
              this.setState({ error: "Error: " + error.message })
            );
        } else {
          this.setState({ error: "Could not find Artist. Please try Again" });
        }
      })
      .catch((error) => this.setState({ error: "Error: " + error.message }));
  };

  render() {
    return (
      <div className="jumbotron">
        <ErrorUIComponent error={this.state.error} fade={this.fadeAlert} />
        <div className="container text-center">
          <h1>Welcome to Walkmon</h1>
          <div className="input-group my-3 mx-auto w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search for an artist"
              aria-label="Recipient's username"
              onChange={this.updateAristQuery}
            />
            <div className="input-group-append">
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={this.searchArist}
                >
                Search
              </button>
            </div>
          </div>
        </div>
        <ArtistUIComponent artist={this.state.artist} />
        <TracksUIComponent tracks={this.state.tracks} />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

class TracksUIComponent extends Component {
  state = {
    isPlaying: false,
    audioObj: null,
    playingURL: null,
  };

  audioHandler = (previewURL) => () => {
    //Preventing changes in state that could cause loop
    if(!previewURL){
        return
    }
    if (!this.state.isPlaying) {
      const audio = new Audio(previewURL);
      audio.play();
      this.setState({
        isPlaying: true,
        audioObj: audio,
        playingURL: previewURL,
      });
    } else {
      this.state.audioObj.pause();
      if (this.state.playingURL === previewURL) {
        this.setState({ isPlaying: false });
      } else {
        const audio = new Audio(previewURL);
        audio.play();
        this.setState({ audioObj: audio, playingURL: previewURL });
      }
    }
  };

  iconHelper = (preview_url) => {
      if(!preview_url){
        return(
            <div className="control-icon">N/A</div>
        )
      }
      if(preview_url === this.state.playingURL && this.state.isPlaying ){
          return(
              <div className="control-icon">||</div>
          )
      } else{
          return(
              <div className="control-icon">▶</div>
          )
      }

  }
  render() {
    const { tracks } = this.props;

    if (!tracks) {
      return null;
    }
    return (
      <div className="container text-center mb-3">
        <h3>Top Tracks</h3>
        {tracks.map((track) => {
          const { id, name, album, preview_url } = track;
          return (
            <div className="m-3 d-inline-block text-center position-relative track-div" key={id} onClick={this.audioHandler(preview_url)}>
              <img 
                className="img-fluid rounded track-img"
                src={album.images[0].url} alt="track" />
              <p className="track-name text-center">{name}</p>
              {this.iconHelper(preview_url)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default TracksUIComponent;

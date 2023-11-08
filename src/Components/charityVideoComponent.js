import React, { Component } from "react";

class CharityVideoComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {videoLink: this.props.video.split("?v=")[1].split("&")[0]};
    }
    render()
    {
        return(
            <>
                <iframe id="charity-video"
                src={`https://www.youtube.com/embed/${this.state.videoLink}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube" />
            </>
        )
    }
}
export default CharityVideoComponent;
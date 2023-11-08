import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import defaultPfp from "../images/defaultPfp.png";
import ProfilePictureService from "../Services/profile-picture-service";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

class ProfileLeftContainerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { profilePicture: defaultPfp, uploadError: false, downloadError: false };
  }
  componentDidMount() {
    this.loadProfilePicture();
  }
  async loadProfilePicture() {
    let picture = await ProfilePictureService.GetById(this.props.user.id);
    if (picture) {
      this.setState({ profilePicture: "data:image/jpeg;base64," + picture.data });
      this.setState({ downloadError: false });
    } else this.setState({ downloadError: true });
  }

  Popover = () => {
    return (
      <Tooltip className='tooltip left'>
        <p>Upload new profile picture</p>
        <p>
          <i>The only supported file type is JPEG</i>
        </p>
      </Tooltip>
    );
  };

  onPfpChange = (event) => {
    event.preventDefault();
    if (null != event.target.files[0]) {
      let reader = new FileReader();
      reader.onloadend = function () {
        this.setState({ profilePicture: reader.result });

        let formData = new FormData();
        formData.set("image", event.target.files[0]);
        console.log(formData.getAll("image"), "datatata");
        ProfilePictureService.Add(this.props.user.id, formData)
          .then((response) => {
            if (!response) this.setState({ uploadError: true });
            else this.setState({ uploadError: false });
          })
          .catch((e) => {
            console.log(e, "error");
          });
      }.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  render() {
    if (this.props.user.isCharity) {
      return null;
    }
    return (
      <>
        <div id='pfp-fullsize'>
          <img src={this.state.profilePicture} alt='Yours' />
        </div>
        {!this.props.otherUser ? (
          <OverlayTrigger placement='right' overlay={this.Popover()}>
            <label className='editPicture' htmlFor='pfp-upload-input'>
              <img src='https://img.icons8.com/fluency-systems-filled/48/000000/edit.png' />
            </label>
          </OverlayTrigger>
        ) : null}
        <input name='pfp-upload-input' id='pfp-upload-input' type={"file"} accept='image/*' onChange={this.onPfpChange} />
        <div className={"network-error"}>
          {this.state.downloadError ? "There has been an error while loading the profile picture. Try again" : ""}
        </div>
        <div className={"network-error"}>
          {this.state.uploadError ? "There has been an error while uploading the profile picture. Try again" : ""}
        </div>
      </>
    );
  }
}
export default ProfileLeftContainerComponent;

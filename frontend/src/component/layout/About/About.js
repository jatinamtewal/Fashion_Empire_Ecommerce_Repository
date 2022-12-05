import React, { Fragment } from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import MetaData from "../MetaData";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/fashionempirebarara/";
  };
  return (
    <Fragment>
      <MetaData title="About Us - FASHION EMPIRE" />
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="data:image/png;base64,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"
              alt="Founder"
            />
            <Typography>Fashion Empire</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            {/* <a
              href="https://www.youtube.com"
              target="_blank" rel="noreferrer"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a> */}

            <a href="https://www.instagram.com/fashionempirebarara/" target="_blank" rel="noreferrer">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default About;

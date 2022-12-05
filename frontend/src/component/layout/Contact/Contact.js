import React, { Fragment } from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";


const Contact = () => {
  return (
    <Fragment>
    <MetaData title="Contact - FASHION EMPIRE" />
    <div className="contactContainer">
      <a className="mailBtn" href="https://ig.me/m/fashionempirebarara" target="_blank" rel="noreferrer">
        <Button>Contact: Fashion Empire</Button>
      </a>
    </div>
    </Fragment>
  );
};

export default Contact;

import React, { Component } from "react";

export class newsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a
              target="_blank"
              href={newsUrl}
              className="btn btn-dark btn-sm"
              rel="noreferrer"
            >
              Reed More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default newsItem;

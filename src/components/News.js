import React, { Component } from "react";
import NewsItem from "./NewsItem";
export class News extends Component {
  constructor() {
    super();
    this.state = { articles: [], loading: false, page: 1 };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=ed009b0d81c841a6a71be7419dc32e5e&page=1&pageSize=18";
    let data = await fetch(url);
    let paresedData = await data.json();
    console.log(paresedData);
    this.setState({
      articles: paresedData.articles,
      totalResults: paresedData.totalResults,
    });
    console.log(data);
  }
  handelPreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ed009b0d81c841a6a71be7419dc32e5e&page=${
      this.state.page - 1
    }&pageSize=18`;
    let data = await fetch(url);
    let paresedData = await data.json();
    this.setState({ articles: paresedData.articles });
    console.log(paresedData);
    this.setState({
      page: this.state.page - 1,
    });
  };

  handelNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ed009b0d81c841a6a71be7419dc32e5e&page=${
      this.state.page + 1
    } &pageSize=18`;

    if (Math.ceil(this.state.totalResults / 18) < this.state.page + 1) {
    } else {
      let data = await fetch(url);
      let paresedData = await data.json();
      this.setState({ articles: paresedData.articles });
      console.log(paresedData);

      this.setState({
        page: this.state.page + 1,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2>Todays Top HeadLines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imgUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://halove-centrum.cz/wp-content/uploads/2017/06/news-image.jpg"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button "
              class="btn btn-dark"
              onClick={this.handelPreviousClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              class="btn btn-dark"
              onClick={this.handelNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;

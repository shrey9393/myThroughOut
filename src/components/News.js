import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = { articles: [], loading: false, page: 1 };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ed009b0d81c841a6a71be7419dc32e5e&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let paresedData = await data.json();
    console.log(paresedData);
    this.setState({
      articles: paresedData.articles,
      totalResults: paresedData.totalResults,
      loading: false,
    });
    console.log(data);
  }
  handelPreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=ed009b0d81c841a6a71be7419dc32e5e&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let paresedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: paresedData.articles,
      loading: false,
    });
  };

  handelNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=ed009b0d81c841a6a71be7419dc32e5e&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    if (
      !Math.ceil(this.state.totalResults / this.props.pageSize) <
      this.state.page + 1
    ) {
      this.setState({ loading: true });
      let data = await fetch(url);
      let paresedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: paresedData.articles,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          <h2>Todays Top HeadLines</h2>
        </h1>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
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
              disabled={
                this.state.totalResults / this.props.pageSize <
                this.state.page + 1
              }
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

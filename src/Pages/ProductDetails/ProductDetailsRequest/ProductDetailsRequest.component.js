import React, { Component } from "react";

import "./ProductDetailsRequest.styles.scss";

class ProductDetailsRequest extends Component {
  state = {
    activeContent: 0,
  };

  getNewReviewValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postNewReview = () => {};

  postReviewCount = async (id) => {
    try {
      const response = await fetch(
        "http://10.58.6.216:8000/user/product/5/reviews",
        {
          method: "POST",
          body: JSON.stringify({ review_id: id }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("!!error_error!!");
    }
  };

  openContent = (e, reviewId) => {
    this.postReviewCount(reviewId);
    let id = "";
    e.target.tagName === "TD"
      ? (id = e?.target.parentElement.dataset.idx)
      : (id = e?.target.dataset.idx);

    this.setState({
      activeContent: id,
    });
  };

  getPage = async (e) => {
    const offset = e?.target.dataset.idx * 10;
    const limit = offset + 10;
    const response = await fetch(
      `http://10.58.6.216:8000/user/product/5/reviews?offset=${offset}&limit=${limit}`,
      { method: "GET" }
    );
    const { review_list } = await response.json();
    this.setState({
      reviewList: review_list,
    });
  };

  getRequestData = async () => {
    const OFFSET = 0;
    const LIMIT = 10;
    const response = await fetch(
      `http://10.58.6.216:8000/user/product/5/reviews?offset=${OFFSET}&limit=${LIMIT}`,
      { method: "GET" }
    );
    const { review_list, total_count } = await response.json();
    const totalPages = [];
    const pages =
      total_count % LIMIT
        ? Math.floor(total_count / LIMIT) + 1
        : Math.floor(total_count / LIMIT);
    for (let i = 1; i <= pages; i++) {
      totalPages.push(i);
    }

    this.setState({
      reviewList: review_list,
      totalCount: total_count,
      totalPages,
    });
  };

  componentDidMount() {
    this.getRequestData();
  }

  // conditional rendering
  // !data.length && return <div>Loading...</div>
  render() {
    const { reviewList, activeContent, totalPages } = this.state;

    return (
      <div className="ProductDetailsRequest">
        <div className="review-header">
          <h5>product review</h5>
          <div className="review-caution">
            <ul>
              <li>
                ????????? ?????? ????????? ????????? ???????????????. ?????? ???????????? ????????? ??????
                ?????? ???????????? ?????? ?????? ??????????????? ???????????? ????????????.
              </li>
              <li>
                ????????????, ??????(??????/??????/??????) ?????? ?????? ??? ??????????????? ????????????
                ??? <u>1:1??????</u> ??? ???????????????.
              </li>
            </ul>
            <select name="" id="">
              <option value="1">???????????????</option>
              <option value="2">??????????????????</option>
              <option value="3">???????????????</option>
            </select>
          </div>
        </div>
        <div className="review-board">
          <table className="review-thead">
            <thead>
              <tr>
                <th>??????</th>
                <th>??????</th>
                <th>????????????</th>
                <th>?????????</th>
                <th>?????????</th>
                <th>??????</th>
                <th>??????</th>
              </tr>
            </thead>
          </table>
          <ul className="review-list">
            {reviewList &&
              reviewList.map((review) => {
                return (
                  <li key={review.id}>
                    <table className="review-tbody">
                      <tbody>
                        <tr
                          data-idx={review.id}
                          onClick={(e) => this.openContent(e, review.id)}
                        >
                          <td>{review.id}</td>
                          <td>{review.title}</td>
                          <td>{review.user_rank}</td>
                          <td>{review.user_name}</td>
                          <td>{review.create_time}</td>
                          <td>{review.help_count}</td>
                          <td>{review.views_count}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      className={`review-content ${
                        +activeContent === review.id ? "" : "display-none"
                      }`}
                    >
                      <h3>{review.product_name}</h3>
                      <img src={review.image_url} alt="" />
                      <p>{review.content}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="review-write">
          <form action="" className="review-input">
            <input
              type="text"
              name="newReviewTitle"
              onChange={this.getNewReviewValue}
            />
            <input
              type="text"
              name="newReviewContent"
              onChange={this.getNewReviewValue}
            />
          </form>
          <button onClick={this.postNewReview}>????????????</button>
        </div>

        <div className="pagination">
          <ul>
            <li>
              <i className="fas fa-angle-double-left" />
            </li>
            <li>
              <i className="fas fa-angle-left" />
            </li>
            {totalPages &&
              totalPages.map((page, idx) => (
                <li key={idx} data-idx={idx} onClick={this.getPage}>
                  {page}
                </li>
              ))}

            <li>
              <i className="fas fa-angle-right" />
            </li>
            <li>
              <i className="fas fa-angle-double-right" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProductDetailsRequest;

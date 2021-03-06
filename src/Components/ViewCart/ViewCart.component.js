import React, { Component } from "react";
import { connect } from "react-redux";
import { filterOutSoldoutItems } from "../../redux/cart/cart.actions";
import CartItem from "../CartItem/CartItem.component";
import { SEND_RECENT_ITEM_SELECTED_API } from "../../config";
import {
  toggleAllSelectCheckBox,
  deleteSelectedItems,
  selectedItemsTotalPrice,
  checkStatusAllSelectCheckBox,
  getSelectedItemsAmount,
  checkDiscountTotalPrice,
} from "../../redux/cart/cart.actions";
import "./ViewCart.styles.scss";
class ViewCart extends Component {
  componentDidMount() {
    const {
      checkStatusAllSelectCheckBox,
      getSelectedItemsAmount,
      checkDiscountTotalPrice,
    } = this.props;
    checkStatusAllSelectCheckBox();
    getSelectedItemsAmount();
    checkDiscountTotalPrice();
  }
  allSelectCheckboxClick = () => {
    const {
      toggleAllSelectCheckBox,
      selectedItemsTotalPrice,
      getSelectedItemsAmount,
      checkDiscountTotalPrice,
      userToken,
    } = this.props;
    toggleAllSelectCheckBox();
    selectedItemsTotalPrice();
    getSelectedItemsAmount();
    checkDiscountTotalPrice();
    fetch(SEND_RECENT_ITEM_SELECTED_API, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        selected: "all",
      }),
    }).catch((error) => console.log(error));
  };
  selectedItemDeleteCheckboxCLick = () => {
    const {
      deleteSelectedItems,
      selectedItemsTotalPrice,
      checkStatusAllSelectCheckBox,
      getSelectedItemsAmount,
      checkDiscountTotalPrice,
      userToken,
    } = this.props;
    deleteSelectedItems();
    selectedItemsTotalPrice();
    checkStatusAllSelectCheckBox();
    getSelectedItemsAmount();
    checkDiscountTotalPrice();
    fetch(SEND_RECENT_ITEM_SELECTED_API, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        delete: "selected",
      }),
    }).catch((error) => console.log(error));
  };
  soldOutItemDeleteButtonClick = () => {
    const {
      filterOutSoldoutItems,
      selectedItemsTotalPrice,
      checkStatusAllSelectCheckBox,
      getSelectedItemsAmount,
      checkDiscountTotalPrice,
      userToken,
    } = this.props;
    filterOutSoldoutItems();
    selectedItemsTotalPrice();
    checkStatusAllSelectCheckBox();
    getSelectedItemsAmount();
    checkDiscountTotalPrice();
    fetch(SEND_RECENT_ITEM_SELECTED_API, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        delete: "soldout",
      }),
    }).catch((error) => console.log(error));
  };
  render() {
    const { cartItems, allSelect, seletectedItemsAmount } = this.props;
    return (
      <div className="ViewCart">
        <div className="selected-items">
          <div className="selected-items-header">
            <div className="selected-items-header-select">
              <label>
                <input
                  type="checkbox"
                  onChange={this.allSelectCheckboxClick}
                  checked={!!allSelect}
                />
              </label>
              <span className="select-all">
                ???????????? (<span className="count">{seletectedItemsAmount}</span>
                /<span className="total">{cartItems.length}</span>)
              </span>
            </div>
            <div className="selected-items-header-info">
              <span>????????????</span>
            </div>
            <div className="selected-items-header-count">
              <span>??????</span>
            </div>
            <div className="selected-items-header-cost">
              <span>????????????</span>
            </div>
          </div>
          <div className="selected-items-info">
            {cartItems.map((cartItem) => {
              return (
                <CartItem
                  key={cartItem.id}
                  cartItemInfo={cartItem}
                  checked={cartItem.checked}
                />
              );
            })}
          </div>
        </div>
        <div className="selected-options-container">
          <div className="selected-options">
            <div className="select-all">
              <div>
                <input
                  type="checkbox"
                  onChange={this.allSelectCheckboxClick}
                  checked={allSelect ? "checked" : ""}
                />
              </div>
              <span>
                ???????????? {`(${seletectedItemsAmount}/${cartItems.length})`}
              </span>
            </div>
            <button
              className="select-delete"
              onClick={this.selectedItemDeleteCheckboxCLick}
            >
              ?????? ??????
            </button>
            <button
              className="sold-out-delete"
              onClick={this.soldOutItemDeleteButtonClick}
            >
              ?????? ?????? ??????
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ cart, user }) => ({
  cartItems: cart.cartItems,
  allSelect: cart.allSelect,
  seletectedItemsAmount: cart.seletectedItemsAmount,
  userToken: user.userToken,
});
export default connect(mapStateToProps, {
  toggleAllSelectCheckBox,
  deleteSelectedItems,
  selectedItemsTotalPrice,
  checkStatusAllSelectCheckBox,
  getSelectedItemsAmount,
  filterOutSoldoutItems,
  checkDiscountTotalPrice,
})(ViewCart);

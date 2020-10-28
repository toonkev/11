import React, { Component } from "react";
import MainBanner from "./MainBanner/MainBanner.component";
import SideMenu from "../../Components/SideMenu/SideMenu.component";
import SectionRender from "./SectionRender/SectionRender.component";
import "./Main.styles.scss";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      specialSections: [],
      scrollTop: 0,
      // lastScrollTop: 0,
      position: -2,
    };
    this.main = React.createRef();
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/data/main/MainPageSectionsDataArr.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          specialSections: res.specialProductsSections,
        });
      })
      .catch((error) => console.log(error.message));
    const scrollTop = this.main.current.scrollTop;
    this.setState({
      scrollTop,
    });
  };

  onScrollDown = () => {
    this.setState(
      {
        position: -1,
      },
      () => {
        setTimeout(() => {
          const scrollTop = this.main.current.scrollTop;
          this.setState({ position: scrollTop > 5350 ? 2 : 0 });
          console.log(scrollTop);
          setTimeout(() => {
            this.setState({ scrollTop });
          }, 200);
        }, 200);
      }
    );
  };

  onScrollUp = () => {
    this.setState(
      {
        position: 1,
      },
      () => {
        setTimeout(() => {
          const scrollTop = this.main.current.scrollTop;
          this.setState({ position: scrollTop === 0 ? -2 : 0 });
          setTimeout(() => {
            this.setState({ scrollTop });
          }, 200);
        }, 200);
      }
    );
  };

  toggleSideMenuPosition = () => {
    const scrollTop = this.main.current.scrollTop;
    const posToDefaultCondition = scrollTop >= 240;
    const posToInitialCondition = scrollTop < 240;
    const posOnScrollDownCondition =
      scrollTop >= 240 && scrollTop > this.state.scrollTop;
    const posOnScrollUpCondition =
      scrollTop >= 240 && scrollTop < this.state.scrollTop;
    let position = -2;
    this.setState({
      scrollTop,
    });
    if (posToDefaultCondition) position = 0;
    if (posToInitialCondition) position = -2;
    if (posOnScrollDownCondition) {
      this.onScrollDown();
    } else if (posOnScrollUpCondition) {
      this.onScrollUp();
    } else {
      this.setState({
        position,
      });
    }
  };

  render() {
    const { specialSections, position } = this.state;
    return (
      <div
        className="Main"
        ref={this.main}
        onScroll={this.toggleSideMenuPosition}
      >
        <MainBanner />
        <SideMenu position={position} />
        {specialSections.map((section) => (
          <SectionRender section={section} key={section.id} />
        ))}
      </div>
    );
  }
}

export default Main;

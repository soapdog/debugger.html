const React = require("react");
const { DOM: dom, PropTypes, Component } = React;
const ReactDOM = require("react-dom");

import debounce from "lodash/debounce";

require("./Popover.css");

class Popover extends Component {
  constructor() {
    super();
    this.state = {
      left: 0,
      top: 0,
    };
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const { width } = el.getBoundingClientRect();
    const {
      left: targetLeft,
      width: targetWidth,
      bottom: targetBottom,
    } = this.props.target.getBoundingClientRect();

    // width division corresponds to calc in Popover.css
    const left = targetLeft + targetWidth / 2 - width / 5;
    const top = targetBottom;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ left, top });
  }

  onMouseLeave() {
    debounce(
      function() {
        // check to see if the cursor is over the element
        const el = document.querySelectorAll(":hover");
        const hasLeft = !el.classList.has("popover");
        if (hasLeft) {
          this.props.onMouseLeave();
        }
      },
      100
    );
  }

  render() {
    const { children } = this.props;
    const { top, left } = this.state;

    return dom.div(
      {
        className: "popover",
        onMouseLeave: this.onMouseLeave,
        style: { top, left },
      },
      dom.div({ className: "popover-gap" }),
      children
    );
  }
}

Popover.propTypes = {
  target: PropTypes.object,
  children: PropTypes.object,
  onMouseLeave: PropTypes.func,
};

Popover.defaultProps = {
  onMouseLeave: () => {},
};

Popover.displayName = "Popover";

module.exports = Popover;

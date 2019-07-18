import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./genericDropdown.css";

interface genericDropdownProps {
  display: string;
  contents: Array<any>;
  handleChange: any;
}

class GenericDropdown extends React.Component<genericDropdownProps, {}> {
  constructor(props: genericDropdownProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    this.props.handleChange(e.target.value);
  }

  componentDidMount() {}

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {this.props.display}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {this.props.contents.map(item => (
            <Dropdown.Item
              as="button"
              onClick={this.handleChange}
              key={item.value}
              value={item.value}
            >
              {item.display}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default GenericDropdown;

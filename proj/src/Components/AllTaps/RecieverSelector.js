import React from 'react';
import ReactDOM from "react-dom";
import Select from 'react-select'


class RecieverSelector extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: 'آرام'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          اختر المرسل إليه:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="آرام">آرام</option>
            <option value="آثار">آثار</option>
            <option value="بتول">بتول</option>
            <option value="هيا">هيا</option>
          </select>
        </label>
      </form>
    );
  }
}

ReactDOM.render(
  <RecieverSelector />,
  document.getElementById('root')
);

export default RecieverSelector;
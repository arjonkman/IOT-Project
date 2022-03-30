// create a react component that lets you upload a file and give it to a backend.
import { Component } from "react";
import axios from "axios";

class Upload extends Component {
      state = {
    file: null,
    data: null,
    loading: false,
    error: null,
  };

  handleChange = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append("file", this.state.file);
    try {
      const res = await axios.post(
        "http://193.42.11.96:5000/api/upload",
        formData
      );
      this.setState({
        data: res.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="file"
            name="file"
            onChange={this.handleChange}
            required
          />
          <button type="submit">Upload .csv file</button>
        </form>
        {this.state.loading && <p>Loading ...</p>}
        {this.state.data && (
          <pre>
            <code>{JSON.stringify(this.state.data, null, 2)}</code>
          </pre>
        )}
        {this.state.error && <p>{this.state.error.message}</p>}
      </div>
    );
  }
}

export default Upload;
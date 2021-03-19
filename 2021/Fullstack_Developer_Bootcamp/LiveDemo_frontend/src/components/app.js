import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) 
  {
    super(props);
    this.state = 
    {
      apiData: {},
      slug: "",
      id: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e)
  {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleOnSubmit(e)
  {
    e.preventDefault();

    let slug = this.state.slug;
    let id = this. state.id;

    axios.get(`http://localhost:4000/${slug}/${id}`)
      .then(res => this.setState({ apiData: res.data.result.properties }))

      .catch(err => {console.error("Fetch error" + err)});
  }

  render() {
    return (
      <div className="app">
        <h1>Our Starwars App</h1>
        <form onSubmit={this.handleOnSubmit}>
          <label>Slug</label>
          <input type="text" name="slug" value={this.state.slug} onChange={this.handleOnChange} />
          <label>ID</label>
          <input type="text" name="id" value={this.state.id} onChange={this.handleOnChange} />
          <input type="submit" value="submit" />
        </form>
        <div>
          <h3>Available Slugs</h3>
          <div>People, Planets, Starships</div>
        </div>
        <h1>{this.state.apiData.name}</h1>
        <div class="info-wrapper">
          {
            Object.keys(this.state.apiData).length 
            ? 
            Object.keys(this.state.apiData).map((key, index) => (
              <div>
                <p>{key}: {this.state.apiData[key]}</p>
              </div>
            ))
            :
            null
            
          }
        </div>
        <h1>{console.log(this.state.apiData)}</h1>
      </div>
    );
  }
}

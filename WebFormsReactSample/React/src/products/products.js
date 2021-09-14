import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import ItemInfo from "components/itemInfo";

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    componentDidMount() {
        this.retrieveData();
    }

    retrieveData() {
        let endpoint = window.baseUrl + "api/Products/";
        fetch(endpoint)
            .then(res => res.json())
            .then(
                (result) => {
                    // const pro = result.map((item) => { return { name: item.DatasetName }; });
                    this.setState({
                        products: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }

    render() {
        return (
            <div>
                <h1>Products:</h1>
                <ul>
                    {this.state.products.map(product => <li key={product.Id}><ItemInfo item={product} /></li>)}
                </ul>
                <div>
                <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
                </div>
            </div >
        );
    }
}

export default hot(Products);

function Home() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }
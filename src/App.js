import React, { Component, Fragment } from "react";
import "./App.css";
import ProductList from './components/ProductList'
//const formatNumber = (number) => new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);
class App extends Component {
  state = {
    search: '',
    products: [],
    filteredProduct: [],
    total: ''
  } 

  searchItem = (e) => {
    this.setState({
      search: e.target.value
    }, () => {
      this.filterProducts(this.state.search);
    })    
  }

  filterProducts(sString) {
      this.setState({
        products: this.filterItem(sString)
      }, () => {
        this.setState({
          total: this.filterItem(sString).reduce((acc, item) => acc + item.unitPrice, 0)
        })
      })
  }

  filterItem(sString) {
    return this.state.filterProducts.filter((item)=> item.name.toLowerCase().includes(sString.toLowerCase()))
  }

  formatNumber = (number) => new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

  componentDidMount() {
    console.log('component did mount')
    this.getData();
  }

  getData=()=>{
    fetch('api/branch1.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then((response) => {
        console.log('fetch')
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          products: myJson.products,
          filterProducts: myJson.products,
          total: myJson.products.reduce((acc, item) => acc + item.unitPrice, 0),
          revenue: (myJson.products.reduce((acc, item) => acc + item.unitPrice, 0) / myJson.products.length) * myJson.products.reduce((acc, item) => acc + item.sold, 0)
        }, () => {
          console.log(this.state)
        })      
      });
  }

  render() {
    return (
    <Fragment>
        <div className="product-list">
          <label>Search Products</label>
          <input type="text" onChange={this.searchItem} />
          
          <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
          <tfoot>
            <tr>
              <td>Total: &#8377;{this.formatNumber(this.state.total)}</td>
              <td>&#8377;{this.formatNumber(this.state.revenue)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <ProductList products={this.state.products}></ProductList>
    </Fragment>
  );
  }
}

export default App;

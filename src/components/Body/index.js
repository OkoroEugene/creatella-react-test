import React from 'react';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';
import axios from 'axios';
import { relativeTime, genRan, appendAdvert } from '../../helpers';
import Ads from '../Ads';
import './styles.css';
import ProductCard from '../ProductCard';
import Loader from '../Loader';

export default class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            filteredProducts: [],
            sort: undefined,
            fetching: true,
            isScrollFetching: false,
            filterFinished: false,
            message: 'not at bottom',
            meta: undefined,
            ads: false,
            adSrc: [],
            fetchAds: false,
            count: 20
        }

        this.filterStart = 0;
        this.itemsPerFilter = 12;
        this.filterEnd = 0;
        this.index = 0;
        this.scrolled = false;
        this.lastIndex = null;
        this.query = 0;

        this.handleScroll = this.handleScroll.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    /****
     * For the purpose of this project, i did not use redux for state management
     * Redux would definitely come in handy when am doing a full blown application
     * I could as well come up with the react native project for this task
     * @fetchProduct is called at the initial render of this component, this fetches all products from the API given
     * @appendAdvert handles the logic for the ADS appearing after every 20th product displayed
     * @filterProducts returns the filtered product array and paginates it (Infinte Scroll)
     * @handleSort returns the sorted product
     * @handleScroll checks if the user has scrolled to the bottom of the webpage
     * @showAds returns the jsx component for the ad banner
     * @productView returns the jsx component for the products
     */

    componentDidMount() {
        this.fetchProduct(`${process.env.API_URL}/products`);
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    fetchProduct(url) {
        axios.get(url).then(response => {
            this.setState({
                fetching: false,
                products: appendAdvert(response.data)
            })
            this.filterProducts();
        })
    }

    filterProducts(event) {
        var products = event === "sort" ? appendAdvert(this.state.products) : this.state.products;
        if (this.state.products.length < this.filterEnd) {
            return this.setState({
                filterFinished: true,
                isScrollFetching: false,
                filteredProducts: products.slice(this.filterStart, this.filterEnd)
            })
        }

        event !== "sort" ? this.filterEnd += this.itemsPerFilter : this.filterEnd;
        return this.setState({
            filteredProducts: products.slice(this.filterStart, this.filterEnd),
            isScrollFetching: true
        })
    }

    handleSort(event) {
        this.setState({ fetching: true, isScrollFetching: false, filterFinished: false })
        let { name, value } = event.target;
        axios.get(`${process.env.API_URL}/api/products?_sort=${value}`).then(response => {
            this.setState({
                fetching: false,
                products: response.data
            }, () => {
                this.filterProducts("sort");
            })
        })
    }

    handleScroll() {
        if (!this.scrolled) {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) && this.filterEnd > 0) {
                this.scrolled = true;
                setTimeout(() => {
                    this.filterProducts();
                    this.scrolled = false;
                }, 2000);
            }
        }
    }

    render() {
        const {
            fetching,
            count,
            filteredProducts,
            products,
            filterFinished,
            isScrollFetching } = this.state;

        return (
            <Container>
                <section>
                    <Row>
                        <Col sm={12} ref="card">
                            {filteredProducts.length > 0 ? <span>
                                Showing{" "}
                                <b>{filteredProducts.length > 0 && filteredProducts.length}{" - "} {products.length} {" "}</b>
                                faces
                            </span> : null}
                            <Card className="card0">
                                <Card.Header className="cardHead0">
                                    <div style={{ float: "left" }}>
                                        <span>EXPLORE POPULAR ASCII FACES</span>
                                    </div>
                                    <div style={{ float: "right" }}>
                                        <select
                                            style={{
                                                width: 210,
                                                height: 35,
                                                fontWeight: "bold"
                                            }}
                                            className="form-control"
                                            onChange={this.handleSort}
                                            name="sort"
                                        >
                                            <option>-- sort data --</option>
                                            <option value="price">price</option>
                                            <option value="size">size</option>
                                            <option value="id">id</option>
                                        </select>
                                    </div>
                                </Card.Header>

                                <Row id="ad0" ref="ad0" style={{ padding: 35, flex: 1, justifyContent: "center" }}>
                                    {fetching ? <Loader /> :
                                        <ProductCard
                                            products={filteredProducts}
                                            count={count}
                                        />}
                                </Row>
                                {isScrollFetching && filteredProducts.length > 0 ?
                                    <p style={{ textAlign: "center" }}><Loader /></p> : null}

                                {filterFinished && filteredProducts.length > 0 ?
                                    <p><h3 style={{ textAlign: "center", color: "#B22222" }}>--- end of catalogue ---</h3></p> : null}
                            </Card>
                        </Col>
                    </Row>
                </section>
            </Container >
        );
    }
}
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col } from 'reactstrap';
import queryString from 'query-string';

import restaurantSelectors from 'app/redux/selectors/restaurant';
import restaurantActions from 'app/redux/actions/restaurant';
import searchSelectors from 'app/redux/selectors/search';
import weekdayActions from 'app/redux/actions/weekday';
import weekdaySelectors from 'app/redux/selectors/weekday';

import SearchBar from './SearchBar';
import './BrowsePage.scss';

class BrowsePage extends Component {

    componentWillMount = () => {
        this.fetchRestaurantData();
        this.props.GetWeekdays();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.location !== prevProps.location) {
            this.fetchRestaurantData();
        }
    }
    
    fetchRestaurantData = () => {
        const { search } = this.props.location;
        if(search==""){
            this.props.GetRestaurants();
        }
        else{
            let filters = queryString.parse(search);
            this.props.SearchRestaurants(filters);
        }
    }

    handleSearchSubmit = (searchFilters) => {
        // build query string
        let searchQuery = Object.keys(searchFilters)
                            .filter(key => searchFilters[key] != "")
                            .map(key => `${key}=${searchFilters[key]}`)
                            .join("&");
        // modify url with search filter
        this.props.history.push({
            pathname: '/browse',
            search: searchQuery
        });
    }

    renderListItem = () => {
        const { location, AllRestaurants, SearchedRestaurants } = this.props;
        const restaurants = location.search == "" ? AllRestaurants : SearchedRestaurants
        return restaurants.map(restaurant => {
            return (
                <ListGroupItem className="restaurant-list-item">
                    <ListGroupItemHeading className="list-item-heading">
                        {restaurant.name}
                    </ListGroupItemHeading>
                    <ListGroupItemText style={{fontSize:'60%'}}>
                        {restaurant.scheduleInfo}
                    </ListGroupItemText>
                </ListGroupItem>
            )
        });
    }
    
    render(){
        const { search } = this.props.location;

        return (
            <div className="container">
                <Row className="mt-2">
                    <Col md={{size:8,offset:2}} >
                        <Row>
                            <SearchBar onSearchSubmit={this.handleSearchSubmit}
                                       filters={queryString.parse(search)}
                                       weekdays={this.props.Weekdays}/>
                        </Row>
                        <Row className="mt-5 restaurant-list-container circle-scrollbar">
                            <ListGroup style={{width:'95%'}}>
                                { this.renderListItem() }
                            </ListGroup>
                        </Row>
                    </Col>
                </Row>
                
            </div>
            
        )
        
    }
}

const mapStateToProps = (state) => (
    {
        AllRestaurants : restaurantSelectors.getAllRestaurants(state),
        SearchedRestaurants : searchSelectors.getSearchedRestaurants(state),
        Filters : searchSelectors.getSearchFilters(state),
        Weekdays : weekdaySelectors.getAllWeekdays(state)
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        GetRestaurants : () => dispatch(restaurantActions.GetRestaurants()),
        SearchRestaurants : (filters) => dispatch(restaurantActions.SearchRestaurants(filters)),
        GetWeekdays : () => dispatch(weekdayActions.GetWeekdays())
    }
)

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(BrowsePage)) 
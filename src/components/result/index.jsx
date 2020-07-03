import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../loader/index.jsx';
import Item from '../item/index.jsx';
import Settings from '../settings/index.jsx'
import LineChart from '../Chart/index.js';
import {renderAppropriateList} from '../../utilites/index.js'
import './style/style.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Result extends Component {
    constructor(props){
        super(props);
        this.state = {
            newsList :{}
        }
    }
    renderListType(list, currentPage, searchType) {
        const {searchValue} = this.props;
        const currentPageItems = list && list[currentPage];
        cookies.set("items", []);
        var temp= currentPageItems && currentPageItems.hits.map(
            (item,index) =><span key={index}>{<Item index={index}
                                                     item = {item}
                                                     searchValue = {searchValue}
                                                     searchType = {searchType}
                                                     handleUpVote = {this.props.handleUpVote}
                                                     upVotes = {this.props.upvotes}
                                                />}</span>
        );
        //var chart = ()=>{<div><LineChart displayedItems={cookies.get('items')} onChartRender = {this.handleChartRender} />}
        return temp;
    }

    renderList(){
        const {currentPage, searchValue, showSettings, searchTypeSearch, searchTypeNews} = this.props;
        const {isFetching, listStory, listComment} = this.props.news;
        const searchType = searchValue ? searchTypeSearch : searchTypeNews;
        const {isFetching: isFetchingSearch, list: searchList} = this.props.search;
        const list = renderAppropriateList(searchType, listStory, listComment);
        if (showSettings) {
            return <Settings/>
        } else if (searchValue) {
            return isFetchingSearch ? <Loader/> : this.renderListType(searchList, currentPage, searchType)
        } else {
            return isFetching ? <Loader/> : this.renderListType(list, currentPage, searchType)
        }
    }
    render(){
        return (
            <div className="search_result">
                <div>{this.renderList()}</div>
                 <div class="search_line"></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {news, news: {listStory, listComment, searchType: searchTypeNews}, search} = state;
    const {searchType: searchTypeSearch} = state.search;
    return {news, listStory, listComment, searchTypeNews, searchTypeSearch, search}
}

export default connect(mapStateToProps, null)(Result);

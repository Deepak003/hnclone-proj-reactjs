import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './header/index.jsx';
import Filters from './filters/index.jsx';
import Result from './result/index.jsx';
import Pagination from './pagination/index.jsx';
import LineChart from './Chart/index.js';
import Cookies from 'universal-cookie';
import {renderAppropriateList} from '../utilites/index.js'
import {fetchAllStoriesIdsAsync, fetchOnSearchAsync} from '../actions/network.js'
import './style.css'

const cookies = new Cookies();
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentPage: 1,
            searchValue: "",
            showSettings: false,
            upvotes : [],
            chartData :[]
        }
        this.handleCurrentPage = this.handleCurrentPage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSettings = this.handleSettings.bind(this);
        this.handleUpVote = this.handleUpVote.bind(this);
    }

    componentDidMount(){
        this.props.fetchAllStoriesIdsAsync({});
    }

    componentDidUpdate(prevProps, prevState){
        const {currentPage, searchValue} = this.state;
        const {searchType, searchBy, searchFor} = this.props;
        if (searchValue === "" && prevState.searchValue !== "") {
            this.props.fetchAllStoriesIdsAsync({currentPage, searchType, searchBy, searchFor})
        }
    }

    handleSettings(){
        this.setState({showSettings: !this.state.showSettings})
    }

    handleUpVote(objectID){
      const upvotes = cookies.get("upvotes");
      let _upvotes = upvotes || [];
      console.log("item.id::"+ objectID);
      const index = _upvotes.indexOf(objectID);
      if (index !== -1) {
        _upvotes.splice(index, 1);
        //cookies.set("flag-update-ui", parseInt(cookies.get("flag-update-ui"))-1);
      } else {
        _upvotes.push(objectID);
        //cookies.set("flag-update-ui", parseInt(cookies.get("flag-update-ui"))+1);
      }
      const onlyUnique = (value, index, self) => (self.indexOf(value) === index);
      _upvotes = _upvotes.filter(onlyUnique);
      console.log("___upVotes::"+ _upvotes);
      cookies.set("upvotes", JSON.stringify(_upvotes));
      //makeItem(index,objectID);
      this.setState({upvotes: _upvotes})
      //this.setState({chartData})
    }

    handleCurrentPage(currentPage){
        const {visitedStory, visitedComment, searchType, searchBy, searchFor, hitsPerPage} = this.props;
        let list = renderAppropriateList(searchType, visitedStory, visitedComment)
        this.setState({currentPage})
        console.log("currentPage:"+currentPage);
        if (this.state.searchValue) {
            this.props.fetchOnSearchAsync({currentPage, searchType, value: this.state.searchValue, hitsPerPage})
            //window.scrollTo(0, 0);
            return;
        }

        if (!list.includes(currentPage)) {
            this.props.fetchAllStoriesIdsAsync({currentPage, searchType, searchBy, searchFor})
            return;
        }

        //window.scrollTo(0, 0)
    }

    handleSearch(value) {
        const {currentPage} =this.state;
        const {searchType, hitsPerPage} = this.props;
        this.setState({searchValue: value})
        this.props.fetchOnSearchAsync({currentPage, searchType, value, hitsPerPage})
    }

    render(){
        const {currentPage, showSettings, searchValue} = this.state;
        //console.log("items ==>"+cookies.get("items"));
        return (
            <div className="container">
                <Header
                    onSearch={this.handleSearch}
                    onSettings={this.handleSettings}
                    showSettings={showSettings}
                    />
                <Filters
                    showSettings={showSettings}
                    searchValue={searchValue}
                />
                <Result
                    currentPage={currentPage}
                    searchValue={searchValue}
                    showSettings={showSettings}
                    handleUpVote={this.handleUpVote}
                    upVotes = {this.state.upvotes}
                    />
                <Pagination
                    currentPage={currentPage}
                    onPageChange={this.handleCurrentPage}
                    showSettings={showSettings}
                />
                <LineChart
                    currentPage={currentPage}
                    searchValue={searchValue}
                    showSettings={showSettings}
                    upVotes = {this.state.upvotes}
                />
                <div className ="line"></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {visitedComment, visitedStory, searchType, searchBy, searchFor} = state.news;
    const {searchType: sSearchType} = state.search;
    const {hitsPerPage} = state.search;
    return {visitedComment, visitedStory, searchType, sSearchType, searchBy, searchFor, hitsPerPage};
}

export default connect(mapStateToProps, {fetchAllStoriesIdsAsync, fetchOnSearchAsync})(App);

import React from 'react';
import Chart from 'react-google-charts';
import {connect} from 'react-redux';
import Loader from '../loader/index.jsx';
import {renderAppropriateList} from '../../utilites/index.js'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class LineChart extends React.Component {

	constructor(props){
			super(props)
	}

  renderListType(list, currentPage) {
		/* eslint-disable no-mixed-spaces-and-tabs */
		 // let _flag_voted = false;
			const currentPageItems = list && list[currentPage];
			cookies.set("items", []);
			const data = [
	      ["ID", "Votes"]
	    ];
			const isVoted = objectID => {
				const upVote = cookies.get("upvotes");
				if (!upVote) {
					return false;
				}
				let _voted =  (upVote.indexOf(objectID)) >= 0 ? true : false;
				return _voted;
			}
			currentPageItems && currentPageItems.hits.map((item,index) => {
		    const _voted = isVoted(item.objectID);

		    const _score = parseInt(item.points);
				console.log("itemID | POINTS >>"+ item.objectID +"||"+ (_voted ? _score + 1 : _score));
				// eslint-disable-next-line no-mixed-spaces-and-tabs
			  data.push([index+"[id:"+item.objectID+"]" ,_voted ? _score + 1 : _score]);
	    });

	    const options = {
	      vAxis: {
	        title: "Votes"
	      },
	      hAxis: {
	        title: "ID"
	      },
	      legend: {
	        position: 'none'
	      },
				pointSize: 5
	    };

			/* eslint-enable no-mixed-spaces-and-tabs */

			return (<Chart
				chartType="LineChart"
				width="100%"
				height="400px"
				data={data}
				options={options}
			/>);
	}

	renderList(){
			const {currentPage, searchValue, searchTypeSearch, searchTypeNews} = this.props;
			const {isFetching, listStory, listComment} = this.props.news;
			const searchType = searchValue ? searchTypeSearch : searchTypeNews;
			const {isFetching: isFetchingSearch, list: searchList} = this.props.search;
			const list = renderAppropriateList(searchType, listStory, listComment);
			if (searchValue) {
					return isFetchingSearch ? <Loader/> : this.renderListType(searchList, currentPage)
			} else {
					return isFetching ? <Loader/> : this.renderListType(list, currentPage)
			}
	}

	render () {
		return (
			<div>{this.renderList()}</div>
		)
	}
}
const mapStateToProps = state => {
    const {news, news: {listStory, listComment, searchType: searchTypeNews}, search} = state;
    const {searchType: searchTypeSearch} = state.search;
    return {news, listStory, listComment, searchTypeNews, searchTypeSearch, search}
}

export default connect(mapStateToProps, null)(LineChart);

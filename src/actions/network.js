//import {sortByTime} from '../utilites/index.js';
import {
    fetchStart,
    newsItemSave,
    fetchCompleted,
    setCurrentPage,
} from './index.js';
import {
    searchStart,
    searchItemSave,
    searchCompleted
} from './search.js';

export function fetchAllStoriesIdsAsync({searchType="comment", searchBy= "", searchFor="", currentPage = 1,hitsperpage=13}) {
    const api = `https://hn.algolia.com/api/v1/search?query=${searchBy}&page=${currentPage}&hitsPerPage=${hitsperpage}`;
    return function(dispatch) {
        dispatch(fetchStart())
        fetch(api).
            then(el => el.json()).
            then(item => dispatch(newsItemSave(item, currentPage, searchBy, searchType, searchFor))).
            then(data => dispatch(fetchCompleted(data))).
            then(() => dispatch(setCurrentPage(currentPage)))
    }
}

export function fetchOnSearchAsync({searchType, value, currentPage = 1, hitsperpage}) {
    const api = `https://hn.algolia.com/api/v1/search?query=${value}&page=${currentPage}&hitsPerPage=${hitsperpage}`
    return function(dispatch){
        dispatch(searchStart())
        fetch(api).
        then(response => response.json()).
        then(item => dispatch(searchItemSave(item,searchType,currentPage, hitsperpage))).
        then(data => dispatch(searchCompleted(data)))
    }
}

import React , {Component} from 'react';
import './style/style.css'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
cookies.set("flag-update-ui", 0);

class Item extends Component{
    constructor(props){
        super(props)
    }

    render() {
      const _voted = isVoted(this.props);
      let htmlDoc;
      const shortDate = this.props.item.created_at.substring(0,10);
      const parser = new DOMParser();

      console.log("Item_voted:::"+_voted);
      const textType = this.props.searchType === 'story' ? 'title' : 'comment_text';
      if (!this.props.searchValue) {
          htmlDoc = parser.parseFromString(this.props.item[textType], 'text/html');
      } else {
          const htmlDocItem = this.props.item && this.props.item._highlightResult && this.props.item._highlightResult[textType] && this.props.item._highlightResult[textType].value;
          htmlDoc = parser.parseFromString(htmlDocItem, 'text/html')
      }
      const title = this.props.item.title || this.props.item.story_text || this.props.item.story_title;
      return (
          <article className="Story" key={this.props.item.objectID}>
              <div className="Story_container">
                  <div className="Story_data">
                      <div className="Story_meta">
                          <span className="Story_comment">
                              {this.props.index+1}
                          </span>
                          <span className="Story_separator">|</span>
                          <span className="Story_comment">
                             <a href="#" onClick={() => this.props.handleUpVote(this.props.item.objectID)} >{_voted ? "\u25B2" : "\u25B3"}</a>
                          </span>
                          <span className="Story_separator">|</span>
                          <span className="Story_comment">
                              {title}
                          </span>
                          <span className="Story_separator">|</span>
                          <span>
                              {_voted ? parseInt(this.props.item.points) + 1 : this.props.item.points} Votes
                          </span>
                          <span className="Story_separator">|</span>
                          <span>
                              <a href={this.props.item.url}>by:
                                  <span>{this.props.item.author}</span>
                              </a>
                          </span>
                          <span className="Story_separator">|</span>
                          <span>
                              <a href={this.props.item.url}>Date Posted :{shortDate}</a>
                          </span>
                          <span className="Story_separator">|</span>

                          <span className="Story_link">Comments:
                              <a href={this.props.item.url}>
                                  <span>{this.props.item.num_comments}</span>
                              </a>
                          </span>
                      </div>
                  </div>
              </div>
          </article>
      )
    }
}
cookies.set("items", []);
const isVoted = (props) => {
  //console.log("isVoted:"+props.item.objectID);

  const upVote = cookies.get("upvotes");
  if (!upVote) {
    return false;
  }
  //console.log("upVote::"+upVote);
  let _voted =  (upVote.indexOf(props.item.objectID)) >= 0 ? true : false;
  if(_voted){
    let arr =cookies.get("items");
    arr.push({"objectID":props.index+"["+props.item.objectID+"]","points":props.item.points});
    cookies.set("items", arr);
    console.log("items list :-"+cookies.get("items").length);
  }
  console.log("_voted:::"+_voted);
  return _voted
}

export default Item;

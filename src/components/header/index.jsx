import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOnSearchAsync} from '../../actions/network.js'
import './style/style.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
        this.props.onSearch(value)
    }

    renderSettingsElement(showSettings){
        const settingsElement = (
            <div className="header_settings" onClick={() => this.props.onSettings()}>
                <div className="header_settings_text">
                    Settings
                </div>
            </div>
        )
        const backElement = <span className="header_settings_back" onClick={() => this.props.onSettings()}>{'< Back'}</span>
        return !showSettings ? settingsElement : backElement;
    }

    render(){
        const {showSettings} = this.props;
        const hideSearch = showSettings ? 'header_search_hide' : "";
        return (
            <div className="header">
                <div className="header_logo"></div>
                <div className="header_name">
                     Hacker News Clone in ReactJS
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    const {searchType} = state.news;
    return {searchType};
}

const mapDispatchToProps = dispatch => ({
    fetchOnSearchAsync: (item) => dispatch(fetchOnSearchAsync(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

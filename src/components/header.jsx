import React, { Component } from 'react';
import CurrentUser from './current-user.jsx';

class Header extends Component {

    render() {
        return (
            <header>
                <div id='logo'><img src="https://tmpfilecdn.freelogodesign.org/25509366-03c0-456e-bf26-874b57734441.png" /></div>
                <ul>
                    <li><CurrentUser username={this.props.username} avatar={this.props.avatar}/></li>
                    <li className="logout"><a href="/auth/logout">logout</a></li> 
                </ul>
            </header>
        );
    }
}

export default Header;
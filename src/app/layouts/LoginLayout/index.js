import React, { Component } from 'react';

import './LandingLayout.scss'

class LandingLayout extends Component {
    render(){
        return (
            <div className="app-container landing-background">
                <div className="content-middle landing-layout-container">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default LandingLayout;


import React, {Component} from 'react'

import NavigationHeader from '../components/navHeader.js'

import {connect} from 'react-redux';
import * as navActions from '../actions/nav'

let CLASS_CONTAINER = "nav-container"
let CLASS_SELECTED = "nav-current"
let CLASS_LEFT = "nav-left"
let CLASS_RIGHT = "nav-right"

let PageContainer = (props) => {
    return (
        <div className={props.navClass}>
            {props.children}
        </div>
    )
}

class NavigationContainer extends Component {
    componentWillMount() {
        React.Children.count(this.props.children)
    }

    renderChildren() {
        return React.Children.map(this.props.children, (child, index) => {

            var navClass = CLASS_SELECTED

            if (index < this.props.index) { navClass = CLASS_LEFT }
            if (index > this.props.index) { navClass = CLASS_RIGHT }

            return (
                <PageContainer navClass={navClass}>
                    {child}
                </PageContainer>
            )
        })
    }

    render() {
        return (
            <div id={CLASS_CONTAINER}>
                <NavigationHeader
                    handleBack={() => this.props.navigateTo(this.props.index-1)}
                />
                <main>
                    {this.renderChildren()}
                </main>
            </div>
        )
    }
}

const mapState = (state) => {
    return state.nav
}

export default connect(mapState, navActions)(NavigationContainer)

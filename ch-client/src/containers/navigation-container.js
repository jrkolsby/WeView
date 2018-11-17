import React, {Component} from 'react'

import NavigationHeader from '../components/navHeader.js'

import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const CLASS_CONTAINER = "nav-container"
const CLASS_SELECTED = "nav-current"
const CLASS_LEFT = "nav-left"
const CLASS_RIGHT = "nav-right"

const PageContainer = (props) => (
        <div className={props.navClass}>
            {props.children}
        </div>
)

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

const mapDispatch = (dispatch) => {
    return {
        ...bindActionCreators(navActions, dispatch), 
    }
}

export default connect(mapState, mapDispatch)(NavigationContainer)

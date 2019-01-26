import React, {Component} from 'react'

import * as userActions from '../actions/user'
import * as listActions from '../actions/list'
import * as navActions from '../actions/nav'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import AccountForm from '../components/accountForm'
import DecisionForm from '../components/decisionForm'

import { reduxForm } from 'redux-form'

class HeaderContainer extends Component {
    componentDidMount() {
	setInterval(() => {
	    this.date = new Date();
	}, 500)

    }

    render() {
	return (
	    <header>
	    {this.props.state.progress > 0 ? (
		<div className="progress"></div>
	    ) : null}
	    <div className="wrapper">
		<h1>{this.props.state.pageTitle}</h1>
		<h3>{this.props.state.pageSubtitle}</h3>
		<nav>
		    <div className="active">
			<a className={this.props.state.currentModal === 3 ? "active" : ""}
			    href="#new"
			    onClick={(e) => {
				this.props.state.loggedIn ?
				    this.props.dispatch.gotoModal(3) :
				    this.props.dispatch.gotoModal(1)
			    }}
			>Create New</a>
			<DecisionForm
			    form="new-decision"
			    title="New Decision"       
			    primary="Create Decision"
			    placeholder="What's the question?"
			    active={this.props.state.currentModal === 3}
			    onSubmit={(form) => {
				this.props.dispatch.createList(form.name)
			    }}
			    secondary="or Join Existing"
			    handleSecondary={() => {
				this.props.dispatch.gotoModal(4)
			    }}
			/>
		    </div>

		    <div className={this.props.state.loggedIn ? "active" : ""}>
			<a className={this.props.state.currentModal === 4 ? "active" : ""}
			    href="#join"
			    onClick={(e) => {
				this.props.state.loggedIn ? 
				    this.props.dispatch.gotoModal(4) :
				    this.props.dispatch.gotoModal(1)
			    }}
			>Join Existing</a>
			<DecisionForm
			    form="join"
			    title="Join Decision"       
			    primary="Join"
			    placeholder="Room URL"
			    active={this.props.state.currentModal === 4}
			    onSubmit={(form) => {
				this.props.dispatch.joinList(form.name)
			    }}
			    secondary="or Create New"
			    handleSecondary={() => {
				this.props.dispatch.gotoModal(3)
			    }}
			/>
		    </div>

		    <div className={this.props.state.loggedIn ? "" : "active"}>
			<a className={this.props.state.currentModal === 2 ? "active" : ""}
			    href="#signup"
			    onClick={(e) => {
				this.props.dispatch.gotoModal(2)
			    }}
			>Signup</a>
			<AccountForm
			    active={this.props.state.currentModal === 2}
			    form="signup"
			    title="Sign Up"       
			    primary="Create Account"
			    onSubmit={(form) => {
				this.props.dispatch.signup(form.user, 
						      form.pass)
			    }}
			    secondary="or Login"
			    handleSecondary={() => {
				this.props.dispatch.gotoModal(1)
			    }}
			/>
		    </div>

		    <div className={this.props.state.loggedIn ? "" : "active"}>
			<a className={this.props.state.currentModal === 1 ? "active" : ""}
			    href="#login"
			    onClick={(e) => {
				this.props.dispatch.gotoModal(1)
			    }}
			>Login</a>
			<AccountForm
			    form="login"
			    title="Log In"
			    primary="Login"
			    active={this.props.state.currentModal === 1}
			    onSubmit={(form) => {
				this.props.dispatch.login(form.user, 
						     form.pass)
			    }}
			    secondary="or Sign Up"
			    handleSecondary={() => {
				this.props.dispatch.gotoModal(2)
			    }}
			/>
		    </div>

		    <div className={this.props.state.loggedIn ? "active" : ""}>
			<a href="#logout"
			    onClick={(e) => {
				this.props.dispatch.logout()
				this.props.dispatch.gotoModal(0)
			    }}
			><span>Logout</span> {this.props.state.username}</a>
		    </div>
		</nav>

		<div className="nav-header">
		    <a className={(!this.props.state.loggedIn ||
				  this.props.state.currentPage === 0) ? "hidden" : ""}
			href="#back"
			onClick={(e) => {
			    this.props.dispatch.gotoPage(0)
			}}
		    >Bracket</a>
		    <h4>
		    {this.props.state.navTitle + " "}
		    {Object.keys(this.props.state.users).map((u, i, a) => {
			return this.props.state.users[u].name + (i < a.length - 1 ? ", " : "")
		    })}
		    </h4>
		    <a className={(!this.props.state.loggedIn ||
				  this.props.state.currentPage === 1) ? "hidden" : ""}
			href="#next"
			onClick={(e) => {
			    if (this.props.state.voteID < 0) {
				this.props.dispatch.createVote()
			    }
			    this.props.dispatch.gotoPage(1)
			}}
		    >Vote</a>
		</div>

		<div className="messages">
		    {this.props.state.messages.map((m, i) => {
			let message;
			if (typeof m.payload === "string") {
			    message = m.payload	
			} else {
			    const payload = m.payload
			    message = (
				<a href="#new"
				onClick={() => {
				    this.props.dispatch.gotoModal(3)
				}}
				>{payload.message}</a>
			    )
			}
			return (
			    <div key={i} 
				className={"message " + m.type + (m.time < this.date.getTime() - 1000 ? " hidden" : "")}>
			    {message}
			    </div> 
			)
		    })}
		</div>
	    </div>
	    </header>
	) 
    }
}

const mapState = (state) => {
    return {
        state: {
            ...state.nav,
            ...state.user,
            ...state.list,
        }
    }
}

const mapDispatch = (dispatch) => {
    return { 
        dispatch: {
            ...bindActionCreators(navActions, dispatch), 
            ...bindActionCreators(listActions, dispatch), 
            ...bindActionCreators(userActions, dispatch)
        }
    }
}

export default reduxForm()(connect(mapState, mapDispatch)(HeaderContainer))

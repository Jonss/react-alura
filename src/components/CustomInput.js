import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class CustomInput extends Component {

	constructor() {
		super();
		this.state = {msgError:''}
	}

	render() {
		return(	
		      <div className="pure-control-group">
		        <label htmlFor={this.props.name} >{this.props.name}</label> 
		        <input id={this.props.name} className={this.props.className} type={this.props.type} name={this.props.name} value={this.props.value}  onChange={this.props.onChange}/>
		        <span className="erro">{this.state.msgError}</span>
		      </div>
		);
	}

	componentDidMount() {
		PubSub.subscribe("erro-validacao", function(topico, erro) {
			if(erro.field === this.props.name) {
				this.setState({msgError:erro.defaultMessage});
			}
		}.bind(this));

		PubSub.subscribe("limpa-erros", function(topico) {
			this.setState({msgError:''});
		}.bind(this));
	}
}
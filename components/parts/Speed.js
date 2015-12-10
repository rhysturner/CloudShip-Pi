var React = require('react');

var Speed = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired
	},

	getDefaultProps() {
		return {
			status: 'disconnected',
			currentSpeed: "0"
		}
	},

	render() {
		return (
			<div className="row">
				<div className="col-xs-10">
					<h1>{this.props.title}</h1>
				</div>
				<div className="col-xs-2">
					<span id="speed-status" className={this.props.speed}>{this.props.speed}kmh</span>
				</div>
			</div>
		);
	}

});

module.exports = Speed;
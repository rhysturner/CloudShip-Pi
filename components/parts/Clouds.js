var React = require('react');


var Clouds = React.createClass({

	propTypes: {
		scale: React.PropTypes.string.isRequired
	},

	getDefaultProps() {
		return {
			scale: '1'
		}
	},

	render() {

		var activeStyle = {
	        transform: "scale(#{this.props.scale})"
		};

		return (		
		<section>	
			<div className="cloud" style={activeStyle}>
				<img src="cloud.png" />
			</div>
		</section>
		);
	}

});

module.exports = Clouds;

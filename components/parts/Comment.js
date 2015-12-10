var React = require('react');

var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString() + ' \n posted by ', {sanitize: true});
    return (
      <div className="comment">
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <b className="commentAuthor">
          {this.props.author}
        </b>
        
      </div>
    );
  }
});

module.exports = Comment;
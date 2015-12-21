/**
 *
 */


var React = require('react'),
    ReactDOM = require('react-dom'),
    CommentList = require('./CommentList'),
    CommentForm = require('./CommentForm'),
    CommentBox;


var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment."},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment."}
];

CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                <CommentForm />
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox data={data} />,
    document.getElementById('content')
);

module.exports = CommentBox;



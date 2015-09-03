var CardContainer = React.createClass({displayName: "CardContainer",
  render: function() {
    return (
      React.createElement("div", {className: "cardContainer"}, 
        "Hello world, I'm a bunch of flashcards!"
      )
    );
  }
});

React.render(
  React.createElement(CardContainer, null),
  document.getElementById('container')
);

var CardContainer = React.createClass({displayName: "CardContainer",
  render: function() {
    return (
      React.createElement("div", {className: "cardContainer"}, 
        React.createElement("h1", null, "Math Facts!"), 
        React.createElement("p", null, "Hello world, I'm a bunch of flashcards!")
      )
    );
  }
});

React.render(
  React.createElement(CardContainer, null),
  document.getElementById('container')
);

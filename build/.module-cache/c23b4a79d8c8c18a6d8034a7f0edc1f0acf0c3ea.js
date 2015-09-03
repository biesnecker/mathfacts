var CardContainer = React.createClass({displayName: "CardContainer",
  render: function() {
    return (
      React.createElement("div", {className: "cardContainer"}, 
        React.createElement("h1", null, "Math Facts!"), 

        React.createElement("p", null, "Math Facts will help you get better at basic math facts."), 
        React.createElement("p", null, "How many can you do?"), 
        React.createElement("p", null, "Challenge yourself! Let's go! :-)")
      )
    );
  }
});

React.render(
  React.createElement(CardContainer, null),
  document.getElementById('container')
);

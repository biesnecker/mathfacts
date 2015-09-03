var CardContainer = React.createClass({displayName: "CardContainer",
  render: function() {
    return (
      React.createElement("div", {className: "cardContainer"}, 
        React.createElement(StartScreen, null)
     )
    );
  }
});

var StartScreen = React.createClass({displayName: "StartScreen",
  render: function() {
    return (
      React.createElement("div", {className: "startScreen"}, 
        React.createElement("p", {className: "centered"}, React.createElement("img", {src: "owl.png", alt: ""})), 
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

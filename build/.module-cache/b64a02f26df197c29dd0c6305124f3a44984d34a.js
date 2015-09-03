var CardContainer = React.createClass({displayName: "CardContainer",
  getInitialState: function() {
    return {
      majorMode: "start"
    };
  },
  render: function() {
    var screen;
    if (this.state.majorMode == "start") {
      screen = React.createElement(StartScreen, null)
    } else {
      screen = "";
    }
    return (
      React.createElement("div", {className: "cardContainer"}, 
        React.createElement("h1", null, "Math Facts!"), 
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
        React.createElement("p", null, "Challenge yourself! Let's go! :-)"), 
        React.createElement("p", {className: "centered"}, 
          React.createElement("button", {className: "gobutton"}, "GO! →")
        )
      )
    );
  }
});

React.render(
  React.createElement(CardContainer, null),
  document.getElementById('container')
);

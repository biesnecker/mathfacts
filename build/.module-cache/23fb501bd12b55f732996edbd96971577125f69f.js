var CardContainer = React.createClass({displayName: "CardContainer",
  getInitialState: function() {
    return {
      majorMode: "start"
    };
  },
  startButtonPushed: function() {
    this.setState({ majorMode: "quiz" })
  },
  render: function() {
    var screen;
    switch(this.state.majorMode) {
      case "start":
        screen = React.createElement(StartScreen, {buttonHandler: this.startButtonPushed});
        break;
      case "quiz":
        screen = React.createElement(QuizScreen, null);
        break;
      default:
        screen = "";
        break;
    }
    return (
      React.createElement("div", {className: "cardContainer"}, 
        React.createElement("h1", null, "Math Facts!"), 
        screen
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
          React.createElement("button", {className: "gobutton", onClick: this.props.buttonHandler}, 
            "GO! →"
          )
        )
      )
    );
  }
});

var QuizScreen = React.createClass({displayName: "QuizScreen",
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  digitLen: function(a) {
    if (a == 1 || a == 0) return 1;
    return Math.ceil(Math.log10(a+1));
  },
  getOp: function() {
    var x = this.randomInt(0, 1);
    if (x == 0) {
      return "ADD";
    } else {
      return "SUBTRACT";
    }
  },
  getProblem: function() {
    var op = this.getOp();
    var a = this.randomInt(0, 20);
    var b = this.randomInt(0, 20);
    if (op == "SUBTRACT" && a < b) {
      var c = b;
      b = a;
      a = c;
    }
    var lenA = this.digitLen(a);
    var lenB = this.digitLen(b);
    return [op, a, b, lenA, lenB, Math.max(lenA, lenB)];
  },
  getInitialState: function () {
    return {
      startTime: Date.now(),
      timeLimit: 5 * 60 * 1000,
      attempted: 0,
      correct: 0
    };
  },
  render: function() {
    return React.createElement("p", null, "Quiz screen! ", this.getProblem());
  }
});

React.render(
  React.createElement(CardContainer, null),
  document.getElementById('container')
);

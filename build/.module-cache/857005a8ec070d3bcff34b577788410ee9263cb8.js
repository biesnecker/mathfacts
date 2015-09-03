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
    var answer;
    switch(op) {
      case "ADD":
        answer = a + b;
        break;
      case "SUBTRACT":
        answer = a - b;
        break;
      default:
        answer = 0;
        break;
    }
    var lenA = this.digitLen(a);
    var lenB = this.digitLen(b);
    var lenAnswer = this.digitLen(answer);
    return {
      "op": op, "a": a, "b": b, "lenA": lenA, "lenB": lenB,
      "maxLen": Math.max(lenA, lenB, lenAnswer), "answer": answer
    };
  },
  getProblemStrings: function() {
    var parts = this.getProblem();
    var bar = "&mdash;".repeat(parts.maxLen+1);
    var sign;
    switch(parts.op) {
      case "ADD":
        sign = "+";
        break;
      case "SUBTRACT":
        sign = "-";
        break;
      default:
        sign = "&nbsp;"
        break;
    }
    var topLinePadding = "&nbsp;".repeat(parts.maxLen - parts.lenA + 2);
    var bottomLinePadding = "&nbsp;".repeat(
      parts.maxLen - parts.lenB + 1);
    var topLine = topLinePadding + parts.a;
    var bottomLine = sign + bottomLinePadding + parts.b;
    return { "topLine": topLine, "bottomLine": bottomLine, "bar": bar,
      "problemValues": parts };
  },
  renderProblemState: function() {
    var render = this.state.problem.topLine + "<br />" +
      this.state.problem.bottomLine + "<br />" +
      this.state.problem.bar + "<br />";
    var answerLen;
    if (this.state.displayMode == "displayProblem") {
      if (this.state.input == "") {
        answerLen = 0;
      } else {
        answerLen = this.digitLen(parseInt(this.state.input));
      }
    } else if (this.state.displayMode == "displayAnswer") {
      answerLen = this.state.problem.problemValues.answerLen;
    } else {
      throw "Invalid problem display state";
    }
    var answerPadding = "&nbsp;".repeat(
      this.state.problem.problemValues.maxLen - answerLen + 2
    );
    if (this.state.displayMode == "displayProblem") {
      render += answerPadding + this.state.input;
    } else if (this.state.displayMode == "displayAnswer") {
      render += answerPadding + this.state.problem.problemValues.answer;
    }
    return render;
  },
  handleEnter (e) {
    alert("Enter was pressed");
    return false;
  },
  handleNumber (e) {
    if (this.state.displayMode != "displayProblem") return false;
    if (this.state.input.length == this.state.problem.problemValues.answerLen) {
      return false;
    }

    var n = e.which;
    var val = String.fromCharCode(n);
    this.setState({ input: this.state.input + val });
    return false;
  },
  handleDelete (e) {
    if (this.state.displayMode != "displayProblem") return false;
    if (this.state.input == "") return false;
    var newVal = this.state.input.substring(0, this.state.input.length-1);
    this.setState({ input: newVal});
  },
  componentDidMount: function() {
    key("enter", this.handleEnter);
    key("delete,del", this.handleDelete);
    key("1,2,3,4,5,6,7,8,9,0", this.handleNumber);
  },
  componentWillUnmount: function() {
    key.unbind("enter,1,2,3,4,5,6,7,8,9");
  },
  getInitialState: function () {
    return {
      startTime: Date.now(),
      timeLimit: 5 * 60 * 1000,
      attempted: 0,
      correct: 0,
      displayMode: "displayProblem",
      problem: this.getProblemStrings(),
      input: ""
    };
  },
  render: function() {
    return (
      React.createElement("div", {
        className: "problem", 
        dangerouslySetInnerHTML: {__html: this.renderProblemState()}}
      ));
  }
});

React.render(
  React.createElement(CardContainer, null),
  document.getElementById('container')
);

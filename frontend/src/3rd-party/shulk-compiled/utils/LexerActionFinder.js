"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ActionTransition = _interopRequireDefault(require("antlr4/src/antlr4/transition/ActionTransition.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function findLexerActions(state) {
  const collector = [];
  findLexerActionsRecursive(state, [], collector);
  return collector;
}
function findLexerActionsRecursive(state, alreadyPassed, collector) {
  state.transitions.forEach(it => {
    // This must go before it.isEpsilon because ActionTransitions are epsilon
    if (it instanceof _ActionTransition.default) {
      collector.push(it.actionIndex);
      findLexerActionsRecursive(it.target, [it.target.stateNumber], collector);
    } else if (it.isEpsilon) {
      if (!alreadyPassed.includes(it.target.stateNumber)) findLexerActionsRecursive(it.target, [...alreadyPassed, it.target.stateNumber], collector);
    } else {
      findLexerActionsRecursive(it.target, alreadyPassed, collector);
    }
  });
}
var _default = findLexerActions;
exports.default = _default;
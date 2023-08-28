import PlSqlLexer from './parser-antlr4-js/PlSqlLexer.js';
import PlSqlParser from './parser-antlr4-js/PlSqlParser.js';
import ShulkAutocompleter from './3rd-party/shulk/autocompleter.js';

export const test = (inputString, caretIndex) => {
  console.log('input text:', inputString);
  console.log('caret index:', caretIndex);
  console.log('parsing...');

  console.time('parse');
  try {
    const ac = new ShulkAutocompleter(PlSqlLexer, PlSqlParser);
    const suggestions = ac.autocomplete(inputString);
    console.log('suggestions:', suggestions);
  } finally {
    console.timeEnd('parse');
  }
};

import PlSqlLexer from './parser-antlr4-ts/PlSqlLexer';
import PlSqlParser, { Sql_scriptContext } from './parser-antlr4-ts/PlSqlParser';
import ShulkAutocompleter from './3rd-party/shulk/autocompleter.js';

export type Options = {
  initialRule: number;
};

export const test = (inputString: string, caretIndex: number) => {
  console.log('input text:', inputString);
  console.log('caret index:', caretIndex);
  console.log('parsing...');

  console.time('parse');
  let tree: Sql_scriptContext | null = null;
  try {
    const ac = new ShulkAutocompleter(PlSqlLexer, PlSqlParser);
    console.time('autocomplete');
    const suggestions = ac.autocomplete(inputString);
    console.timeEnd('autocomplete');
    console.log('suggestions:', suggestions);

    console.log('debugStats:', ac._debugStats?.toString());
  } finally {
    console.timeEnd('parse');
  }
  console.log('tree:', tree);
};

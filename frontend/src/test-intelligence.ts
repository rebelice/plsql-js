import antlr4 from 'antlr4';
import PlSqlLexer from './parser-antlr4-ts/PlSqlLexer';
import PlSqlParser, { Sql_scriptContext } from './parser-antlr4-ts/PlSqlParser';
import { completion, findCursorTokenIndex } from './intelligence-suggestion/completion';

export type CursorPosition = { line: number; column: number };

export const test = (inputString: string, caretIndex: number) => {
  console.log('input text:', inputString);
  console.log('caret index:', caretIndex);
  console.log('parsing...');

  console.time('parse');
  let tree: Sql_scriptContext | null = null;
  const inputCharStream = antlr4.CharStreams.fromString(inputString);
  const lexer = new PlSqlLexer(inputCharStream);
  const tokenStream = new antlr4.CommonTokenStream(lexer);
  const parser = new PlSqlParser(tokenStream);

  try {
    tree = parser.sql_script();
  } catch (e) {
    console.error('error:', e);
  } finally {
    console.timeEnd('parse');
  }
  console.log('tree:', tree);
  
  const completionTokenIndex = findCursorTokenIndex(tokenStream, { line: 1, column: caretIndex+1});
  console.log('completionTokenIndex:', completionTokenIndex);
  
  if (completionTokenIndex === undefined) {
    console.log('no completion token found');
    return
  }
  
  const suggestion = completion(tree, completionTokenIndex)
  console.log('suggestion:', suggestion)
};

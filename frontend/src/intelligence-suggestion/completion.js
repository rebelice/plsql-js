import PlSqlLexer from '../parser-antlr4-ts/PlSqlLexer';

const possibleIdentifierPrefix = /[\w]$/;
const lineSeparator = /\n|\r|\r\n/g;

export function findCursorTokenIndex(tokenStream, cursor) {
  // NOTE: cursor position is 1-based, while token's charPositionInLine is 0-based
  const cursorCol = cursor.column - 1;
  // console.log('cursorCol', cursorCol);
  // console.log('tokenStream.tokens.length', tokenStream.tokens.length)
  for (let i = 0; i < tokenStream.tokens.length; i++) {
    const t = tokenStream.get(i);
    
    // console.log('t', t);

    const tokenStartCol = t.column;
    const tokenEndCol = tokenStartCol + t.text.length;
    const tokenStartLine = t.line;
    const tokenEndLine =
      t.type !== PlSqlLexer.SPACES || !t.text ? tokenStartLine : tokenStartLine + (t.text.match(lineSeparator)?.length || 0);

    // console.log('tokenStartCol', tokenStartCol);
    // console.log('tokenEndCol', tokenEndCol);
    // console.log('tokenStartLine', tokenStartLine);
    // console.log('tokenEndLine', tokenEndLine);

    // NOTE: tokenEndCol makes sense only of tokenStartLine === tokenEndLine
    if (tokenEndLine > cursor.line || (tokenStartLine === cursor.line && tokenEndCol > cursorCol)) {
      if (
        i > 0 &&
        tokenStartLine === cursor.line &&
        tokenStartCol === cursorCol &&
        possibleIdentifierPrefix.test(tokenStream.get(i - 1).text)
      ) {
        return i - 1;
      } else if (tokenStream.get(i).type === PlSqlLexer.SPACES) {
        return i + 1;
      } else return i;
    }
  }
  return undefined;
}

export function completion(tree, completionTokenIndex) {
  
}
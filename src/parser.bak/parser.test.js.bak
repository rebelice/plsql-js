import antlr4 from 'antlr4';
import PlSqlLexer from './PlSqlLexer.js';
import PlSqlParser from './PlSqlParser.js';

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

test('parse simple SQL', () => {
    const input = "SELECT * FROM t WHERE a = 1;"
    const chars = new antlr4.InputStream(input);
    const lexer = new PlSqlLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new PlSqlParser(tokens);
    const tree = parser.sql_script();
});
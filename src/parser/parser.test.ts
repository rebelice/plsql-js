import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { PlSqlLexer } from './PlSqlLexer';
import { PlSqlParser } from './PlSqlParser';

describe('PlSqlParser', () => {
    it('should parse a simple select statement', () => {
        const inputStream = CharStreams.fromString('select * from dual;');
        const lexer = new PlSqlLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new PlSqlParser(tokenStream);
        const tree = parser.sql_script();
        console.log(tree.toStringTree(parser.ruleNames));
    });
});
import antlr4 from 'antlr4';
import PlSqlLexer from './parser-antlr4-ts/PlSqlLexer';
import PlSqlParser, { Sql_scriptContext } from './parser-antlr4-ts/PlSqlParser';
import { PlSqlErrorStrategy } from './intelligence-suggestion/errorStrategy';

export const test = (inputString: string, caretIndex: number) => {
    console.log('input text:', inputString);
    console.log('caret index:', caretIndex);
    console.log('parsing...');
    
    console.time('parse');
    let tree: Sql_scriptContext | null = null;
    try {
        const inputCharStream = antlr4.CharStreams.fromString(inputString);
        const lexer = new PlSqlLexer(inputCharStream);
        const tokenStream = new antlr4.CommonTokenStream(lexer);
        const parser = new PlSqlParser(tokenStream);
        parser.removeErrorListeners();
        parser._errHandler = new PlSqlErrorStrategy();

        tree = parser.sql_script();
    } finally {
        console.timeEnd('parse');
    }
    console.log('tree:', tree);
};
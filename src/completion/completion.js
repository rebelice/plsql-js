import antlr4 from 'antlr4';
import PlSqlLexer from '../parser/PlSqlLexer.js';
import PlSqlParser from '../parser/PlSqlParser.js';
import { CompletionErrorStrategy } from './error-strategy.js';
import * as c3 from '../c3';

// completionsFor(text, line, column) -> [Completion]
export function completionsFor(text, line, column) {
    const lexer = new PlSqlLexer(new antlr4.InputStream(text));
    const tokenStream = new antlr4.CommonTokenStream(lexer);
    const parser = new PlSqlParser(tokenStream);
    parser.removeErrorListeners();
    parser.errorHandler = new CompletionErrorStrategy(); 
    
    const parsedQuery = parser.sql_script();
    console.info("line, column", line, column)
    const completionTokenIndex = findCursorTokenIndex(tokenStream, {line, column})
    
    if (completionTokenIndex === undefined) {
        console.error("Couldn't find cursor position on toke stream! Lexer might be skipping some tokens!");
        return [];
    }
    
    const c3Candidates = collectC3CompletionCandidates(parser, parsedQuery, completionTokenIndex);
    console.info("C3 candidates:", c3Candidates);
    return c3Candidates
}

function collectC3CompletionCandidates(parser, parsedQuery, completionTokenIndex) {
    const core = new c3.CodeCompletionCore(parser);
    core.translateRulesTopDown = false;
    core.ignoredTokens = new Set([
        PlSqlLexer.COMMA,
        PlSqlLexer.PLUS_SIGN,
        PlSqlLexer.MINUS_SIGN,
        PlSqlLexer.COLON,
        PlSqlLexer.LEFT_PAREN,
    ]);
    
    core.preferredRules = new Set([
        PlSqlParser.RULE_from_clause,
        PlSqlParser.RULE_table_ref_list,
        PlSqlParser.RULE_table_ref,
        PlSqlParser.RULE_identifier,
    ]);
    
    return core.collectCandidates(completionTokenIndex, parsedQuery);
}

const possibleIdentifierPrefix = /[\w]$/;
const lineSeparator = /\n|\r|\r\n/g;
/**
 * @returns the token index for which we want to provide completion candidates,
 * which depends on the cursor position.
 *
 * @example
 * ```sql
 * SELECT id| FROM x    : Cursor touching the previous identifier token:
 *                        we want to continue completing that prior token position
 * SELECT id |FROM x    : Cursor NOT touching the previous identifier token:
 *                        we want to complete what comes on this new position
 * SELECT id   | FROM x : Cursor within whitespace block: we want to complete what
 *                        comes after the whitespace (we must return a non-SPACES token index)
 * ```
 */
export function findCursorTokenIndex(tokenStream, cursor) {
    // NOTE: cursor position is 1-based, while token's charPositionInLine is 0-based
    const cursorCol = cursor.column - 1;
    for (let i = 0; i < tokenStream.size; i++) {
        const t = tokenStream.get(i);
        
        const tokenStartCol = t.column;
        const tokenEndCol = tokenStartCol + t.text.length;
        const tokenStartLine = t.line;
        const tokenEndLine =t.type !== PlSqlLexer.SPACES || !t.text ? tokenStartLine : tokenStartLine + (t.text.match(lineSeparator)?.length || 0); 
        
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
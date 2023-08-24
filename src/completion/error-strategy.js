import DefaultErrorStrategy from "../antlr4/src/antlr4/error/DefaultErrorStrategy.js";
import PlSqlParser from "../parser/PlSqlParser";
import PlSqlLexer from "../parser/PlSqlLexer";
import IntervalSet from "antlr4";

export class CompletionErrorStrategy extends DefaultErrorStrategy {
    /**
     * The default error handling strategy is "too smart" for our code-completion purposes.
     * We generally do NOT want the parser to remove tokens for recovery.
     * 
     * @example
     * ```sql
     *    SELECT id, | FROM Foo
     * ```
     * Here the default error strategy is drops `FROM` and makes `Foo` a field
     * of SELECTs' list. So we don't recognize `Foo` as the Object we want to
     * query for.
     *
     * We might implement more completion-specific logic in the future.
     */
    singleTokenDeletion(recognizer) {
        return undefined;
    }
    
    /**
     * More aggressive recovering from the parsing of a broken "sqlField":
     * keep consuming tokens until we find a COMMA or FROM (iff they are
     * part of the tokens recovery set)
     *
     * This helps with the extraction of the FROM expressions when the SELECT
     * expressions do not parse correctly.
     *
     * @example
     * ```sql
     *    SELECT AVG(|) FROM Account
     * ```
     * Here 'AVG()' fails to parse, but the default error strategy doesn't discard 'AVG'
     * because it matches the IDENTIFIER token of a following rule (sqlAlias rule). This
     * completes the sqlSelectClause and leaves '()' for the sqlFromClause rule, and
     * which fails to extract the values off the FROM expressions.
     *
     */
    getErrorRecoverySet(recognizer) {
        const defaultRecoverySet = super.getErrorRecoverySet(recognizer);
        if (recognizer.ruleContext.ruleIndex === PlSqlParser.RULE_selected_list) {
            const intervalSet = new IntervalSet();
            intervalSet.add(PlSqlLexer.COMMA);
            intervalSet.add(PlSqlLexer.FROM);
            const intersection = defaultRecoverySet.and(intervalSet);
            if (intersection.size > 0) {
                return intersection;
            }
        }
        return defaultRecoverySet;
    }
}
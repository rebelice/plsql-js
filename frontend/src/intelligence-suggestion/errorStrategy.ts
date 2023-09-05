import DefaultErrorStrategy from "antlr4/error/DefaultErrorStrategy";
import IntervalSet from "antlr4/misc/IntervalSet";
import Parser from "antlr4/Parser";
import Token from "antlr4/Token"
import PlSqlParser from "../parser-antlr4-ts/PlSqlParser";
import PlSqlLexer from "../parser-antlr4-ts/PlSqlLexer";

export class PlSqlErrorStrategy extends DefaultErrorStrategy {
    singleTokenDeletion(_: Parser): Token {
        return null as any
    }
    
    getErrorRecoverySet(recognizer: Parser): IntervalSet {
        const defaultRecoverySet = super.getErrorRecoverySet(recognizer);
        const currentRuleIndex = (recognizer as any)._ctx.ruleIndex;
        if (currentRuleIndex === PlSqlParser.RULE_select_list_elements) {
            const plsqlFieldFollowSet = new IntervalSet();
            plsqlFieldFollowSet.addOne(PlSqlLexer.COMMA);
            plsqlFieldFollowSet.addOne(PlSqlLexer.FROM);
            const intersection = getIntersection(defaultRecoverySet, plsqlFieldFollowSet);
            if (intersection.length > 0) return intersection;
        }
        return defaultRecoverySet;
    }
}

function getIntersection(set1: IntervalSet, set2: IntervalSet): IntervalSet {
    const intersection = new IntervalSet();
    if (set1 === null || set2 === null) return intersection;
    if (set1.intervals === null || set2.intervals === null) return intersection;
    for (const interval of set1.intervals) {
        if (interval === null) continue;
        for (let i = interval.start; i <= interval.stop; i++) {
            if (set2.contains(i)) {
                intersection.addOne(i);
            }
        }
    }
    return intersection;
}
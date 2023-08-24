import PlSqlParserListener from "../parser/PlSqlParserListener";

export class QueryAnalyzer {
    innerQueriesListener = new PlSqlInnerQueriesListener();
}

class PlSqlInnerQueriesListener extends PlSqlParserListener {
    innerQueries = new Map();
    
    findQueriesAt(atIndex) {
        const innerQueries = Array.from(this.innerQueries.values()).filter((query) => 
            this.queryContainsTokenIndex(query, atIndex)
        );
        const sortedQueries = innerQueries.sort((queryA, queryB) => queryB.select.tokenIndex - queryA.select.tokenIndex);
        return sortedQueries;
    }
    
    queryContainsTokenIndex(innerQuery, atTokenIndex) {
        // NOTE: We use the parent node to take into account the enclosing
        // parentheses (in the case of inner SELECTs), and the whole text until EOF
        // (for the top-level SELECT). BTW: soqlInnerQueryNode always has a parent.
    }
}
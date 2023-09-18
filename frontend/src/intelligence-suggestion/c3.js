export class CodeCompletionCore {
    constructor(parser, atn, vocabulary, ruleNames) {
        this.parser = parser;
        this.atn = atn;
        this.vocabulary = vocabulary;
        this.ruleNames = ruleNames;
    }
    
    collectCandidates(caretTokenIndex, context) {
        // TODO: consider the context.start.tokenIndex
        this.tokenStartIndex = 0;
        this.tokens = [];
        this.candidates = [];
        this.shortcutMap = Map();
        
        tokenStream = this.parser.getTokenStream();
        currentOffset = tokenStream.index;
        if (this.tokenStartIndex < tokenStream.size) {
            tokenStream.index = this.tokenStartIndex;
        }
        offset = 1;
        while (true) {
            token = tokenStream.LT(offset);
            offset++;
            this.tokens.push(token.type);
            
            if (token.tokenIndex >= caretTokenIndex || this.tokens[this.tokens.length - 1] === Token.EOF) {
                break;
            }
        }
        
        if (currentOffset < tokenStream.size) {
            tokenStream.index = currentOffset;
        }
        
        callStack = [];
        // TODO: consider the context.getRuleIndex()
        startRule = 0;
        processRule(this.atn.ruleToStartState[startRule], 0, callStack, "");
        
        return this.candidates;
    }
    
    /**
     * Walks the ATN for a single rule only. It returns the token stream position for each path that could be matched in this rule.
     * The result can be empty in case we hit only non-epsilon transitions that didn't match the current input or if we
     * hit the caret position.
     */
    processRule(startState, tokenIndex, callStack, indentation) {
        // Start with rule specific handling before going into the ATN walk.

        // Check first if we've taken this path with the same input before. 
        positionMap = this.shortcutMap[startState.ruleIndex];
    }
}
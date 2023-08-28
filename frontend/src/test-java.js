import JavaLexer from './parser-antlr4-java/JavaLexer.js';
import JavaParser from './parser-antlr4-java/JavaParser.js';
import ShulkAutocompleter from './3rd-party/shulk/autocompleter.js';

export const test = () => {
  const inputString = `class HelloWorld {
    public static void main(String[] args) {
        System.out.println("foo"
  `;
  console.log('parsing...');

  console.time('parse');
  try {
    const ac = new ShulkAutocompleter(JavaLexer, JavaParser, {
      recovery: [
        {
          ifInRule: JavaParser.RULE_blockStatement,
          nested: true,
          andFindToken: JavaParser.SEMI,
          thenFinishRule: true,
          skipOne: true,
        },
      ],
    });
    const suggestions = ac.autocomplete(inputString);
    console.log('suggestions:', suggestions);
  } finally {
    console.timeEnd('parse');
  }
};

import { Component, createSignal } from "solid-js";
import { Editor } from "./Editor";
import styles from "./App.module.css";
import lebab from "lebab";
import { Transform, TransformMenu } from "./TransformMenu";
import { Title } from "./Title";

const initialCode = `
'use strict';
var _ = require('lodash');

// Let/const
var names = ['John', 'Doe'], time = 'yesterday';
time = 'today';

// Template string
console.log('Hello ' + name + ', how are you ' + time + '?');

var john = {
  // Object shorthand
  names: names,
  // Object method
  sayMyName: function () {
    // Arrow functions
    return this.names.map(function(n) { return n.toUpperCase(); }).join(' ');
  }
};

// Classes
function Greeter(p) {
  this.person = p;
};
// default parameters
Greeter.prototype.greet = function(punct) {
  punct = punct || "!";
  console.log(this.person.sayMyName() + punct);
};

exports.Greeter = Greeter;
`.trim();

const initialTransforms: Transform[] = [
  // Should be run before arrow transform
  { name: "class", enabled: true, title: "function/prototypes to classes " },
  // Safe
  { name: "arrow", enabled: true, title: "Callbacks to arrow functions" },
  {
    name: "arrow-return",
    enabled: true,
    title: "drop return statements in arrow functions ",
  },
  { name: "for-of", enabled: true, title: "for loop to for-of loop " },
  { name: "for-each", enabled: false, title: "for loop to Array.forEach()" },
  { name: "arg-rest", enabled: true, title: "arguments to function(...args) " },
  { name: "arg-spread", enabled: true, title: "apply() to spread operator " },
  {
    name: "obj-method",
    enabled: true,
    title: "function values in object to methods",
  },
  { name: "obj-shorthand", enabled: true, title: "{foo: foo} to {foo}" },
  {
    name: "no-strict",
    enabled: true,
    title: 'removal of "use strict" directives',
  },
  { name: "exponent", enabled: true, title: "Math.pow() to ** operator" },
  {
    name: "multi-var",
    enabled: false,
    title: "var x,y; declaration to var x; var y;",
  },
  // Unsafe
  { name: "let", enabled: true, title: "var to let/const" },
  {
    name: "commonjs",
    enabled: true,
    title: "CommonJS module definition to ES6 modules",
  },
  {
    name: "template",
    enabled: true,
    title: "string concatenation to template strings",
  },
  {
    name: "default-param",
    enabled: true,
    title: "a = a || 2 to default parameters",
  },
  {
    name: "destruct-param",
    enabled: true,
    title: "use destructuring for objects in function parameters",
  },
  {
    name: "includes",
    enabled: true,
    title: "array.indexOf(foo) !== -1 to array.includes(foo)",
  },
];

export const App: Component = () => {
  const [code, setCode] = createSignal(initialCode);
  const [transforms, setTransforms] = createSignal(initialTransforms);

  const enabledTransforms = () =>
    transforms()
      .filter((t) => t.enabled)
      .map((t) => t.name);

  const transformedCode = () => {
    try {
      return lebab.transform(code(), enabledTransforms()).code;
    } catch (e) {
      return e.message;
    }
  };

  const toggleTansform = (tr: Transform) => {
    setTransforms(transforms().map((t) => (t.name === tr.name ? tr : t)));
  };

  return (
    <div class={styles.App}>
      <header>
        <Title />
        <TransformMenu transforms={transforms()} onChange={toggleTansform} />
      </header>
      <Editor type="old" text={code()} onChange={setCode} />
      <Editor type="new" text={transformedCode()} />
    </div>
  );
};

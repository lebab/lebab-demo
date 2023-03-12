import { Component, createSignal } from "solid-js";
import { Editor } from "./Editor";
import styles from "./App.module.css";
import lebab from "lebab";
import { TransformMenu } from "./TransformMenu";
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

const transforms = [
  "arrow",
  "arrow-return",
  "for-of",
  "for-each",
  "arg-rest",
  "arg-spread",
  "obj-method",
  "obj-shorthand",
  "no-strict",
  "exponent",
  "let",
  "class",
  "commonjs",
  "template",
  "default-param",
  "destruct-param",
  "includes",
];

export const App: Component = () => {
  const [code, setCode] = createSignal(initialCode);

  const transformedCode = () => {
    try {
      return lebab.transform(code(), transforms).code;
    } catch (e) {
      return e.message;
    }
  };

  return (
    <div class={styles.App}>
      <header>
        <Title />
        <TransformMenu />
      </header>
      <Editor type="old" text={code()} onChange={setCode} />
      <Editor type="new" text={transformedCode()} />
    </div>
  );
};

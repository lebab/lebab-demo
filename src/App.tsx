import { Component, createSignal } from "solid-js";
import { Editor } from "./Editor";
import styles from "./App.module.css";
import lebab from "lebab";
import logo from "./assets/lebab-logo-32.png";

const initialCode = `
'use strict';

// Let/const
var name = 'Bob', time = 'yesterday';
time = 'today';

// Template string
console.log('Hello ' + name + ', how are you ' + time + '?');

var bob = {
  // Object shorthand
  name: name,
  // Object method
  sayMyName: function () {
    console.log(this.name);
  }
};
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
      <h1>
        <img src={logo} />
        Lebab
      </h1>
      <Editor text={code()} onChange={setCode} />
      <Editor text={transformedCode()} />
    </div>
  );
};

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
  { name: "arrow", enabled: true },
  { name: "arrow-return", enabled: true },
  { name: "for-of", enabled: true },
  { name: "for-each", enabled: true },
  { name: "arg-rest", enabled: true },
  { name: "arg-spread", enabled: true },
  { name: "obj-method", enabled: true },
  { name: "obj-shorthand", enabled: true },
  { name: "no-strict", enabled: true },
  { name: "exponent", enabled: true },
  { name: "let", enabled: true },
  { name: "class", enabled: true },
  { name: "commonjs", enabled: true },
  { name: "template", enabled: true },
  { name: "default-param", enabled: true },
  { name: "destruct-param", enabled: true },
  { name: "includes", enabled: true },
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

import { Component, onMount } from "solid-js";
import { CodeJar } from "codejar";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
import styles from "./Editor.module.css";

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

export const Editor: Component = () => {
  let pre: HTMLPreElement;

  onMount(() => {
    CodeJar(pre, hljs.highlightElement, { tab: "  " });
  });

  return (
    <pre ref={pre} class={`${styles.editor} language-javascript`}>
      {initialCode}
    </pre>
  );
};

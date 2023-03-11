import { Component, onMount } from "solid-js";
import { CodeJar } from "codejar";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
import styles from "./Editor.module.css";

interface EditorProps {
  text: string;
}

export const Editor: Component<EditorProps> = (props) => {
  let pre: HTMLPreElement;

  onMount(() => {
    CodeJar(pre, hljs.highlightElement, { tab: "  " });
  });

  return (
    <pre ref={pre} class={`${styles.editor} language-javascript`}>
      {props.text}
    </pre>
  );
};

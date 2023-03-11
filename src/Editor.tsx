import { Component, createEffect, onMount } from "solid-js";
import { CodeJar } from "codejar";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
import styles from "./Editor.module.css";

interface EditorProps {
  text: string;
  onChange?: (text: string) => void;
}

export const Editor: Component<EditorProps> = (props) => {
  let pre: HTMLPreElement;
  let jar: ReturnType<typeof CodeJar>;
  let currentlyChanging = false;

  onMount(() => {
    jar = CodeJar(pre, hljs.highlightElement, { tab: "  " });
    if (props.onChange) {
      jar.onUpdate((txt) => {
        currentlyChanging = true;
        props.onChange(txt);
        currentlyChanging = false;
      });
    }
  });

  createEffect(() => {
    if (!currentlyChanging) {
      jar.updateCode(props.text);
    }
  });

  return (
    <pre ref={pre} class={`${styles.editor} language-javascript`}>
      {props.text}
    </pre>
  );
};

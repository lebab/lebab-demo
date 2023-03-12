import { Component, For } from "solid-js";
import styles from "./TransformMenu.module.css";

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

export const TransformMenu: Component = () => {
  return (
    <div class={styles.TransformMenu}>
      <For each={transforms}>
        {(tr) => (
          <label>
            <input type="checkbox" /> {tr}
          </label>
        )}
      </For>
    </div>
  );
};

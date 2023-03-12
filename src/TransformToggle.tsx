import { Component } from "solid-js";
import styles from "./TransformToggle.module.css";

export type Transform = { name: string; enabled: boolean };

interface TransformToggleProps {
  name: string;
  enabled: boolean;
  onChange: (t: Transform) => void;
}

export const TransformToggle: Component<TransformToggleProps> = (props) => {
  return (
    <label class={styles.TransformToggle}>
      <input
        type="checkbox"
        checked={props.enabled}
        onClick={(e) =>
          props.onChange({ name: props.name, enabled: !props.enabled })
        }
      />{" "}
      {props.name}
    </label>
  );
};

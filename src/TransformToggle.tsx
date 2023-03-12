import { Component } from "solid-js";
import { Transform } from "./TransformMenu";
import styles from "./TransformToggle.module.css";

interface TransformToggleProps {
  name: string;
  title: string;
  enabled: boolean;
  onChange: (t: Transform) => void;
}

export const TransformToggle: Component<TransformToggleProps> = (props) => {
  return (
    <label class={styles.TransformToggle} title={props.title}>
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

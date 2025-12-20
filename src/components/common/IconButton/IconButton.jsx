import styles from "./IconButton.module.css";
import cx from "classnames";

import { Icon } from "../Icon/Icon.jsx";

const IconButton = ({
                        onClick = () => {},
                        type = "button",
                        style,
                        styleSVG,
                        iconId,
                        width = "20",
                        height = "20",
                        stroke = "currentColor",
                        fill = "black",
                        disabled = false,
                    }) => {
    return (
        <button
            type={type}
            className={cx(styles.button, style)}
            onClick={onClick}
            disabled={disabled}
        >
            <Icon
                name={iconId}
                width={width}
                height={height}
                customStyle={styleSVG}
                stroke={stroke}
                fill={fill}
            />
        </button>
    );
};

export default IconButton;
import styles from "./IconButton.module.css";
import cx from "classnames";

import { Icon } from "../Icon/Icon.jsx";

const IconButton = ({
                        onClick = () => {},
                        type = "button",
                        style,
                        styleSVG,
                        iconId,
                        size = 18,
                        stroke = "currentColor",
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
                size={size}
                className={styleSVG}
                stroke={stroke}
            />
        </button>
    );
};

export default IconButton;
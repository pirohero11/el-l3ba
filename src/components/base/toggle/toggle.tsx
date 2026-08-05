"use client";

import type { ReactNode } from "react";
import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import { Switch as AriaSwitch } from "react-aria-components";
import { cx } from "@/lib/utils/cx";

interface ToggleBaseProps {
    size?: "sm" | "md";
    slim?: boolean;
    className?: string;
    isHovered?: boolean;
    isFocusVisible?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
}

export const ToggleBase = ({ className, isHovered, isDisabled, isFocusVisible, isSelected, slim, size = "sm" }: ToggleBaseProps) => {
    const styles = {
        default: {
            sm: {
                root: "h-5 w-9 p-0.5",
                switch: cx("size-4", isSelected && "translate-x-4"),
            },
            md: {
                root: "h-6 w-11 p-0.5",
                switch: cx("size-6 -translate-y-1 -translate-x-1", isSelected && "translate-x-4 -translate-y-1"),
            },
        },
        slim: {
            sm: {
                root: "h-4 w-8",
                switch: cx("size-4", isSelected && "translate-x-4"),
            },
            md: {
                root: "h-6 w-11",
                switch: cx("size-6", isSelected && "translate-x-5"),
            },
        },
    };

    const classes = slim ? styles.slim[size] : styles.default[size];

    return (
        <div
            className={cx(
                "cursor-pointer rounded-full border-2 border-black transition duration-150 ease-linear",
                isSelected ? "bg-red-500" : "bg-white",
                isDisabled && "cursor-not-allowed opacity-50",
                isFocusVisible && "outline-2 outline-offset-2 outline-black",
                classes.root,
                className,
            )}
        >
            <div
                className={cx(
                    "rounded-full bg-white border-2 border-black shadow-sm transition-transform duration-150 ease-in-out",
                    classes.switch,
                )}
            />
        </div>
    );
};

const styles = {
    sm: {
        root: "gap-2",
        textWrapper: "",
        label: "text-sm font-medium",
        hint: "text-sm",
    },
    md: {
        root: "gap-3",
        textWrapper: "gap-0.5",
        label: "text-md font-medium",
        hint: "text-md",
    },
};

interface ToggleProps extends AriaSwitchProps {
    size?: "sm" | "md";
    label?: string;
    hint?: ReactNode;
    slim?: boolean;
}

export const Toggle = ({ label, hint, className, size = "sm", slim, ...ariaSwitchProps }: ToggleProps) => {
    return (
        <AriaSwitch
            {...ariaSwitchProps}
            className={(state) =>
                cx(
                    "relative flex w-max items-start",
                    state.isDisabled && "cursor-not-allowed",
                    styles[size].root,
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {({ isSelected, isDisabled, isFocusVisible, isHovered }) => (
                <>
                    <ToggleBase
                        slim={slim}
                        size={size}
                        isHovered={isHovered}
                        isDisabled={isDisabled}
                        isFocusVisible={isFocusVisible}
                        isSelected={isSelected}
                        className={slim ? "mt-0.5" : ""}
                    />

                    {(label || hint) && (
                        <div className={cx("flex flex-col", styles[size].textWrapper)}>
                            {label && <p className={cx("text-secondary select-none", styles[size].label)}>{label}</p>}
                            {hint && (
                                <span className={cx("text-tertiary", styles[size].hint)} onClick={(event) => event.stopPropagation()}>
                                    {hint}
                                </span>
                            )}
                        </div>
                    )}
                </>
            )}
        </AriaSwitch>
    );
};

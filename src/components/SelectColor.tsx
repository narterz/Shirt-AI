import { FC } from "react";
import { CirclePicker } from "react-color";

interface SelectColorProps {
    chosenColor: string;
    chosenColorName: string;
    allowedColors: string[];
    changeColor: (color: any) => void;
    step: number;
    circleSize: number;
    circleSpacing: number;
    width: string;
}

export const SelectColor: FC<SelectColorProps> = ({
    chosenColor,
    allowedColors,
    changeColor,
    chosenColorName,
    step,
    circleSize,
    circleSpacing,
    width }) => {
    return (
        <div className="w-[90%] xsm:max-md:w-[95%] flex flex-col items-center">
            <p className={step === 1 ? "mb-5 text-center text-undertext xsm:max-md:text-xxsm lg:text-md" : "mb-5 text-start font-semibold text-xsm text-undertext xsm:max-md:text-xxsm xsm:max-md:text-center lg:text-md"}>Selected Color: {chosenColorName}</p>
            <CirclePicker
                className="flex justify-center w-full color-picker-container"
                onChange={changeColor}
                color={chosenColor}
                colors={allowedColors}
                circleSize={circleSize}
                circleSpacing={circleSpacing}
                width={width}
            />
        </div>
    )
}
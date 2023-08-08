/**
 * * Alternates between shirt colors as user selects colors via SelectColor
 * * Default color is white and can
 * * sets brandColor to the choice selected via SelectColor
 */

import { FC } from "react";
import { SelectColor } from "./SelectColor";
import ClipLoader from "react-spinners/ClipLoader";

interface ChooseColorProps {
    brandColor: string;
    shirtURL: string;
    allowedColors: string[];
    brandColorName: string;
    currentStep: number;
    loading: boolean;
}

interface ChooseColorMethods {
    onChange: (color: any) => void;
}

export const ChooseColor: FC<ChooseColorProps & ChooseColorMethods> = ({
    brandColor,
    brandColorName,
    shirtURL,
    allowedColors,
    onChange,
    currentStep,
    loading }) => {
    return (

        <div 
            className="w-full h-full xsm:max-lg:flex-col only:flex-row" 
            style={currentStep === 1 ? { display: "flex" } : { display: 'none' }} 
            id="chooseColor"
        >
            <div className="w-[50%] xsm:max-lg:w-full xsm:h-[40%] md:h-[40%] lg:h-full flex items-center justify-center border-e border-grey-200">
                {loading
                    ? <ClipLoader loading={loading} color="#7003B3" size={100} />
                    : <img src={shirtURL} alt="AI generated preview of the chosen colors" className="max-h-[90%]" />
                }
            </div>
            <div className="xsm:max-lg:w-full xsm:max-lg:text-center flex w-[50%] h-full flex-col justify-around items-center border-e border-grey-200">
                <div className="flex flex-col justify-evenly text-center lg:w-full lg:h-[30%]">
                    <h2 className="font-titles xsm:text-md sm:text-mdl lg:text-lg">Choose your t-shirt color</h2>
                    <h3 className="text-undertext font-undertext xsm:max-md:text-xsm lg:text-sm">Choose one of the 12 colors to be the primary color of your t-shirt</h3>
                </div>
                <div className="flex flex-col items-center xsm:max-md:items-center xsm:max-md:mt-6 justify-evenly">
                    <SelectColor
                        chosenColor={brandColor}
                        allowedColors={allowedColors}
                        changeColor={onChange}
                        chosenColorName={brandColorName}
                        step={currentStep}
                        circleSize={30}
                        circleSpacing={10}
                        width="60%"
                    />
                </div>
            </div>
        </div>

    )
}
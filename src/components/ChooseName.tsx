import { ChangeEvent, FC } from "react";
import { SelectColor } from "./SelectColor";
import Select from 'react-select';
import { FontSizes, FontWeights, TextShadows, FontList } from "../helpers/FontCustomizations";

interface ChooseBrandProps {
    currentStep: number;
    brandName: string;
    fontChosen?: string;
    textColor: string;
    fontSize?: string;
    fontWeight?: string;
    textShadow?: string;
    letterSpacing?: number;
    textRotate?: number;
    allowedColors: string[];
    chosenColorName: string;
}

interface HandleProps {
    handleColorName: (textColor: any) => void;
    handleBrandName: (e: ChangeEvent<HTMLInputElement>) => void;
    handleFontChosen: (selectedFont: string | undefined) => void;
    handleFontSizeChosen: (selectedFontSize: string | undefined) => void;
    handleFontWeight: (fontWeight: string | undefined) => void;
    handleLetterSpacing: (e: ChangeEvent<HTMLInputElement> | undefined) => void;
    handleTextShadow: (shadow: string | undefined) => void;
    handleTextRotate: (e: any) => void;
    handleRemoveBrandName: () => void;
    handleSaveBrandEdits: () => void;
}

export const ChooseName: FC<ChooseBrandProps & HandleProps> = ({
    fontChosen,
    currentStep,
    brandName,
    handleBrandName,
    handleFontChosen,
    handleFontSizeChosen,
    textColor,
    fontSize,
    fontWeight,
    letterSpacing,
    textShadow,
    textRotate,
    allowedColors,
    chosenColorName,
    handleColorName,
    handleTextRotate,
    handleFontWeight,
    handleLetterSpacing,
    handleRemoveBrandName,
    handleTextShadow,
    handleSaveBrandEdits,
}) => {

    const isBrandName = (): boolean => {
        return brandName === '';
    } 

    //All default values are normal and 12px

    const defaultFontSize = FontSizes[4];

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            ...state.data.style,
        }),
        control: (provided: any) => ({
            ...provided,
            fontFamily: fontChosen,
            backgroundColor: "rgba(112, 3, 179, 0.123)",
            outline: "none",
            border: "none",
            color: "#aaaaaa"
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: "#7003b3"
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: "none"
        }),
    };

    const selectStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: "rgba(112, 3, 179, 0.123)",
            outline: "none",
            border: "none",
            color: "black"
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: "#7003b3"
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: "none"
        }),
    }

    return (
        <div
            className="flex-row items-center justify-center w-full h-full xsm:max-md:flex-col"
            style={currentStep === 3 ? { display: "flex" } : { display: 'none' }}
            id="chooseBrandName"
        >
            <div className="w-[40%] xsm:max-lg:w-[95%] xsm:max-md:h-[20%]  h-full flex items-center justify-center">
                {brandName
                    ? <p id="brandName"
                        style={{
                            fontFamily: fontChosen,
                            fontSize: fontSize,
                            fontWeight: fontWeight,
                            textShadow: textShadow,
                            color: textColor,
                            transform: `rotate(${textRotate}deg)`,
                            letterSpacing: `${letterSpacing}px`
                        }}>{brandName}
                    </p>
                    : <div className="dotted-border h-[80%] w-[90%] xsm:max-md:w-[95%] xsm:max-md: flex items-center justify-center">
                        <h3 className="text-center text-undertext xsm:max-md:text-sm">Enter or upload brand name</h3>
                    </div>
                }
            </div>
            <div className="w-[60%] xsm:max-lg:w-full flex flex-col justify-between xsm:max-md:items-center p-6 xsm:max-md:p-0  h-full">
                <div className="flex flex-row items-center justify-between xsm:max-md:flex-col h-1/3 xsm:max-md:h-[35%] xsm:max-md:w-[95%]">
                    <div className="flex flex-col justify-around h-full w-[50%] xsm:max-md:w-[95%]">
                        <p className="brand-name-labels">Enter brand name</p>
                        <input
                            type="text"
                            id="brandName"
                            onChange={e => handleBrandName(e)}
                            className="bg-slightPurple h-[30%] xsm:max-md:h-[30%] border rounded-lg xsm:max-md:w-full"
                        />
                    </div>
                    <div className="flex-col items-center xsm:max-md:w-full xsm:max-md:text-center xsm:max-md:h-[70%] xsm:max-md:flex">
                        <SelectColor
                            chosenColor={textColor}
                            chosenColorName={chosenColorName}
                            allowedColors={allowedColors}
                            changeColor={handleColorName}
                            step={currentStep}
                            circleSize={20}
                            circleSpacing={10}
                            width="100%"
                        />
                    </div>
                </div>
                <div className="grid w-full grid-cols-3 grid-rows-2 gap-4 xsm:max-md:h-[40%] xsm:max-md:w-[95%] h-2/3">
                    <div className="select-containers">
                        <p className="brand-name-labels">Choose font family</p>
                        <Select
                            options={FontList}
                            name="fonts"
                            isSearchable
                            onChange={selectedFont => handleFontChosen(selectedFont?.value)}
                            styles={customStyles}
                            isDisabled={isBrandName()}
                        />
                    </div>
                    <div className="select-containers">
                        <p className="brand-name-labels">Select font size</p>
                        <Select
                            options={FontSizes}
                            name="font-sizes"
                            onChange={selectedFontSize => handleFontSizeChosen(selectedFontSize?.value)}
                            defaultValue={defaultFontSize}
                            styles={selectStyles}
                            isDisabled={isBrandName()}
                        />
                    </div>
                    <div className="select-containers">
                        <p className="brand-name-labels">Select font weight</p>
                        <Select
                            options={FontWeights}
                            name="font-weights"
                            onChange={selectedFontWeight => handleFontWeight(selectedFontWeight?.value)}
                            styles={selectStyles}
                            isDisabled={isBrandName()}
                        />
                    </div>
                    <div className="select-containers">
                        <p className="brand-name-labels">Letter spacing (px)</p>
                        <input
                            type="number"
                            defaultValue={1}
                            step={0.1}
                            min={0}
                            max={3}
                            onChange={e => handleLetterSpacing(e)}
                            className="brand-name-inputs"
                            disabled={isBrandName()}
                        />
                    </div>
                    <div className="select-containers">
                        <p className="brand-name-labels">Text shadow</p>
                        <Select
                            options={TextShadows}
                            name="text-shadows"
                            onChange={textShadow => handleTextShadow(textShadow?.value)}
                            styles={selectStyles}
                            isDisabled={isBrandName()}
                            
                        />
                    </div>
                    <div className="select-containers">
                        <p className="brand-name-labels">Rotate</p>
                        <input
                            type="number"
                            defaultValue={0}
                            step={1}
                            min={0}
                            max={10}
                            onChange={e => handleTextRotate(e)}
                            className="brand-name-inputs"
                            disabled={isBrandName()}
                        />
                    </div>

                </div>
                <div className="flex flex-row items-end justify-between h-1/3 xsm:max-md:h-[10%] xsm:max-md:w-[95%] xsm:max-md:mb-3">
                    <button className="brand-name-btns" onClick={handleRemoveBrandName}>Remove</button>
                    <button className="brand-name-btns" onClick={handleSaveBrandEdits}>Save changes</button>
                </div>
            </div>
        </div >
    )
}
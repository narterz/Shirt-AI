/**
 * * Allows user to upload a logo or generate one via Dalle prompt
 * * This is preview of the logo that the final response may produce
 * * If a logo is not uploaded the user can type into the textarea prompting the ai generation
 * * If a logo is uploaded the user must breifly explain what they uploaded into textarea
 * * User can also edit and the image via scale, rotation, or crop
 * * sets the brandLogoPrompt via the textarea
 * ! Crop has yet to be implemented
 * ! This section can be skipped but a warning pop up where the user must comfirm
 * ! In order for a logo to be used the textarea must be have brief explanation of logo
 * TODO: Implement complete crop alongside its prompt
 */

import { FC, ChangeEvent, SyntheticEvent, KeyboardEvent, useRef, useEffect, RefObject } from "react";
import { ImFilePicture } from 'react-icons/im';
import { PixelCrop, type Crop, PercentCrop } from "react-image-crop";
import ClipLoader from "react-spinners/ClipLoader";
import { CroppedImage } from "./CroppedImage";

interface ChooseLogoProps {
    loading: boolean;
    brandLogo: string;
    currentStep: number;
    brandLogoPrompt: string;
    isUploaded: boolean;
    edit: boolean;
    crop?: Crop;
    aspect?: number;
    completeCrop?: PixelCrop | undefined;
    logoRotate?: number;
    logoScale?: number;
    imgRef: RefObject<HTMLImageElement>;
}

interface ChooseLogoMethods {
    handleUploadLogo: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    handleComplete: (value: string) => void;
    handleEdit: () => void;
    handleCrop?: (crop: PixelCrop, percentCrop: PercentCrop) => void;
    onImageLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
    handleCompleteCrop: (c: PixelCrop) => void;
    handleLogoRotate?: (e: any) => void;
    handleLogoScale?: (e: any) => void;
    handleRemoveLogo: () => void;
    onImageError: () => void;
}

export const ChooseLogo: FC<ChooseLogoProps & ChooseLogoMethods> = ({
    brandLogo,
    loading,
    brandLogoPrompt,
    isUploaded,
    currentStep,
    handleUploadLogo,
    handleComplete,
    handleRemoveLogo,
    edit,
    handleEdit,
    handleCrop,
    crop,
    aspect,
    onImageLoad,
    completeCrop,
    handleCompleteCrop,
    handleKeyDown,
    onImageError,
    logoScale,
    logoRotate,
    handleLogoScale,
    handleLogoRotate,
    imgRef,
}) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(!brandLogoPrompt && textAreaRef.current) {
            textAreaRef.current.value = ""
        }
    }, [brandLogoPrompt, handleRemoveLogo]);

    return (
        <div 
            className="flex flex-row items-center w-full h-full xsm:max-md:flex-col justify-evenly" 
            style={currentStep === 2 ? { display: "flex" } : { display: 'none' }} 
            id="chooseLogo"
        >
            <div className={brandLogo ? "brand-logo-container-active" : "brand-logo-container-not-active"}>
                {brandLogo
                    ?   <div className="flex flex-col h-[95%] w-full justify-center">
                            {edit
                                ? <CroppedImage
                                    brandLogo={brandLogo}
                                    crop={crop}
                                    aspect={aspect}
                                    logoRotate={logoRotate}
                                    LogoScale={logoScale}
                                    handleCrop={handleCrop}
                                    handleCompleteCrop={handleCompleteCrop}
                                    onImageLoad={onImageLoad}
                                    completeCrop={completeCrop}
                                    imgRef={imgRef}
                                    onImageError={onImageError}
                                />
                                : <img
                                    src={brandLogo}
                                    className="object-contain w-full h-full"
                                    alt="Chosen brand logo"
                                    id="logo"
                                    onError={onImageError}
                                />
                            }
                        </div>
                    :   <>
                            {loading
                                ?   <ClipLoader loading={loading} color="#7003B3" size={100} />
                                :   <>
                                        <ImFilePicture size={100} style={{ color: "#aaaaaa" }} />
                                        <h3 className="mt-5 font-semibold text-undertext">Brand logo preview</h3>
                                    </>
                            }
                        </>
                }
            </div>
            <div className="h-[90%] xsm:max-md:w-[95%] w-[40%] flex items-center justify-around flex-col">
                <div className={edit ? "ai-prompt-container-edit" : "ai-prompt-container"} id="chooseLogo__textarea">
                    <h3 className="font-semibold text-center text-undertext xsm:max-md:text-sm md:text-sm xsm:max-md:font-normal lg:mt-3">Upload logo or generate one using AI</h3>
                    <div className="flex items-center justify-center w-full h-full ">
                        <textarea
                            className="w-full h-[40%] lg:  xsm:max-md:h-[70%] indent-3 outline-none text-undertext bg-slightPurple"
                            name="dalle-textarea"
                            id="dalle-prompt"
                            ref={textAreaRef}
                            placeholder={isUploaded ? "Describe your image ex. A cute hamster" : "Enter a logo for a the AI to create"}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className={edit ? "util-styles-edit" : "util-styles-no-edit"} id="chooseLogo__utils">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadLogo(e)}
                        id="upload-btn"
                        className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10"
                    />
                    <label htmlFor="upload-btn" id="upload" className="bg-primary text-white font-semibold flex justify-center items-center w-[90%] h-[60%] cursor-pointer">
                        Upload a logo
                    </label>
                    <button className={edit ? "brand-logo-btns-edit" : "brand-logo-btns"} id="edit" onClick={handleEdit}>
                        {edit ? "Undo edit" : "edit"}
                    </button>
                    <button 
                    className={edit ? "brand-logo-btns-edit" : "brand-logo-btns"} 
                    id="remove" 
                    onClick={handleRemoveLogo}
                    >
                        Remove
                    </button>
                    <button
                        className={edit ? "brand-logo-btns-edit" : "brand-logo-btns"}
                        id="download"
                        value={edit ? "save" : "download"}
                        onClick={edit ? () => handleComplete("save") : () => handleComplete("download")}>
                        {edit ? "Save changes" : "download"}
                    </button>
                    <div id="logoScale" className={edit ? "brand-logo-btns-edit relative text-white" : "hidden"}>
                        <input
                            type="number"
                            id="scale-input"
                            value={logoScale}
                            onChange={(e) => handleLogoScale && handleLogoScale(e)}
                            className="brand-logo-btns-edit"
                            step="0.1"
                        />
                        <label htmlFor="scale-input" className="absolute font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 text-xsm top-1/2 left-1/2">Scale:</label>
                    </div>
                    <div className={edit ? "brand-logo-btns-edit relative text-white" : "hidden"} id="logoRotate">
                        <input
                            className="brand-logo-btns-edit"
                            type="number"
                            id="rotate-input"
                            value={logoRotate}
                            onChange={(e) => handleLogoRotate && handleLogoRotate(e)}
                        />
                        <label htmlFor="rotate-input" className="absolute font-semibold text-white transform -translate-x-1/2 translate-y-1/2 text-xsm bottom-1/2 left-1/2">Rotate:</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
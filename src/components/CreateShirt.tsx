import { useEffect, useState, useRef, ChangeEvent, SyntheticEvent, KeyboardEvent, FC } from "react"
import { CallDALLERestAPI } from "../api/CallDALLERestAPI";
import { ChooseColor } from "./ChooseColor";
import shirtWhite from '../img/ShirtColors/shirt-white.png';
import { ShirtColor } from "../helpers/ShirtColor";
import { ChooseLogo } from "./ChooseLogo";
import { ChooseName } from "./ChooseName";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeAspectCrop, type Crop, centerCrop, PercentCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import { BsArrowRight } from 'react-icons/bs'
import { ApplyBrandLogoEdits, ApplyCroppedImg } from '../helpers/ApplyEdits';
import { useDebounceEffect } from "../helpers/useDebounceEffect";
import { fontFamily } from "@remotion/google-fonts/Inter";
/**
 * TODO: Checks for if there is a brandlogo but no logodescription
 */

interface GlobalProps {
    brandColor: string;
    brandLogo: string;
    brandName: string;
    brandLogoPrompt: string;
    brandNamePrompt: string;
    brandColorName: string;
    loading: boolean;
}

interface GlobalMethods {
    handleDownload: (value: string) => void;
    triggerLoad: (duration: number) => void;
    brandColorSetter: (value: string) => void;
    brandLogoSetter: (value: string) => void;
    brandNameSetter: (value: string) => void;
    brandColorNameSetter: (value: string) => void;
    brandLogoPromptSetter: (value: string) => void;
    brandNamePromptSetter: (value: string) => void;
    startResults: () => void;
    generateFinalShirt: () => void;
}

export const CreateShirt: FC<GlobalMethods & GlobalProps> = ({
    handleDownload,
    triggerLoad,
    brandColor,
    brandLogo,
    brandName,
    brandColorName,
    brandLogoPrompt,
    brandNamePrompt,
    brandColorSetter,
    brandLogoSetter,
    brandNameSetter,
    brandColorNameSetter,
    generateFinalShirt,
    brandLogoPromptSetter,
    brandNamePromptSetter,
    loading }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);

    const [shirtURL, setShirtURL] = useState<string>(shirtWhite);

    const [editLogo, setEditLogo] = useState<boolean>(false);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        x: 25,
        y: 25,
        width: 50,
        height: 50
    });
    const imgRef = useRef<HTMLImageElement>(null);
    const [logoDescription, setLogoDescription] = useState<string>('');
    const [imgError, setImgError] = useState<boolean>(false);
    const [completeCrop, setCompleteCrop] = useState<PixelCrop | undefined>();
    const [logoScale, setLogoScale] = useState(1);
    const [logoRotate, setLogoRotate] = useState(0);
    const [aspect, setAspect] = useState<number | undefined>(4 / 3);

    const [savedBrandName, setSavedBrandName] = useState<boolean>();
    const [fontChosen, setFontChosen] = useState<string>('sans-serif');
    const [fontSize, setFontSize] = useState<string>('12px');
    const [fontWeight, setFontWeight] = useState<string>('normal');
    const [textShadow, setTextShadow] = useState<string>("none");
    const [letterSpacing, setLetterSpacing] = useState<number>(1);
    const [textRotate, setTextRotate] = useState<number>(0);
    const [textColor, setTextColor] = useState<string>('#000000');
    const [textColorName, setTextColorName] = useState<string>("black");

    const allowedColors = ["white", "grey", "black", "red", "yellow", "gold", "orange", "lightGreen", "green", "purple", "lightBlue", "blue"];

    const navigate = useNavigate();

    // -----> Global create shirt methods 

    const stepColor = (step: number) => {
        const currentStepColor = { color: "#7003B3" };
        const otherStepColor = { color: "#aaaaaa" };
        if (step === currentStep) {
            return currentStepColor
        } else {
            return otherStepColor
        }
    };

    const handleSteps = () => {
        if (currentStep === 2) {
            if (!brandLogo && !logoDescription) {
                toast.warning("You have not picked a logo. Do you wish to continue?", {
                    containerId: "warning",
                    closeButton: <BsArrowRight size={20} onClick={handleNoBrandLogo} />
                });
                return;
            } if (brandLogo && !logoDescription) {
                toast.error("You must describe the image uploaded for accurate AI generation", {
                    containerId: "error",
                })
                return;
            }
            if (editLogo) {
                toast.error("Please save changes to continue", {
                    containerId: "error"
                });
                return;
            }
            if (imgError) {
                toast.error("There was an error with the image. Please press remove and try again", {
                    containerId: "error"
                })
                return
            }
        } else if (currentStep === 3) {
            if ((!brandName && !brandNamePrompt)) {
                toast.warning("You have not entered a brand name. Do you wish to continue?", {
                    containerId: "warning",
                    closeButton: <BsArrowRight size={20} onClick={handleNoBrandLogo} />
                });
                return;
            }
            if (brandName && !savedBrandName) {
                toast.error("You must save changes to continue", {
                    containerId: "error"
                })
                return
            }
            if (brandName && savedBrandName) {
                setCurrentStep(currentStep + 1)
            }
        }
        setCurrentStep(currentStep + 1)
    }

    const handlePrev = () => {
        triggerLoad(1000);
        if (currentStep === 1) {
            navigate('/');
            brandColorSetter('')
            brandColorNameSetter("white");
            setShirtURL(shirtWhite);
        } else if (currentStep === 2) {
            setCurrentStep(currentStep - 1);
            brandLogoSetter('');
            brandLogoPromptSetter('');
            resetLogoEdits();
        } else {
            setCurrentStep(currentStep - 1);
            removeAll();
        }
    }

    // -----> ChooseLogo methods

    // -----> ChooseLogo helpers 

    const missingBrandLogo = () => toast.error("❌ must add brand logo!", {
        containerId: "error"
    })

    const handleNoBrandLogo = () => {
        setCurrentStep(currentStep + 1);
        triggerLoad(1000);
    }
    const resetLogoEdits = () => {
        setEditLogo(false);
        setCrop({
            unit: '%',
            x: 25,
            y: 25,
            width: 50,
            height: 50
        })
        setLogoScale(1);
        setLogoRotate(0);
    }

    const removeAllLogoData = () => {
        setLogoRotate(0);
        setLogoScale(1);
        setLogoDescription("");
        brandLogoSetter('');
        brandLogoPromptSetter('');
        setImgError(false);
        setEditLogo(false);
    }

    // -----> ChooseLogo main methods 

    const handleUploadLogo = (e: ChangeEvent<HTMLInputElement>) => {
        removeAllLogoData();
        setIsUploaded(true);
        if (e.target.files && e.target.files[0]) {
            triggerLoad(1000);
            brandLogoSetter(URL.createObjectURL(e.target.files[0]));
            setEditLogo(false);
            setAspect(undefined);
        }
    }

    const handleRemoveLogo = () => {
        if (brandLogo) {
            removeAllLogoData()
            setIsUploaded(false);
        } else {
            missingBrandLogo()
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (isUploaded) {
                setLogoDescription(e.currentTarget.value)
                toast.success("✅ image description saved!", {
                    containerId: "success"
                });
            } else {
                triggerLoad(8000);
                setLogoDescription(e.currentTarget.value);
            }
        }
    }

    const handleEditLogo = () => {
        if (brandLogo) {
            setEditLogo(!editLogo);
        } else {
            missingBrandLogo();
        }
    }

    // -----> ChooseLogo edit methods 

    const applyEdits = (scale: number, rotation: number) => {
        const editedLogo = ApplyBrandLogoEdits(brandLogo, scale, rotation);
        brandLogoSetter(editedLogo)
    }

    const handleComplete = (value: string) => {
        if (brandLogo) {
            if (value === "download") {
                handleDownload(brandLogo);
            } else if (value === "save") {
                applyEdits(logoScale, logoRotate)
                setEditLogo(false);
            }
        } else {
            missingBrandLogo();
        }
    }

    const handleCrop = (crop: Crop, percentCrop: PercentCrop) => {
        if (crop && percentCrop) {
            setCrop((prevCrop) => ({
                ...prevCrop,
                x: percentCrop.x,
                y: percentCrop.y,
                width: percentCrop.width,
                height: percentCrop.height
            }));
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completeCrop?.width &&
                completeCrop?.height &&
                imgRef.current
            ) {
                applyEdits(logoScale, logoRotate)
            }
        },
        100,
        [completeCrop, logoScale, logoRotate]
    )

    const handleCompleteCrop = (c: PixelCrop) => {
        setCompleteCrop(c)
        if (brandLogo) {
            const croppedLogo = ApplyCroppedImg(brandLogo, c);
            brandLogoPromptSetter(croppedLogo);
        }
    }

    const handleLogoScale = (e: any) => {
        setLogoScale(Number(e.target.value));
    }

    const handleLogoRotate = (e: any) => {
        setLogoRotate(Number(e.target.value));
    }

    const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        )
    }

    //aspect ratio is rounded to achieve 1:1 ratio that is common with most images
    const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const imageElement = e.target as HTMLImageElement;
            const width = imageElement.naturalWidth;
            const height = imageElement.naturalHeight;
            setTimeout(() => {
                setCrop(centerAspectCrop(width, height, Math.round(aspect)));
            }, 0);
        }
    };

    useEffect(() => {
        brandLogoPromptSetter(logoDescription);
        // edge cases
        if (logoRotate === 0 && logoScale === 1) {
            return;
        } else if (logoScale > 1 && logoRotate === 0) {
            brandLogoPromptSetter(`${logoDescription} scaled by ${logoScale}`)
        } else if (logoRotate > 0 && logoScale === 1) {
            brandLogoPromptSetter(`${logoDescription} rotated by ${logoRotate}`)
        } else {
            brandLogoPromptSetter(`${logoDescription} scaled by ${logoScale} and rotated by ${logoRotate}`)
        }
    }, [handleKeyDown, logoRotate, logoScale, handleComplete])

    // -----> ChooseName Methods

    // -----> ChooseName helpers 

    const removeAll = () => {
        brandNameSetter('');
        setFontChosen('');
        setTextColor('')
        setFontSize('');
        setTextShadow('');
        setTextRotate(0)
        setLetterSpacing(0);
        setTextColorName('');
        setSavedBrandName(false);
    }

    const getBrandNamePrompt = () => {
        let shadow;
        if (textShadow === "3px 3px 3px rgba(0, 0, 0, 0.4)") {
            shadow = "large"
        }
        if (textShadow === "1px 1px 1px rgba(0, 0, 0, 0.2)") {
            shadow = "small"
        }
        brandNamePromptSetter(`${brandName} with font family ${fontFamily}, ${fontSize} font size, ${textColorName} text color ${fontWeight === "normal" ? '' : "," + fontWeight + " font weight"} ${letterSpacing === 1 ? '' : ", " + letterSpacing + " letter spacing"} ${textShadow === "none" ? '' : ", " + shadow + " text shadow"} ${textRotate <= 0 ? '' : ", and slight rotation"}`);
    }

    const validateBrandName = (value: string): boolean => {
        let validateLetter = false;
        let validateQuotes = false;
        if(/[a-zA-z]/.test(value)) {
            validateLetter = true;
        }
        if(!value.includes('"') || !value.includes("'")){
            validateQuotes = true
        }
        if(validateLetter && validateQuotes){
            return true
        } else {
            return false
        }
    }

    // -----> ChooseLogo Text modification methods 

    const handleBrandName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(validateBrandName(e.target.value)){
            brandNameSetter(e.target.value);
        } else {
            toast.error("Brand name must have at least on letter and not quotation marks", {
                containerId: "error"
            })

        }
    }

    const handleFontChosen = (selectedFont: any) => {
        if (selectedFont) {
            setFontChosen(selectedFont);
        } else {
            toast.error("Could not choose font", {
                containerId: "error"
            })
        }
    }

    const handleFontSizeChosen = (selectedFontSize: any) => {
        setFontSize(selectedFontSize)
    }

    const handleFontWeight = (selectedFontWeight: string | undefined) => {
        selectedFontWeight && setFontWeight(selectedFontWeight)
    }

    const handleTextShadow = (textShadow: string | undefined) => {
        textShadow && setTextShadow(textShadow);
    }

    const handleLetterSpacing = (e: ChangeEvent<HTMLInputElement> | undefined) => {
        const input = e?.target.value;
        input && setLetterSpacing(Number(input));
    }

    const handleTextRotate = (e: ChangeEvent<HTMLInputElement> | undefined) => {
        const input = e?.target.value;
        input && setTextRotate(Number(input));
    }

    // -----> ChooseName button methods 

    const handleRemoveBrandName = () => {
        toast.success("✅ Brand name removed", {
            containerId: 'success'
        });
        removeAll();
    }

    const handleSaveBrandEdits = () => {
        if (brandName) {
            setSavedBrandName(true);
            getBrandNamePrompt();
            toast.success("✅ Your brand name has been saved", {
                containerId: "success"
            })
        } else {
            toast.error("❌ You have not entered or uploaded a brand name", {
                containerId: "error"
            });
        }
    }

    const handleColorName = (color: any) => {
        setTextColor(color.hex);
        setTextColorName(color.name)

    }

    const onImageError = () => {
        toast.error("❌ There was an error while uploading your image. Please remove image and try again", {
            containerId: "error"
        });
        setImgError(true);
    }

    // -----> Dalle response handling 

    useEffect(() => {
        if (!isUploaded) {
            const dalleImage = async () => {
                const dalleRes = await CallDALLERestAPI(logoDescription);
                brandLogoSetter(dalleRes.data[0].url);
            }
            dalleImage();
        }
    }, [logoDescription])

    useEffect(() => {
        if (currentStep === 4) {
            navigate('/results')
            generateFinalShirt()
        }
    }, [currentStep])

    // -----> ChooseColor shirt color choice 

    const findMatchingColor = (chosenColor: string) => {
        return ShirtColor.find((matchingColor) => matchingColor.hex === chosenColor) || {
            color: "",
            hex: "",
            shirt: "",
        };
    }

    useEffect(() => {
        const matchingShirt = findMatchingColor(brandColor);
        setShirtURL(matchingShirt.shirt);
        brandColorNameSetter(matchingShirt.color);
    }, [brandColor])

    useEffect(() => {
        const matchingTextColor = findMatchingColor(textColor)
        setTextColorName(matchingTextColor.color)
    }, [textColor])

    return (
        <div className="h-[92vh] bg-white flex flex-col justify-between items-center overflow-hidden" id="createShirt">
            <div className="flex xsm:max-lg:flex-col xsm:max-lg:items-start lg:flex-row justify-evenly lg:justify-between xsm:w-[70%] sm:w-[55%] md:w-[45%] lg:w-[80%] xl:w-[60%] xsm:max-md:text-center mb-5 mt-10">
                <h3 style={stepColor(1)} className="shirt-steps">1. Choose your color scheme</h3>
                <h3 style={stepColor(2)} className="shirt-steps">2. Create your logo</h3>
                <h3 style={stepColor(3)} className="shirt-steps">3. Choose your brand name</h3>
            </div>
            <div className="xsm:max-md:w-[90%] md:w-[90%] xsm:max-md:h-[80%] lg:w-[80%] xl:w-[60%]  bg-slightPurple border rounded-lg" style={currentStep === 1 ? {height: "70%"} : {height: "80%"}}>
                {loading
                    ? <div className="flex items-center justify-center h-full">
                        <ClipLoader loading={loading} color="#7003B3" size={100} />
                    </div>
                    : <>
                        <ChooseColor
                            brandColor={brandColor}
                            shirtURL={shirtURL}
                            allowedColors={allowedColors}
                            onChange={(color) => brandColorSetter(color.hex)}
                            brandColorName={brandColorName}
                            currentStep={currentStep}
                            loading={loading}
                        />
                        <ChooseLogo
                            brandLogo={brandLogo}
                            loading={loading}
                            currentStep={currentStep}
                            isUploaded={isUploaded}
                            handleUploadLogo={handleUploadLogo}
                            brandLogoPrompt={brandLogoPrompt}
                            handleRemoveLogo={handleRemoveLogo}
                            handleComplete={handleComplete}
                            edit={editLogo}
                            handleEdit={handleEditLogo}
                            handleCrop={handleCrop}
                            crop={crop}
                            imgRef={imgRef}
                            completeCrop={completeCrop}
                            onImageLoad={onImageLoad}
                            onImageError={onImageError}
                            logoScale={logoScale}
                            logoRotate={logoRotate}
                            handleLogoRotate={handleLogoRotate}
                            handleLogoScale={handleLogoScale}
                            handleCompleteCrop={handleCompleteCrop}
                            handleKeyDown={handleKeyDown}
                            aspect={aspect}
                        />
                        <ChooseName
                            fontChosen={fontChosen}
                            currentStep={currentStep}
                            brandName={brandName}
                            textColor={textColor}
                            fontSize={fontSize}
                            fontWeight={fontWeight}
                            textShadow={textShadow}
                            letterSpacing={letterSpacing}
                            textRotate={textRotate}
                            allowedColors={allowedColors}
                            chosenColorName={textColorName}
                            handleColorName={handleColorName}
                            handleBrandName={handleBrandName}
                            handleFontChosen={handleFontChosen}
                            handleFontSizeChosen={handleFontSizeChosen}
                            handleRemoveBrandName={handleRemoveBrandName}
                            handleFontWeight={handleFontWeight}
                            handleLetterSpacing={handleLetterSpacing}
                            handleTextRotate={handleTextRotate}
                            handleTextShadow={handleTextShadow}
                            handleSaveBrandEdits={handleSaveBrandEdits}
                        />
                    </>
                }
            </div>
            <div className="xsm:max-md:w-[90%]  xsm:max-md:justify-between md:w-[90%] w-[80%] xl:w-[60%]  h-[10%] flex flex-row justify-evenly items-center">
                <button
                    className="bg-primary xsm:max-md:w-[40%] xsm:max-md:text-sm text-white w-[20%] h-[70%] text-md"
                    onClick={() => handlePrev()}>Back
                </button>
                <button
                    className="w-[20%] xsm:max-md:w-[40%] xsm:max-md:text-sm h-[70%] text-md"
                    onClick={() => navigate('/')}
                    style={currentStep < 4 ? { display: 'none' } : { display: 'block' }}>Finish
                </button>
                <button
                    className="bg-primary xsm:max-md:w-[40%] xsm:max-md:text-sm text-white w-[20%] h-[70%] text-md"
                    onClick={() => handleSteps()}>{currentStep === 3 ? "See Results" : "Next step"}
                </button>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={true}
                draggable
                theme="light"
                enableMultiContainer
                containerId={'error'}
            />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                draggable theme="light"
                hideProgressBar={true}
                enableMultiContainer
                containerId={'warning'}
                closeButton={<BsArrowRight />}
            />
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={true}
                draggable
                theme="light"
                enableMultiContainer
                containerId={'success'}
            />
        </div>
    )
}


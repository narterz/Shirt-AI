import { FC, SyntheticEvent, RefObject } from "react";
import ReactCrop, { PixelCrop, type Crop, PercentCrop } from "react-image-crop";

interface CroppedImageProps {
    brandLogo: string;
    crop?: Crop;
    aspect?: number;
    logoRotate?: number;
    LogoScale?: number;
    completeCrop: PixelCrop | undefined;
    imgRef: RefObject<HTMLImageElement>
}

interface CroppedImageMethods {
    handleCrop?: (crop: PixelCrop, percentCrop: PercentCrop) => void;
    handleCompleteCrop?: (c: PixelCrop) => void;
    onImageLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
    onImageError: () => void;
}



export const CroppedImage: FC<CroppedImageProps & CroppedImageMethods> = ({
    brandLogo,
    crop,
    aspect,
    logoRotate,
    LogoScale,
    handleCrop,
    handleCompleteCrop,
    onImageLoad,
    onImageError,
    imgRef
}) => {

    return (
        <ReactCrop
            crop={crop}
            onChange={(crop, percentCrop) => handleCrop && handleCrop(crop, percentCrop)}
            onComplete={(c) => handleCompleteCrop && handleCompleteCrop(c)}
            aspect={aspect}
            className="flex items-center justify-center h-full "
            style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <img
                src={brandLogo}
                ref={imgRef}
                className="absolute top-0 left-0 right-0 object-contain w-full h-full ms-auto me-auto"
                alt="Chosen brand logo"
                id="logo"
                onLoad={onImageLoad}
                style={{ 
                    transform: `scale(${LogoScale}) rotate(${logoRotate}deg)` 
                }}
                onError={onImageError}
            />
        </ReactCrop>
    )
}
import { PixelCrop } from "react-image-crop";

export const ApplyBrandLogoEdits = (logoUrl: string, scale: number, rotate: number) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = logoUrl;
  canvas.width = img.width;
  canvas.height = img.height;

  if(ctx) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2);
  }
  const editedLogo = canvas.toDataURL("image/png");

  return editedLogo;
};

export const ApplyCroppedImg = (imageSrc: string, pixelCrop: PixelCrop): string => {
    const image = new Image();
    image.src = imageSrc;
  
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
  
    if (ctx) {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
    }
  
    return canvas.toDataURL('image/jpeg');
  };

export const ApplyBrandNameEdits = (
  brandName: string,
  fontChosen: string,
  fontSize: string,
  fontWeight: string,
  textShadow: string,
  textColor: string,
  letterSpacing: number,
  textRotate: number
) => {
  const editedBrandName = document.createElement("p");
  editedBrandName.style.fontFamily = fontChosen;
  editedBrandName.style.fontSize = fontSize;
  editedBrandName.style.fontWeight = fontWeight;
  editedBrandName.style.textShadow = textShadow;
  editedBrandName.style.color = textColor;
  editedBrandName.style.transform = `rotate(${textRotate}deg)`;
  editedBrandName.style.letterSpacing = `${letterSpacing}px`;
  editedBrandName.textContent = brandName;

  return editedBrandName;
}
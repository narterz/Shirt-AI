import { TopGoogleFonts } from "./TopGoogleFonts";

const allowedFontSizes = [
    "8px",
    "9px",
    "10px",
    "11px",
    "12px",
    "14px",
    "18px",
    "24px",
    "30px",
    "36px",
    "48px",
    "60px",
    "72px",
    "96px",
];

const allowedFontWeights = [
    {label: "lightest", value: "200"},
    {label: "light", value: "300"},
    {label: "normal", value: "normal"},
    {label: "bold", value: "bold"},
    {label: "boldest", value: "bolder"}
]

const allowedTextShadows = [
    {label: "none", value: "none"},
    {label: "small", value: "1px 1px 1px rgba(0, 0, 0, 0.2)"},
    {label: "normal", value: "2px 2px 2px rgba(0, 0, 0, 0.3)"},
    {label: "large", value: "3px 3px 3px rgba(0, 0, 0, 0.4)"}
]

export const FontSizes = allowedFontSizes.map((size) => ({
    value: size,
    label: size
}));

export const FontWeights = allowedFontWeights.map((weight) => ({
    value: weight.value,
    label: weight.label
}));

export const TextShadows = allowedTextShadows.map((shadow) => ({
    value: shadow.value,
    label: shadow.label
}))

export const FontList = TopGoogleFonts.map(font => ({
    value: font.family,
    label: font.family,
    style: {
        fontFamily: font.family,
        fontStyle: 'normal',
        fontWeight: 'normal',
    }
}))




import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Homepage } from './components/Homepage';
import { CreateShirt } from './components/CreateShirt';
import { HowItWorks } from './components/HowItWorks';
import { Results } from './components/Results';
import { CallDALLERestAPI } from './api/CallDALLERestAPI';

function App() {
  const [brandColor, setBrandColor] = useState<string>('#ffffff')
  const [brandLogo, setBrandLogo] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  const [brandLogoPrompt, setbrandLogoPrompt] = useState<string>("");
  const [brandNamePrompt, setBrandNamePrompt] = useState<string>('');
  const [brandColorName, setBrandColorName] = useState<string>('white')
  const [createdShirt, setCreatedShirt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const brandColorSetter = (value: string) => {
    setBrandColor(value);
  }

  const brandLogoSetter = (value: string) => {
    setBrandLogo(value);
  }

  const brandNameSetter = (value: string) => {
    setBrandName(value);
  }

  const brandLogoPromptSetter = (value: string) => {
    setbrandLogoPrompt(value);
  }

  const brandNamePromptSetter = (value: string) => {
    setBrandNamePrompt(value);
  }

  const brandColorNameSetter = (value: string) => {
    setBrandColorName(value);
  }

  const handleDownload = (value: string) => {
    console.log("This has fired too")
    if (value) {
      const link = document.createElement("a");
      link.href = value;
      link.download = `image.png`;
      link.click();
    }
  }

  const triggerLoad = (duration: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, duration)
  }

  const generateFinalShirt = async () => {
    setLoading(true)
    const prompt = `A ${brandColorName} tshirt ${brandLogoPrompt ? "with " + brandLogoPrompt + " in the middle " : " " }${brandNamePrompt ? "and the text " + brandNamePrompt : ''}`;
    console.log(prompt);
    const createdShirtRes = await CallDALLERestAPI(prompt);
    setCreatedShirt(createdShirtRes.data[0].url);
    setLoading(false)
  }

  useEffect(() => {
    if(createdShirt) {
      setLoading(false)
    }
  }, [createdShirt])

  return (
    <Router>
      <Nav />
      <Routes>
        <Route element={<Homepage />} path='/' />
        <Route element={<CreateShirt
          handleDownload={handleDownload}
          triggerLoad={triggerLoad}
          brandColor={brandColor}
          brandLogo={brandLogo}
          brandName={brandName}
          brandLogoPrompt={brandLogoPrompt}
          brandNamePrompt={brandNamePrompt}
          brandColorName={brandColorName}
          brandColorNameSetter={brandColorNameSetter}
          brandNamePromptSetter={brandNamePromptSetter}
          brandLogoPromptSetter={brandLogoPromptSetter}
          brandColorSetter={brandColorSetter}
          brandLogoSetter={brandLogoSetter}
          brandNameSetter={brandNameSetter}
          generateFinalShirt={generateFinalShirt}
          loading={loading} startResults={function (): void {
            throw new Error('Function not implemented.');
          } } />} path='/createShirt' />
        <Route element={<HowItWorks />} path='/howItWorks' />
        <Route element={<Results
          createdShirt={createdShirt}
          loading={loading}
          handleDownload={handleDownload}
          brandColor={brandColor}
          brandLogoPrompt={brandLogoPrompt}
          brandNamePrompt={brandLogoPrompt} />}
          path='/results' 
        />
      </Routes>
    </Router>
  );
}

export default App;

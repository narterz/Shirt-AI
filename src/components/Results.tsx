import { FC, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";

interface ResultsProps {
  brandColor: string;
  brandLogoPrompt: string;
  brandNamePrompt: string;
  loading: boolean;
  handleDownload: (value: string) => void;
  createdShirt: string; 
}

export const Results: FC<ResultsProps> = ({
  brandColor,
  brandLogoPrompt,
  brandNamePrompt,
  createdShirt,
  loading, 
  handleDownload}) => {

    const navigate = useNavigate();

    //reload page to reset all option
    const handleRestart = () => {
      navigate('/createShirt');
      window.location.reload();
    }

    const handleViewImage = (value: string) => {
      window.open(value, '_blank');
  }

  useEffect(() => {
    console.log(brandColor, brandLogoPrompt, brandNamePrompt)
  })

    return (
        <div className="h-[92vh] overflow-hidden bg-white">
          { loading 
              ? <div className="flex flex-col items-center w-full h-full justify-evenly">
                  <h3 className="text-primary xsm:max-md:text-center">Please wait while ShirtAI generates your t-shirt...</h3>
                  <ClipLoader loading={loading} color="#7003B3" size={100} />
                </div>
              : <div className="flex flex-col items-center justify-between w-full h-full bg-primary" id="results">
                  <div className="flex flex-col items-center mt-5 xsm:max-md:h-2/6 xl:w-[60%] xl:h-2/5 justify-between md:w-[85%] md:h-[40%] xsm:w-full xsm:max-lg:justify-between xsm:max-md:text-center bg-primary">
                    <h1 className="font-bold text-white xsm:max-xl:text-mdl xsm:max-md:text-md">Your created shirt!</h1>
                      <img
                        src={createdShirt}
                        alt="AI generated T-Shirt"
                        className="max-w-[70%] max-h-[70%] mb-5"
                      />
                  </div>
                  <div className="flex flex-col items-center justify-around md:w-[85%] xsm:max-md:h-4/6 xsm:w-full md:h-[60%] xl:h-2/2 xl:w-[60%] border-t rounded-t-lg bg-white">
                    <div className="flex flex-col items-center justify-evenly w-full  sm:w-[90%] md:h-2/5 ">
                      <h2 className="font-semibold text-primary md:text-mdl xsm:max-md:textfmd text-center lg:w-full md:w-[90%]">Now its your turn to bring your creation to life!</h2>
                      <h3 className="text-undertext text-center xsm:w-[90%] xsm:max-md:text-xsm xsm:max-md:mt-3 xsm:text-xxsm md:text-xsm w-[80%]">Download your T-shirt and upload it to either of the websites listed below so it can be shipped</h3>
                    </div>
                    <div className="flex flex-row justify-around items-center 
                     sm:w-[90%] xsm:w-[95%] xsm:h-[35%] md:h-2/5 h-[25%]">
                      <div className="flex flex-col items-center justify-between h-full xsm:w-1/2">
                        <a href="https://www.customink.com/ndx/#/">Customink.com</a>
                        <ul className="list-disc text-undertext ml-[1.5rem] md:text-xsm md:h-full md:flex flex-col justify-evenly">
                          <li>higher quality Hanes brand</li>
                          <li>Slightly expensive</li>
                          <li>Shipping takes 1-2 weeks</li>
                        </ul>
                      </div>
                      <div className="flex flex-col items-center justify-between h-full xsm:w-1/2">
                        <a href="https://www.spreadshirt.com/create-your-own">Spreadshirt.com</a>
                        <ul className="list-disc text-undertext md:h-full md:flex flex-col justify-evenly  ml-[1.5rem] md:text-xsm">
                          <li>Lower quality Spreadshirt brand</li>
                          <li>More affordable</li>
                          <li>Shipping takes 5-7 days</li>
                        </ul>
                      </div>
                    </div>
                    <div 
                      className="flex flex-row justify-between items-end 
                      sm:w-[90%] w-[80%] xsm:max-lg:w-[95%] h-[25%] xsm:max-md:h-1/5 xsm:h-[20%]  md:h-1/5 md:mb-3">
                      <button onClick={() => handleViewImage(createdShirt)} className="result-btns">View in new tab</button>
                      <button onClick={() => handleDownload(createdShirt)} className="result-btns">download</button>
                      <button onClick={handleRestart} className="result-btns">Start new t-shirt</button>
                    </div>
                  </div>
                </div>
          }
        </div>
    )
}
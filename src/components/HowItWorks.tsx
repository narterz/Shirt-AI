import colorClothes from '../img/color-clothes.png';
import design from '../img/design.jpg';
import branding from '../img/branding.png'
import final from '../img/final.jpg';
import { useNavigate } from 'react-router';

export const HowItWorks = () => {

    const navigate = useNavigate()

    return (
        <div className="xsm:max-md:mt-[5vh] md:mt-0 md:w-[90%] me-auto ms-auto items-center w-full md:h-[92vh] xsm:max-md:bg-white xsm:max-md:text-primary md:max-xxl:bg-primary  md:text-white flex flex-col justify-evenly xsm:max-md:overflow-y-auto md:overflow-y-hidden" id='howItWorks'>
            <div className='xsm:max-md:h-auto md:h-1/4 h-[10%] md:mb-5 lg:flex flex-col items-center xsm:max-md:w-[90%]'>
                <div className='flex flex-col items-center text-center md:prose-sm lg:prose-lg xl:prose-xl'>
                    <h3 className='font-semibold xsm:max-ms:text-primary md:text-md xsm:max-md:w-full md:w-full lg:w-full xl:text-lg md:text-white'>Create your very own t-shirt in just 4 easy steps!</h3>
                    <p className='text-undertext lg:w-[70%] lg:text-xsm lg:mb-3'>ShirtAI uses an AI to generate a t-shirt based off the customizations you choose. upon completion of the first three steps a prompt containing all of the customizations is sent to the ai to generate.</p>
                </div>
                <div className='xsm:max-lg:mt-8 h-[5vh] lg:w-[70%] flex flex-row justify-between lg:justify-around items-center'>
                    <button className='xsm:max-md:w-[40%] xsm:max-md:h-full xsm:max-md:bg-primary xsm:max-md:text-white bg-white text-primary w-[35%] h-full lg:w-[30%]' onClick={() => navigate('/createShirt')}>Craft Shirt</button>
                    <button className='xsm:max-md:w-[40%] xsm:max-md:h-full xsm:max-md:bg-primary xsm:max-md:text-white bg-white text-primary w-[30%] h-full lg:w-[30%]' onClick={() => navigate('/homepage')}>Back to Home</button>
                </div>
            </div>
            <div className='xsm:max-md:w-[90%] md:w-full lg:w-[70%] flex md:h-3/4 flex-col xsm:max-md:mt-8 xsm:max-md:h-auto md:overflow-hidden' id='hiwGrid'>
                <div className='flex items-center justify-between md:flex-row xsm:max-md:flex-col h-1/2'>
                    <div className="step xsm:max-md:h-1/3 md:justify-between md:items-start" id='step-1'>
                        <div className='step-box-title'>
                            <h2>01.</h2>
                            <h4>Choose your shirt color</h4>
                        </div>
                        <div className='step-box'>
                            <img src={colorClothes} alt="collection of color clothes" />
                            <div className='step-box-text'>
                                <h3>Pick a primary color</h3>
                                <ul className='md:ms-24'>
                                    <li>Required</li>
                                    <li>Choose one of twelve colors</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='step xsm:max-md:h-1/3 md:items-end' id='step2'>
                        <div className='step-box-title'>
                            <h2>02.</h2>
                            <h4>Choose your Logo</h4>
                        </div>
                        <div className='step-box'>
                            <img src={branding} alt="logo alt" />
                            <div className="step-box-text">
                                <h3>Upload or generate logo with AI</h3>
                                <ul className='list-disc md:mb-5'>
                                    <li>Optional</li>
                                    <li>Logo will be center piece of shirt</li>
                                    <li>scale and rotation edits can be made</li>
                                    <li>Logo must be described</li>
                                    <li>Edits must be saved</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between md:flex-row xsm:max-md:flex-col h-1/2'>
                    <div className='step md:items-start' id='step-3'>
                        <div className='step-box-title'>
                            <h2>03.</h2>
                            <h4>Choose brand Name</h4>
                        </div>
                        <div className='step-box'>
                            <img src={design} alt="logo illuistration" />
                            <div className="step-box-text">
                                <h3>Unlimited customizations for your brand name</h3>
                                <ul>
                                    <li>Brand name will accomdate logo</li>
                                    <li>font size, font weight, font family, text color, letter spacing, text shadow, and rotation edits can be made</li>
                                    <li>All edits must be saved</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="step xsm:max-md:h-[70%] md:h-full md:items-end" id='step-4'>
                        <div className='step-box-title'>
                            <h2>04.</h2>
                            <h4>Obtain your t-shirt</h4>
                        </div>
                        <div className="step-box">
                            <img src={final} alt="girl with clothes red background" />
                            <div className="step-box-text">
                                <h3 className=''>View your t-shirt, download it, print it</h3>
                                <ul className=' w-[95%]'>
                                    <li>AI will generate shirt based on prompt</li>
                                    <li>Upon completion shirt can be viewed and downloaded</li>
                                    <li>To print shirt visit affliated links that can ship downloaded shirt</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}



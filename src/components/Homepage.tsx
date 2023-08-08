import modelTshirt from '../img/female-model-t-shirt-mockup-design-psd-99afbf-removebg-preview.png';
import { useNavigate} from 'react-router-dom';
import graphicSVG from '../img/undraw_design_inspiration_re_tftx.svg';

export const Homepage = () => {

    const navigate = useNavigate();

    return (
        <div className="h-[92vh] bg-primary relative text-raleway overflow-hidden " id="homepage">
            <div className='md:absolute md:h-[70%] md:w-[50%] xsm:max-md:hidden right-0' id='planet'></div>
            <div className="xsm:max-md:h-full xsm:max-md:bg-primary xl:h-[70%] lg:h-[75%] md:h-[70%] xl:w-[60%] lg:w-[60%] md:w-[63%] bg-white absolute bottom-0 left-0 flex flex-col justify-between">
                <div className='xsm:max-md:h-full  h-full w-full flex flex-col justify-between z-10'>
                    <div className='xsm:max-md:mt-10 xsm:max-md:h-2/3 xsm:max-md:flex xsm:max-md:flex-col xsm:max-sm:justify-evenly lg:mt-20 md:mt-20 xl:mt-10 '>
                        <h2 className="xsm:max-md:text-lg xsm:max-md:ms-6 xsm:max-md:text-white xsm:max-md:mb-10 md:text-mdl md:w-[90%] md:ms-10 lg:ms-20 xxl:text-xl xl:text-lg lg:w-[70%] sm:w-[90%] sm:ms-6 text-primary"><b>Customize your own tops</b> with the power of AI</h2>
                        <h3 className=" xsm:max-md:text-xsm xsm:max-md:ms-6 xsm:max-md:mb-24 md:w-[90%] md:ms-10 md:mt-5 lg:ms-20 xl:mt-12 text-undertext xxl:text-md xl:text-sm md:text-xsm sm:text-xsm xl:w-[60%] lg:w-[70%]  sm:w-[90%]">Create your color scheme, create your logo, establish your brand name, cast out your designs</h3>
                    </div>
                    <div className='xsm:max-sm:h-1/3 sm:h-[60%] xsm:max-md:w-[90%]  xsm:max-md:ms-6 xsm:max-md:items-center md:w-[90%] md:ms-10 lg:ms-20  sm:ms-6 md:h-[30%] xl:w-[60%] lg:w-[70%] sm:w-[90%]  flex flex-row justify-between'>
                        <button
                            className='xsm:max-md:h-[20%] xsm:max-md:bg-white xsm:max-md:text-primary xsm:max-sm:mb-6 w-[40%] md:h-[40%] h-[50%] font-600 xxl:text-md xl:text-sm'
                            onClick={() => navigate('/createShirt')}>Create Clothing
                        </button>
                        <button
                            className="xsm:max-md:h-[20%] xsm:max-md:bg-white xsm:max-md:text-primary xsm:max-sm:mb-6 md:h-[40%] w-[40%] h-[50%] xxl:text-md xl:text-sm"
                            onClick={() => navigate('/howItWorks')}>How it works
                        </button>
                    </div>
                </div>
            </div>
            <img src={modelTshirt} alt="model with t-shirt" className='xsm:max-md:hidden absolute bottom-0 md:-right-40 lg:-right-10 xl:right-0 xxl:right-32 ' />
            <img src={graphicSVG} alt="illustration" className='xsm:max-md:absolute md:hidden xsm:max-md:bottom-2 -z-0'/>
        </div>
    )
}
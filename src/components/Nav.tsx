import { BsInstagram, BsFacebook, BsTwitter, BsPinterest } from 'react-icons/bs';
import { useNavigate } from 'react-router';


export const Nav = () => {

    const navigate = useNavigate();
    return (
        <header className="h-[8vh] bg-primary text-raleway" id='nav'>
            <nav className="flex flex-row items-center justify-between h-full">
                <>
                    <h1
                        className="flex items-center justify-center tracking-wide text-white cursor-pointer xsm:max-md:text-mdl xsm:max-md:ms-6 xsm:max-md:h-full xl:text-xl lg:text-lg md:text-xl sm:text-mdl lg:ms-20 md:ms-20 font-titles"
                        onClick={() => navigate('/')}>ShirtAI</h1>
                </>
                <div className='flex flex-row justify-evenly items-center xsm:max-md:w-[60%] md:w-[50%] lg:w-[60%] xl:w-[50%] xsm:max-md:h-full'>
                    <BsInstagram className='text-2xl icons xsm:max-md:text-md md:max-xl:text-mdl xl:text-lg' />
                    <BsFacebook className='text-2xl icons xsm:max-md:text-md md:max-xl:text-mdl xl:text-lg' />
                    <BsTwitter className='text-2xl icons xsm:max-md:text-md md:max-xl:text-mdl xl:text-lg' />
                    <BsPinterest className='text-2xl icons xsm:max-md:text-md md:max-xl:text-mdl xl:text-lg' />
                </div>
            </nav>
        </header>
    )
}
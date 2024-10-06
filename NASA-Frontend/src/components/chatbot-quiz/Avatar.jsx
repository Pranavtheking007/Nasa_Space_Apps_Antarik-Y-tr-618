import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Avatar() {

    return (
        <div className='rounded-full' >
            <DotLottieReact
                src="https://lottie.host/3ef14a4b-a4b0-4f8a-9121-bbd19517a12c/gTB9luiQEU.lottie"
                loop
                autoplay
                style={{ height: '50px', width: '50px' }}
            />
      </div>
    )
}

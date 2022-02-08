import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import GalleryImage from "./Boardgame/GalleryImage"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import useRecentImages from '../hooks/useRecentImages';

const ImageCarousel = () => {

    const { images, isSuccess } = useRecentImages()

    return (
        <div className="flex justify-center py-4">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:1/4">
        {isSuccess &&
        <CarouselProvider
            naturalSlideWidth={400}
            naturalSlideHeight={600}
            totalSlides={images.length}
            isPlaying={true}
            infinite={true}
        >
            <div className="flex w-full gap-4 justify-center text-slate-400">
                <ButtonBack><ChevronLeftIcon className="w-5 h-5 hover:text-slate-200"/></ButtonBack>
                <Slider className="w-full p-1 border rounded-md border-slate-800">
                    {images.map((image, index) => 
                        <Slide index={index} key={image.id} >
                            <div className="flex flex-col h-full justify-center">
                                <GalleryImage image={image} isLink/>
                            </div>
                        </Slide>
                    )}
                </Slider>
                <ButtonNext><ChevronRightIcon className="w-5 h-5 hover:text-slate-200"/></ButtonNext>
            </div>
            
                
        </CarouselProvider>
        }
        </div>
        </div>
    )
}

export default ImageCarousel
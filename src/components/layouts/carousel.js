import React, { useState, useEffect, useContext } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import { LanguageContext } from '../../context/context';
import { getWindowDimensions } from '../utility/screen';



const CarouseL = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const { t } = useContext(LanguageContext)

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {
                items.map((item) => {
                    return (
                        <CarouselItem
                            onExiting={() => setAnimating(true)}
                            onExited={() => setAnimating(false)}
                            key={item.src}
                        >
                            {
                                windowDimensions.width > 680 ? <img src={item.src} alt={item.altText} style={{
                                    minHeight: '85vh', objectFit: 'cover', width: '100%', backgroundColor: '#fff', opacity: 0.95
                                }} /> :
                                    <img src={item.src} alt={item.altText}
                                        style={{
                                            minHeight: '60vh', objectFit: 'cover', backgroundColor: '#17181c'
                                        }}
                                    />
                            }

                            <CarouselCaption captionText={t(item.caption)} captionHeader={t(item.altText)} />
                        </CarouselItem>
                    );
                })
            }
            <CarouselControl direction="prev" directionText="" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="" onClickHandler={next} />
        </Carousel>
    );
}

export default CarouseL;
export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};
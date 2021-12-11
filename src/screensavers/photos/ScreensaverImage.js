import { css } from '@linaria/core'
import { useEffect, useMemo, useRef } from 'react'
import { styled } from '@linaria/react'

import useImageDimensions from './hooks/useImageDimensions'
  // transform: translate(${p => p.startTranslateX}, ${p => p.startTranslateY});
const AnimatedImage = styled.img`
  position: absolute;
  transform: translate(${p => p.startTranslateX}, ${p => p.startTranslateY});
  width: 200px;
  // left: ${p => p.startTranslateX};
  animation: ${(p) => p.animationTime}ms ease-in-out 0ms infinite
    ${(p) => (p.animated ? 'running' : 'paused')} kenBurns;
  @keyframes kenBurns {
    0% {
      opacity: 0%;
      transform: translateX(${p => p.startTranslateX});

    }
    5% {
      opacity: 50%;
    }

    95% {
      opacity: 50%;
    }

    100% {
      // left: ${p => p.endTranslateX};
    transform: translate(${p => p.endTranslateX}, ${p => p.endTranslateY}) scale(1.4);
      opacity: 0%;
    }
  }
`
// translate(${p => p.endTranslateX}, ${p => p.endTranslateY}) ;
function getRandomIntInclusive(min, max) {
  const mn = Math.ceil(min)
  return Math.floor(Math.random() * (Math.floor(max) - mn + 1) + mn) //The maximum is inclusive and the minimum is inclusive
}

export default function ScreensaverImage({
  containerDimensions,
  imageUrl,
  animationTime,
  onAnimationEnd,
  isNext = false
}) {
  const imageEl = useRef(null)

  const imageDimensions = useImageDimensions(imageUrl)
  // console.log(containerDimensions, imageDimensions)

  const imageInfo = useMemo(() => {
    if (!imageDimensions) {
      return null
    }
    // determine image dimensions that will cover frame + 15% on the shortest image edge

    const imageIsPortrait = imageDimensions.naturalHeight > imageDimensions.naturalWidth
    // if it's portrait, then set imageWidth to portrait width + 10%;
    console.log('imageIsPortrait', imageIsPortrait);

    let imageHeight = null;
    let imageWidth = null;

    if (imageIsPortrait) {
      imageWidth = containerDimensions.width// + (containerDimensions.width * .1)

      imageHeight = (imageWidth * imageDimensions.naturalHeight / imageDimensions.naturalWidth);
      console.log({
        imageOriginalDimentions: `${imageDimensions.naturalWidth},${imageDimensions.naturalHeight}`,
        containerDimensions: `${containerDimensions.width},${containerDimensions.height}`,
        scaledImageDimensions: `${imageWidth}, ${imageHeight}`,

      })
    } else {
      imageHeight= containerDimensions.height// + (containerDimensions.height * .1)
      imageWidth = (imageHeight * imageDimensions.naturalWidth / imageDimensions.naturalHeight);
      console.log({
        imageOriginalDimentions: `${imageDimensions.naturalWidth},${imageDimensions.naturalHeight}`,
        containerDimensions: `${containerDimensions.width},${containerDimensions.height}`,
        scaledImageDimensions: `${imageWidth}, ${imageHeight}`,

      })
    }

    const extraPixelsX = Math.round(imageWidth - containerDimensions.width);
    const extraPixelsY = Math.round(imageHeight - containerDimensions.height);
    console.log('extraPixels:', extraPixelsX, extraPixelsY)


    const startTranslateX = `-${getRandomIntInclusive(0, extraPixelsX)}px`;
    const startTranslateY = `-${getRandomIntInclusive(0, extraPixelsY)}px`;

    const endTranslateX = `-${getRandomIntInclusive(0, extraPixelsX * 1.4)}px`;
    const endTranslateY = `-${getRandomIntInclusive(0, extraPixelsY * 1.4)}px`;
    // const imageWidth = imageIsPortrait
    //   ? containerDimensions.width
    //   : 'unset'
    // const imageHeight = imageIsPortrait
    //   ? 'unset'
    //   : containerDimensions.height

    // // if it is portrait
    // // extra image pixels (outside of frame) on the x axis is
    // const extraXPixels = imageIsPortrait
    //   ? containerDimensions.width * .1
    //   : ((containerDimensions.height * .1) / imageDimensions.naturalHeight) * imageDimensions.naturalWidth;

    // const extraYPixels = imageIsPortrait
    //   ? ((containerDimensions.width * .1) / imageDimensions.naturalWidth) * imageDimensions.naturalHeight
    //   : containerDimensions.height * .1;

    // console.log({
    //   imageOriginalDimentions: `${imageDimensions.naturalWidth},${imageDimensions.naturalHeight}`,
    //   containerDimensions: `${containerDimensions.width},${containerDimensions.height}`,
    //   scaledImageDimensions: `${((containerDimensions.height * .1) / imageDimensions.naturalHeight) * imageDimensions.naturalWidth}, ${((containerDimensions.width * .1) / imageDimensions.naturalWidth) * imageDimensions.naturalHeight}`,

    // })
    return {
      imageStyle: {
        width: imageWidth,
        height: imageHeight
      },
      transforms: {
        stx: startTranslateX,
        sty: startTranslateY,
        etx: endTranslateX,
        ety: endTranslateY,
      }
    }
  }, [imageDimensions, imageUrl, containerDimensions])

  if (imageDimensions === null) {
    return null
  }

  const styleObj = {
    // '--screensaver-fade-in-time': `${fadeInTime}ms`,
    // '--screensaver-animation': `${animationTime}ms`,
    // '--screensaver-fade-out-time': `${fadeOutTime}ms`,
  }
  // if (isNext) {
  //   // styleObj.zIndex = '10';
  //   // styleObj.position = 'absolute';
  //   styleObj.animation = `${animationTime}ms linear 1s infinite kenBurns`;
  // }

  return (
    <AnimatedImage
      ref={imageEl}
        // imageWidth={}
      // startTransform={}
      // className={imageClass}
      startTranslateX={imageInfo.transforms.stx}
      startTranslateY={imageInfo.transforms.sty}
      endTranslateX={imageInfo.transforms.etx}
      endTranslateY={imageInfo.transforms.ety}
      animated={!isNext}
      onAnimationEnd={onAnimationEnd}
      animationTime={animationTime}
      style={imageInfo.imageStyle}
      src={imageUrl}
    />
  )
}

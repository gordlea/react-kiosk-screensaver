import { useState, useEffect, useCallback } from 'react'
import { css } from '@linaria/core'
import ScreensaverImage from './ScreensaverImage'
// import useImageDimensions from './useImageDimensions'
import { useMeasure } from "react-use";
const imageWrapClass = css`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
`

const imageClass = css`
  // min-width: 100%;
  // max-width: 100%;
  // min-height: 100%;
  // max-height: 100%;
  height: 110%;
  width: 110%;
  opacity: 50%;
  // object-position: var(--screensaver-object-position);
  object-fit: cover;
  overflow:
`

let swapIntervalId = null

export default function KenBurnsImageSaver({ imageUrls, swapInterval }) {
  const [ref, containerDimensions] = useMeasure();
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const [nextImageIdx, setNextImageIdx] = useState(imageUrls.length > 1 ? 1 : 0)

  const handleAnimationEnd = useCallback(() => {
    // console.log('handleAnimationEnd');
    // setCurrentImageIdx((prev) => {
    //   let next = prev + 1
    //   if (next >= imageUrls.length) {
    //     next = 0
    //   }
    //   return next;
    // });
  }, [imageUrls])

  useEffect(() => {
    if (swapIntervalId === null) {
      swapIntervalId = setInterval(() => {
        setCurrentImageIdx((prev) => {
          let next = prev + 1
          if (next >= imageUrls.length) {
            next = 0
          }
          return next
        })

        setNextImageIdx((prev) => {
          let next = prev + 1
          if (next >= imageUrls.length) {
            next = 0
          }
          return next
        })
      }, swapInterval)
    }
    return () => {
      if (swapIntervalId !== null) {
        clearInterval(swapIntervalId)
        swapIntervalId = null
      }
    }
  }, [swapInterval, imageUrls])

  // useImageDimensions(imageUrls[currentImageIdx])

  return (
    <div className={imageWrapClass} ref={ref}>
    <>
      <ScreensaverImage
        // key={`screensaver-image-${imageUrls[nextImageIdx]}`}
        isNext
        containerDimensions={containerDimensions}
        className={imageClass}
        imageUrl={imageUrls[nextImageIdx]}
        animationTime={swapInterval}
        onAnimationEnd={handleAnimationEnd}
      />
      <ScreensaverImage
        // isNext
        // key={`screensaver-image-${imageUrls[currentImageIdx]}`}
        containerDimensions={containerDimensions}
        className={imageClass}
        imageUrl={imageUrls[currentImageIdx]}
        animationTime={swapInterval}
        onAnimationEnd={handleAnimationEnd}
      />
    </>
    </div>
  )
}

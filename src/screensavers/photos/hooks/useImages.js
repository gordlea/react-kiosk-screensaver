
// this will take a list of image urls, then load them one by one to determine their dimensions, aspect ratio, etc
// then, depending on if the intended display is portrait or landscape, it will combine some images?
// it might be good to cache this info in local storage so it doesn't have to happen all the time

import { useEffect, useState } from "react";
import { promiseAll } from 'concurrency-promise';
import {useWindowSize} from 'react-use';

async function scanImages(imageUrlList) {

    const promises = imageUrlList.map((imageUrl) => {
        return () => {
            const imageInfo = {
                url: imageUrl,
            }
            let img = new Image();
            console.log('loading', imageUrl);
            return new Promise((resolve) => {
                function handleImageLoad(){
                    imageInfo.height = img.naturalHeight;
                    imageInfo.width = img.naturalWidth;
                    img.removeEventListener('load', handleImageLoad);
                    img.remove();
                    img = null;
                    resolve(imageInfo);
                }
                img.addEventListener('load', handleImageLoad);
                img.src = imageUrl;
            });
        }
    });

    const result = await promiseAll(promises)
    return result;
}


export default function useImages(imageUrlList) {
    const [imageManifest, setImageManifest] = useState({});
    const {width, height} = useWindowSize();

    const isPortrait = height > width;

    const { type } = useOrientation();
    useEffect(() => {
        async function startImageScan() {
            const loadedImages = await scanImages(imageUrlList);
            const analyzed = {
                portrait: [],
                landscape: [],
            };
            for (const image of loadedImages) {
                if (image.width >= image.height) {
                    analyzed.landscape.push(image);
                } else {
                    analyzed.portrait.push(image);
                }
            }

            

            setImageManifest(analyzed);
        }
        startImageScan();
    }, [imageUrlList]);
    return imageManifest;
}
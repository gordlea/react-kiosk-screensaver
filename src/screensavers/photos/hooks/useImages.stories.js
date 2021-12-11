import React from 'react';
import { css } from '@linaria/core';
import useImages from './useImages';

function HookWrapper({ imageUrls }) {
    const result = useImages(imageUrls);

    return (
        <pre>
            {JSON.stringify(result, null, 2)}
        </pre>
    )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'useImages',
  component: HookWrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    imageUrls: {
      defaultValue: [
        'http://localhost:3024/landscape01_4032x3024.png',
        'http://localhost:3024/landscape02_4032x3024.png',
        'http://localhost:3024/landscape03_4032x3024.png',
        'http://localhost:3024/panoramic_9000x2000.png',
        'http://localhost:3024/portrait01_3024x4032.png',
        'http://localhost:3024/portrait02_3024x4032.png',
        'http://localhost:3024/portrait03_3024x4032.png',
      ],
      type: 'array',
      control: 'object',
    },
  },
};




// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <HookWrapper imageUrls={args.imageUrls} />
  );
}

export const Portrait = Template.bind({});

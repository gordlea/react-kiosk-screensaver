import React from 'react';
import { css } from '@linaria/core';

import KenBurnsImageSaver from './KenBurnsImageSaver';

const globals = css`
:global() {
  html, body, #root {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}
`;

const outerWrapperClass = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const innerWrapperClass = css`
  flex: 0 0 auto;
  width: var(--sb-inner-width);
  height: var(--sb-inner-height);
  border: solid 1px black;
`;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'KenBurnsImageSaver',
  component: KenBurnsImageSaver,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    swapInterval: {
      defaultValue: 10000,
      type: 'number',
      control: 'number',
    },
    objectPosition: {
      defaultValue: 'unset',
      control: {
        type: 'text',
      },
    }
  },
};




// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  return (
    <div className={outerWrapperClass}>
          <div
            className={innerWrapperClass}
            style={args.style}
            >

      <KenBurnsImageSaver {...args} />
      </div>
    </div>
  );
}

export const Portrait = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Portrait.args = {
  imageUrls: ['/test-photo-1.jpg', '/test-photo-2.jpg'],
  style: {
    width: '50%',
    height: '80%',
  }
};

export const Landscape = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Landscape.args = {
  imageUrls: ['/test-photo-1.jpg', '/test-photo-2.jpg'],
  style: {
    width: '80%',
    height: '50%',
  }
};

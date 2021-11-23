import React from 'react';

import Screensaver from './Screensaver';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Screensaver',
  component: Screensaver,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    force: {
      options: [null, 'show', 'hide'],
      control: {
        type: 'radio',
        labels: {
          null: 'don\'t force',
          show: 'force show',
          hide: 'force hide',
        },
      },
      defaultValue: null,
    },
    idleTimeout: {
      defaultValue: 300000,
      type: 'number',
      control: 'number',
    },
    onActive: {
      action: 'screensaver active',
    }
  },
};




// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const idleDisplay = (<div>screensaver is active</div>)
  return (
    <Screensaver {...args} idleDisplay={idleDisplay} >
      <div>screensaver is off</div>
    </ Screensaver>
  );
}

export const Defaults = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Defaults.args = {
  // force: null,
  // idleTimeout: null
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/buttons';
import { UButton } from '../src/components/buttons';

export const Button = (props: UButton) => {
  
  return html`
    <u-button
      type='button'
      size=${props.size}
      theme=${props.theme}
      tooltip=${props.tooltip || ''}
      tooltipPosition=${props.tooltipPosition}
      ?round=${props.round}
      ?outline=${props.outline}
      ?loading=${props.loading}
      ?disabled=${props.disabled}
    >Hello World!</u-button>
  `;
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: (args) => Button(args),
  argTypes: {
    size: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
    theme: { control: { type: 'select' }, options: ['default', 'primary', 'success', 'neutral', 'warning', 'danger', 'text'] },
    tooltip: { control: { type: 'text' } },
    tooltipPosition: { control: { type: 'select' }, options: ['top', 'right', 'bottom', 'left'] },
    round: { control: { type: 'boolean' } },
    outline: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    size: 'medium',
    theme: 'default',
    tooltip: 'Hello',
    tooltipPosition: 'top',
    round: false,
    outline: false,
    loading: false,
    disabled: false,
  }
} satisfies Meta<UButton>;

export default meta;
type Story = StoryObj<UButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Round: Story = {
  args: {
    round: true,
  },
};

export const Outline: Story = {
  args: {
    outline: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disable: Story = {
  args: {
    disabled: true,
  },
};

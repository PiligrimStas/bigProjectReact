import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    defaultValue: 'выберите значение',
    onChange: (value: string) => {},
    value: 'Укажите что нибудь ',
    direction: 'bottom',
    items: [
        { value: '1', content: '1234' },
        { value: '2', content: '1234', disabled: true },
        { value: '3', content: '1234' },
    ],
};

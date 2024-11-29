import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/test/storybook.jpg';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        userName: 'user',
        age: 14,
        country: Country.Belarus,
        first: 'Fufel',
        lastName: 'Fuflovich',
        city: 'Bogdad',
        currency: Currency.EUR,
        avatar,
    },
};

export const WithError = Template.bind({});
WithError.args = {
    error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {};

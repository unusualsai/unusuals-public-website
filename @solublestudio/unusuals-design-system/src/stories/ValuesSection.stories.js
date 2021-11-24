import React from "react";

import ValuesSection from '../components/ValuesSection';
import valuesImage from '../img/values.jpg';

const defaultValuesSection = {
    title: 'Our Values',
    description: 'We are as passionate about our work as we are about the Lord of the Rings filmography. Do you know Gandalf, the wizard bearer of a Ring of Power? He has great power but works mostly by encouraging and persuading. That is exactly the way we operate. If that is not enough for you, we will also offer you free of charge:',
    image: valuesImage,
    values: [
        {
            title: 'Committed',
            description: 'Always ready to understand your needs and to put ourselves in your shoes.'
        },
        {
            title: 'Honesty',
            description: 'We aim to listen to your needs, share solutions and fulfill them. 0% bullshit.'
        },
        {
            title: 'Meticulousness',
            description: 'We will do our best to achieve high quality results and to see that your company grows.'
        }
    ]
};

export default {
    title: "@solublestudio/unusuals-design-system/ValuesSection",
    component: ValuesSection,
    argTypes: {
        title: {
            type: { name: 'string', required: true },
            defaultValue: defaultValuesSection.title,
        },
        description: {
            type: { name: 'string', required: true },
            defaultValue: defaultValuesSection.description,
        },
        values: {
            type: { name: 'object', required: false },
            defaultValue: defaultValuesSection.values,
        }
    },
};

const Template = (args) => {
  return (
    <>
        <style dangerouslySetInnerHTML={{
            __html: `
                .sb-show-main.sb-main-padded {
                    padding: 0 !important;
                }
            `
        }} />
        <ValuesSection 
            {...args}
        />
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  ...defaultValuesSection,
};
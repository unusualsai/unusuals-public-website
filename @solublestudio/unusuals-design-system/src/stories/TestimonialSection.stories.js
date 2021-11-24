import React from 'react';

import TestimonialSection from '../components/TestimonialSection';

const defaultTestimonialSection = {
    testimonial:
        'Unusuals is the friendliest and most efficient company I have ever used. The whole thing takes time to introduce the product and as a result puts forward only the best opportunities that really suit you. They help from start to finish to create a great solutions for your company.',
    author: {
        image: 'https://via.placeholder.com/56x72',
        name: 'John Mackenzie',
        role: 'Role, company',
    },
};

export default {
    title: '@solublestudio/unusuals-design-system/TestimonialSection',
    component: TestimonialSection,
};

const Template = (args) => {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
        .sb-show-main.sb-main-padded {
            padding: 0 !important;
        }
    `,
                }}
            />
            <TestimonialSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = defaultTestimonialSection;

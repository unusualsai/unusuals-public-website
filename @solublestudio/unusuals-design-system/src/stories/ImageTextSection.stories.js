import React from 'react';

import ImageTextSection from '../components/ImageTextSection';

const defaultImageTextSection = {
    title:
        'Our founders realized that most of the expert knowledge in big organizations are located in silos and that it is difficult to use this vast experience at its maximum potential.',
    description:
        '<p>Unusuals is focused on detecting anomalies and assets in remote, linear, dangerous, disperse and/or any infrastructure with difficult access by using the data obtained by mobile cameras and/or LiDAR. We offer you the most powerful software to detect the unusual in your infrastructure so you can focus on what makes you exceptional.<p><br/><br/><p>From that need Unusuals was born. The first tries of our AI core were tested in Sigma-Rail, a start-up purely focused on the railway industry, where we processed thousands of kilometers of rail lines by automatically analyzing its image and/or LiDAR digital twins. The experience accumulated working for major public and private companies in countries like Spain, the UK, Germany, Italy, Mexico and Morocco convinced us that the technology was mature for the next big steps.</p>',
    image: 'https://via.placeholder.com/447x329',
};

export default {
    title: '@solublestudio/unusuals-design-system/ImageTextSection',
    component: ImageTextSection,
};

const Template = (args) => {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `.sb-show-main.sb-main-padded {
                    padding: 0 !important;
                }`,
                }}
            />
            <ImageTextSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultImageTextSection,
};

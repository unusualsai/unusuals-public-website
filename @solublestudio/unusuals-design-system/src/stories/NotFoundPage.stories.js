import React from 'react';

import NotFoundPage from '../components/NotFoundPage';
import video from '../video/isotipo-low.mp4';

const defaultNotFoundPage = {
    title: 'Error 404',
    description: 'The page you are looking for does not exist',
    cta: {
        label: 'Go back',
    },
    video: {
        url: video,
        format: 'mp4',
    },
};

export default {
    title: '@solublestudio/unusuals-design-system/NotFoundPage',
    component: NotFoundPage,
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
            <NotFoundPage {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultNotFoundPage,
};

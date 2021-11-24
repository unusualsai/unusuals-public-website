exports.remarkOptions = [
    {
        resolve: 'gatsby-remark-video',
        options: {
            width: '100%',
            height: 'auto',
            preload: 'auto',
            muted: true,
            autoplay: true,
            playsinline: true,
            controls: true,
            loop: true
        }
    },
    {
        resolve: 'gatsby-remark-images',
        options: {
            maxWidth: 1280,
            quality: 90,
            withWebp: true,
            srcSetBreakpoints: [ 576 ],
            linkImagesToOriginal: false
        },
    }
];

exports.remarkLocalOptions = [
    {
        resolve: 'gatsby-remark-video',
        options: {
        width: '100%',
        height: 'auto',
        preload: 'auto',
        muted: true,
        autoplay: true,
        playsinline: true,
        controls: true,
        loop: true
        }
    },
    {
        resolve: 'gatsby-remark-relative-images',
        options: {
            staticFolderName: 'static/assets',
        },
    },
    {
        resolve: 'gatsby-remark-images',
        options: {
        maxWidth: 1280,
        quality: 90,
        withWebp: true,
        srcSetBreakpoints: [ 576 ],
        linkImagesToOriginal: false
        },
    },
    {
        resolve: 'gatsby-remark-copy-linked-files',
        options: {
        destinationDir: 'static',
        },
    },
];
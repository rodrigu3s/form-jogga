const INIT_PATH = './src';
const DEST_PATH = './dist';

const PATHS = {
    sass: {
        origin: `${ INIT_PATH }/assets/scss/style.scss`,
        dist: `${ DEST_PATH }/assets/css`,
        watch: [
            `${ INIT_PATH }/assets/scss/*.scss`,
            `${ INIT_PATH }/assets/scss/*/*.scss`,
        ]
    },
    html: {
        origin: `${ INIT_PATH }/html/*.html`,
        dist: DEST_PATH,
        include: [
            `${ INIT_PATH }/html/components/*/*.html`,
            `${ INIT_PATH }/html/components/*.html`,
            `${ INIT_PATH }/html/layout/*/*.html`,
            `${ INIT_PATH }/html/layout/*.html`,
        ]
    },
    scripts: {
        origin: [
            `${ INIT_PATH }/assets/js/plugins/*.js`,
            `${ INIT_PATH }/assets/js/modules/*.js`
        ],
        dist: `${ DEST_PATH }/assets/js`,
    },   
};

module.exports = {
    INIT_PATH,
    DEST_PATH,
    PATHS
};
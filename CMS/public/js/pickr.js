// Simple example, see optional options for more configuration.


const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'nano', // or 'monolith', or 'nano'
    default: document.querySelector('.previewOverlayInput').value,

    swatches: [
        'rgba(63, 63, 63, 0.48)',
        'rgba(33, 33, 33, 0.8)',
        'rgba(4, 4, 4, 0.54)',
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
        }
    }
});

pickr.on('change', (color, source, instance) => {
    const rgbaColor = color.toRGBA().toString(3)
    document.querySelector('.previewOverlay').style.background = rgbaColor;
    document.querySelector('.previewOverlayInput').value = rgbaColor;
})

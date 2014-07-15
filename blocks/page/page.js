(function() {

    var card, orientation;

    card = {
        width: 600,
        height: 360
    };

    orientation = getOrientation();

    window.addEventListener('orientationchange', function() {
        orientation = getOrientation();
        computeAndSetScale();
    });

    function getAvailWidth() {
        return window.screen[ orientation === 'landscape' ? 'availHeight' : 'availWidth' ];
    }

    function getAvailHeight() {
        return window.screen[ orientation === 'landscape' ? 'availWidth' : 'availHeight' ];
    }

    function getMetaViewport() {
        return document.querySelector('meta[name=\"viewport\"]');
    }

    function setInitialScale(scale) {
        return getMetaViewport().setAttribute('content', 'width=device-width, initial-scale=' + scale);
    }

    function getOrientation() {
        return Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';
    }

    function computeAndSetScale() {
        var width = getAvailWidth(),
            height = getAvailHeight();

        if (width > card.width && card.height < height) {
            return;
        }

        if (width < height) {
            setInitialScale(width/card.width);
        } else {
            setInitialScale(height/card.height);
        }
    }

    computeAndSetScale();

}());

document.addEventListener('DOMContentLoaded', function(event) {
    Card.init();
});

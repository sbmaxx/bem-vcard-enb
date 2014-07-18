(function() {

    var card, screen, isLandscape;

    card = {
        width: 600,
        height: 360
    };

    screen = window.screen;

    onOrientationChange();

    window.addEventListener('orientationchange', onOrientationChange);

    function getAvailWidth() {
        return screen[ isLandscape ? 'availHeight' : 'availWidth' ];
    }

    function getAvailHeight() {
        return screen[ isLandscape ? 'availWidth' : 'availHeight' ];
    }

    function getMetaViewport() {
        return document.querySelector('meta[name=\"viewport\"]');
    }

    function setInitialScale(scale) {
        return getMetaViewport().setAttribute('content', 'width=device-width, initial-scale=' + scale);
    }

    function getOrientation() {
        return Math.abs(window.orientation) === 90;
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

    function onOrientationChange() {
        isLandscape = getOrientation();
        computeAndSetScale();
    }

}());

document.addEventListener('DOMContentLoaded', function(event) {
    Card.init();
});

(function () {
    var ctaButton = document.getElementById('bunca-cta-btn');

    if (!ctaButton) {
        return;
    }

    function buildEventProps(button) {
        return {
            cta_id: button.dataset.ctaId,
            page: button.dataset.page,
            position: button.dataset.position,
            label: button.dataset.label,
            article_title: button.dataset.articleTitle,
            article_path: button.dataset.articlePath,
            article_category: button.dataset.articleCategory || ''
        };
    }

    function navigateToCta(url) {
        window.location.href = url;
    }

    ctaButton.addEventListener('click', function (event) {
        if (event.defaultPrevented) {
            return;
        }

        if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
        ) {
            return;
        }

        var targetUrl = ctaButton.href;
        var eventName = ctaButton.dataset.eventName;
        var eventProps = buildEventProps(ctaButton);
        var didNavigate = false;

        function finishNavigation() {
            if (didNavigate) {
                return;
            }

            didNavigate = true;
            navigateToCta(targetUrl);
        }

        event.preventDefault();

        window.setTimeout(finishNavigation, 300);

        if (
            !window.mixpanel ||
            typeof window.mixpanel.track !== 'function' ||
            !eventName
        ) {
            finishNavigation();
            return;
        }

        try {
            window.mixpanel.track(eventName, eventProps, finishNavigation);
        } catch (error) {
            console.error('Failed to track Bunca CTA click.', error);
            finishNavigation();
        }
    });
})();

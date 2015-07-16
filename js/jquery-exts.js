/****
 * Functiom snippets
 * @returns {jQuery.fn}
 */
jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", Math.max(0, ((jQuery(window).height() - jQuery(this).outerHeight()) / 2) +
            jQuery(window).scrollTop()) + "px");
    this.css("left", Math.max(0, ((jQuery(window).width() - jQuery(this).outerWidth()) / 2) +
            jQuery(window).scrollLeft()) + "px");
    return this;
}

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


/**
 * NikCode tree
 * @returns {jQuery.fn}
 */
jQuery.fn.niktree = function(opts) {
    var tree = this;
    if (typeof opts != 'undefined' && typeof opts.type != 'undefined') {
        switch (opts.type) {
            case "stretch":
                recusrsion($(this).find('>li'), 0);
                break;
        }
    }

    tree.addClass('niktree');
    tree.find('li').each(function() {
        var $set = $(this).find('>.tree-item');
        var len = $set.length;
        $set.each(function(index, element) {
            thisVal = $(this).val();
            var $this = $(this);
            if (parseInt(thisVal) != 0) {
                if (index == len - 1) {
                    if ($this.next('a').length > 0) {
                        if ($this.parent().next('a').length > 0) {
                            $this.addClass('tree-item-busy m-b-i-vh');
                        } else {
                            $this.addClass('tree-item-busy m-b-i-h');
                        }
                        if ($this.parent().find('ul').length > 0) {
                            $this.addClass('tree-item-opened');
                        }
                    }
                } else {
                    if ($this.closest('li[data-level=' + index + ']').next('li').length > 0) {
                        var curr = $(this);
                        $this.addClass('tree-item-busy m-b-i-v');
                    }
                }
            }
        });

    })
    tree.find('li').each(function() {
        if ($(this).find('>ul').length > 0) {
            $(this).find('>span:last').click(function() {
                $(this).parent().find('>ul').slideToggle();
                $(this).toggleClass('tree-item-closed tree-item-opened')
            })
        }
    })
    return this;
}

function recusrsion(elts, level) {
    $mover = '<span class="tree-item m-b-i-b">&nbsp;</span>'
    jQuery.each(elts, function(key, value) {
        $(this).attr('data-level', level);
        var movers = '';
        if (level == 0) {
            //movers = $mover
        }
        for (var i = 0; i < (level + 1); i++) {
            movers = movers + $mover;
        }
       // var bup = $(this).html();
       // $(this).html('').prepend(movers).append('<span class="target">'+bup+'</span>');
         $(this).prepend(movers)
        if ($(this).find('>ul').length > 0) {
            recusrsion($(this).find('>ul>li'), (level + 1));
        }
        console.log(key);
    })
}
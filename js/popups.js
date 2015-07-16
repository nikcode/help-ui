
jQuery(document).ready(function() {

    jQuery('.create-new-cat').click(function(e) {
        e.preventDefault();
        var opts = {
            "title": "New category",
            "form": "create_cat",
            "values": {"category": "IDE", "pid": "777"}
        }
        Popup.init(opts);
    })
    jQuery('.create-new-form').click(function(e) {
        e.preventDefault();
        var opts = {
            "title": "New form",
            "form": "edit_cat",
        }
        Popup.init(opts);
    })
    jQuery('.create-new-html').click(function(e) {
        e.preventDefault();
        var opts = {
            "title": "Window with html",
            "html": '<div>Some html here Some html <b>here</b> Some html here Some html here</div>',
        }
        Popup.init(opts);

    })
})
var Popup = {
    bg: '',
    dialog: '',
    close: '',
    title: '',
    values: '',
    init: function(opts) {
        //implement singleton
        jQuery('#b-g-w').remove();
        //creat bg element
        this.bg = jQuery('<div></div>').attr('id', 'b-g-w').css('display', 'none')
        jQuery('body').append(this.bg);
        //create dialog element
        this.dialog = jQuery('<div></div>').attr('id', 'b-g-w-d');
        this.bg.append(this.dialog).fadeIn('slow');

        //create close element
        this.close = jQuery('<span><i class="fa fa-times"></i></span>').attr('id', 'b-g-w-d-c')
        //create title
        this.title = jQuery('<span></span>').attr('id', 'b-g-w-d-t').text(opts.title);
        this.dialog.append(this.close).append(this.title);

        //Values not supported to html, only for forms
        //TODO: make token support
        if (typeof opts.values != 'undefined') {
            this.values = opts.values;
        } else {
            this.values = '';
        }
        //Add form
        if (typeof opts.form != 'undefined') {

            var mform = new Form();
            mform.init(opts.form, this.values)
            this.dialog.append(mform.html);
        }
        //Add html
        if (typeof opts.html != 'undefined') {
            this.dialog.append(opts.html);
        }


        //centralize dialog window
        this.dialog.center();
        //Make it draggable
        jQuery("#b-g-w-d").draggable();
        //bind events
        this.bindEvents();
    },
    bindEvents: function() {
        var curr = this.bg;
        jQuery('#b-g-w-d-c').click(function() {
            curr.fadeOut('slow', function() {
                curr.remove();
            });
        })
    }
}

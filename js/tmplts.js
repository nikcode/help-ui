function Tmpls(obj) {
    this.obj = obj;
    this.map = {
        "text": "form-text",
        "select": "form-select",
        "submit": "form-submit",
    };
    this.getEl = function() {
        switch (this.obj.type) {
            case "text":
            case "submit":
            case "hidden":
                return this.getInput();
                break
        }

    };
    this.getInput = function() {

        var attrs = this.buildAttr(this.obj)
        var html = '';
        if (this.obj.type != 'hidden') {
            html = "<div class='form-item'><input " + attrs + "></div>"
        } else {
            html = "<input " + attrs + ">"
        }
        return html;
    };
    this.buildAttr = function(obj) {
        var attrs = '';
        var clas = this.map[obj.type]
        jQuery.each(obj, function(key, value) {
            if (value)
            {
                if (key == 'class') {
                    clas += ' ' + value;
                    return true;
                }
                attrs += key + '="' + value + '" ';
            }
        })
        if (clas) {
            attrs += ' class="' + clas + '" ';
        }
        return attrs;
    };
    this.classMapping = function(type) {
        return this.map.type;
    };
}
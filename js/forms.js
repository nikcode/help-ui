var Form = function() {
    this.html = '';
    this.form = '';
    this.formId = '';
    this.init = function(form, values) {
        console.log(values)
        this.formId = form;
        this.addForms()

        //singleton
        this.html = '';
        this.form = '';

        this.form = jQuery('<form id="' + this.forms[form].id + '"></form>');

        var html = this.html;
        jQuery.each(this.forms[form].elts, function(key, value) {

            //required fields
            if (typeof value.type == 'undefined' || typeof value.value == 'undefined' || typeof value.name == 'undefined') {
                return;
            }
            //map values
            if (values[value.name]) {
                value.value = values[value.name]
            }

            html += new Tmpls(value).getEl();
        })
        this.html = this.form.append(html);
        //trigger submission handlers
        this.triggerSubmit();
    }
    this.triggerSubmit = function() {
        var call = this.forms[this.formId].submit_callback;
        this.submit_callbacks[call](this.form)
    }
    this.forms = {};
    this.submit_callbacks = {};
}

/**
 * API single functuion to add forms
 * Add custom forms, predefined
 * @returns {undefined}
 */
Form.prototype.addForms = function() {
    //console.log(this);
    //If need to add one
    //this.forms.custom = {'sss':'s'}
    this.forms = {
        "create_cat": {"elts":
                    {'0': {
                            "type": "text", //*
                            "name": "category", //*
                            "class": "custom-class",
                            "value": "", //*
                            "required": "true",
                        },
                        '1': {
                            "type": "hidden",
                            "name": "pid",
                            "value": "",
                        },
                        '2': {
                            "type": "submit",
                            "name": "submit",
                            "value": "Create",
                        },
                        '3': {
                            "type": "submit",
                            "name": "cancel",
                            "value": "Cancel",
                        }
                    },
            "id": "form-create-new-cat",
            "submit_callback": "create_new_cat_submit",
        },
        "edit_cat": {"elts":
                    {'0': {
                            "type": "text",
                            "name": "category",
                            "value": "",
                        },
                        '1': {
                            "type": "submit",
                            "name": "submit",
                            "value": "Create",
                        },
                    },
            "id": "form-edit-new-cat",
            "submit_callback": "edit_cat_submit",
        }
    },
    this.submit_callbacks = {
        create_new_cat_submit: function(form) {

            // console.log(form);
            form.submit(function(e) {
                e.preventDefault();
                alert('Submitted');
            })

        },
        edit_cat_submit: function(form) {

            //console.log(form);
            form.submit(function(e) {
                e.preventDefault();
                alert('Edited');
            })

        }
    }
}
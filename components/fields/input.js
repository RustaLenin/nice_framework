export class niceInput extends HTMLElement {



    constructor() {
        super();                                                      // Make it first, cause we need access to this props and methods
        this.currentModel = {};
        this.currentModel = this.closest('nice-field').currentModel;
        this.classList.add('input');
        this.innerHTML = this.currentModel.value;
        this.contentEditable = 'true';
        this.spellcheck = this.currentModel.spellcheck.toString();
        this.setAttribute( 'placeholder', this.currentModel.placeholder );

        this.onpaste = function () {
            Nice.field.pastePlain(event);
            this.updateValue();
            if ( this.isValidation() ) {
                Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');
            }
        };

        this.oninput = function () {
            this.updateValue();
            if ( this.isValidation() ) {
                Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');
            }
        };


        if ( this.isValidation() ) {
            this.onfocus = function () {
                Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');
            };
            this.onfocusout = function () {
                Nice.field.validate(this);
            };
        }

    }

    isValidation() {
        return this.currentModel.validation;
    }

    updateValue() {
        this.currentModel.value = this.innerHTML;
    }

}
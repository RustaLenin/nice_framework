export class NiceWPEditor extends HTMLElement {

    constructor() {
        super();

        let id = this.getID();
        let name = this.getName();
        let content = this.innerHTML;

        this.innerHTML = `
            <textarea 
                id="${ id }" 
                class="input wp_editor_textarea" 
                name="${name}">
            ${content ? content : ''}
            </textarea>`;
    }

    connectedCallback() {
        let id = this.getID();
        // console.log('wp editor ' + id + ' init');
        wp.editor.initialize( id, wpEditorDefaultArgs() );
    }

    disconnectedCallback() {
        let id = this.getID();
        // console.log('wp editor ' + id + ' removing');
        wp.editor.remove( id );
    }

    getID() {
        let id = this.getAttribute('editor-id');
        if ( !id ) { id = uniqID(); this.setAttribute('editor-id', id); }
        return id;
    }

    getName() {
        let name = this.getAttribute('name');
        if ( !name ) { name = 'content'; this.setAttribute('name', name); }
        return name;
    }

    getValue() {
        let id = this.getID();
        return wp.editor.getContent(id);
    }

}

export function wpEditorDefaultArgs( lang ) {

    let language = '';
    if ( typeof lang === 'undefined' ) {
        if ( typeof currentLocale !== 'undefined' ) {
            language = currentLocale;
        } else {
            language = 'en';
        }
    } else {
        language = lang;
    }

    return {
        tinymce: {
            wpautop: true,
            theme:"modern",
            skin:"lightgray",
            language: language,
            formats:{
                alignleft: [
                    {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', styles: {textAlign:'left'}},
                    {selector: 'img,table,dl.wp-caption', classes: 'alignleft'}
                ],
                aligncenter: [
                    {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', styles: {textAlign:'center'}},
                    {selector: 'img,table,dl.wp-caption', classes: 'aligncenter'}
                ],
                alignright: [
                    {selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', styles: {textAlign:'right'}},
                    {selector: 'img,table,dl.wp-caption', classes: 'alignright'}
                ],
                strikethrough: {inline: 'del'}
            },
            relative_urls: false,
            remove_script_host: true,
            convert_urls: true,
            browser_spellcheck: true,
            fix_list_elements: true,
            entities: "38,amp,60,lt,62,gt",
            entity_encoding: "raw",
            keep_styles: true,
            paste_webkit_styles: "font-weight font-style color",
            preview_styles: "font-family font-size font-weight font-style text-decoration text-transform",
            wpeditimage_disable_captions: false,
            wpeditimage_html5_captions: true,
            plugins: "charmap,hr,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpeditimage,wpgallery,wplink,wpdialogs,wpview",
            resize: "vertical",
            menubar: false,
            indent: true,
            toolbar1: "bold,italic,strikethrough,blockquote,hr,alignleft,aligncenter,alignright,bullist,numlist,link,unlink,wp_more,spellchecker, wp_adv",
            toolbar2: "formatselect,underline,alignjustify,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help",
            toolbar3: "",
            toolbar4: "",
            tabfocus_elements: ":prev,:next",
            body_class: "id post-type-post post-status-publish post-format-standard",
        },
        quicktags: true,
        mediaButtons: true
    };
}
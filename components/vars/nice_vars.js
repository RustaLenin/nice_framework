export function defaultTempalte() {
   return `
    <style id="CSSVars">
        :root {
            /** BackGrounds **/
            --main_background: #F7F3F2;
            --content_background: #ffffff;
            --accent_background: #009C4F;
            --second_accent_background: #FF6600;
            --sub_bacground: #EAEAEA;
            --accent_sub_background: #BCBCBC;
    
            /** Borders and Dividers **/
            --divider_color: #D1CFCF;
            --accent_border_color: #009C4F;
            --accent_hover_border_color: #FF6600;
    
            /** Fields **/
            --field_border: #C4C4C4;
            --field_background: #ffffff;
            --field_placeholder: #B9B9B9;
            --field_font_color: #000000;
            --field_focus_color: #3784DC;
            --field_validate_error: #E00000;
            --field_validate_success: #009C4F;
            --field_comment: #666666;

            /** Select Fields **/
            --field_select_divider: #BDBDBD;
            
            --field_select_background: #ffffff;
            --field_select_background_hover: #D5E6FB;
            --field_select_background_remove: #D5E6FB88;
            --field_select_background_checked: #2F80ED;
            --field_select_background_blocked: #E0E0E088;
            --field_select_background_blocked_hover: #E0E0E0;
        
            --field_select_icon: #4F4F4F;
            --field_select_icon_hover: #2F80ED;
            --field_select_icon_remove: #2F80ED88;
            --field_select_icon_checked: #ffffff;
            --field_select_icon_blocked: #BDBDBD;
            --field_select_icon_blocked_hover: #4F4F4F;
        
            --field_select_text: #4F4F4F;
            --field_select_text_hover: #2F80ED;
            --field_select_text_remove: #2F80ED88;
            --field_select_text_checked: #ffffff;
            --field_select_text_blocked: #BDBDBD;
            --field_select_text_blocked_hover: #4F4F4F;
        
            --field_select_box_background: transparent;
            --field_select_box_background_hover: transparent;
            --field_select_box_background_remove: #BDBDBD;
            --field_select_box_background_checked: #27AE60;
            --field_select_box_background_blocked: transparent;
            --field_select_box_background_blocked_hover: transparent;
        
            --field_select_box_border: #BDBDBD;
            --field_select_box_border_hover: #BDBDBD;
            --field_select_box_border_remove: #BDBDBD;
            --field_select_box_border_checked: #27AE60;
            --field_select_box_border_blocked: #EB575788;
            --field_select_box_border_blocked_hover: #EB5757;
        
            --field_select_box_icon: transparent;
            --field_select_box_icon_hover: #BDBDBD;
            --field_select_box_icon_checked: #ffffff;
            --field_select_box_icon_remove: #ffffff;
            --field_select_box_icon_blocked: #EB575788;
            --field_select_box_icon_blocked_hover: #EB5757;
    
            /** Buttons **/
            --accent_button_color: #009C4F;
            --accent_second_button_color: #FF6600;
            --button_submit_color: #ffffff;
            --disabled_button_color: #888888;
            --bad_button: #E00000;
    
            /** Notifications **/
            --success: #1AC119;
            --info: #2790E8;
            --warning: #EFB81F;
            --error: #FB6875;
    
            /** Font **/
            --regular_font_family: Roboto, sans-serif;
            --default_font_color: #101010;
            --regular_font_color: #212121;
            --second_font_color: #4D4D4D;
            --accent_font_color: #009C4F;
            --sub_font_color: #B1B1B1;
            --support_font_color: #8C8C8C;
            --accent_hover_font_color: #FF6600;
            --font_reverce_accent_color: #ffffff;
            --font_title_color: #2F80ED;
    
            /** Icons **/
            --unactive_icon_color: #D1CFCF;
            --icon_color: #9E9E9E;
            --icon_hover_color: #3784DC;
            --accent_icon_color: #009C4F;
            --accent_hover_icon_color: #FF6600;
            --icon_reverce_accent_color: #ffffff;
            --icon_close_delete: #E00000;
            
            /** LightBox **/
            --lightbox_background: #000000cc;
            --close_lightbox_icon: #ffffff;
            --close_lightbox_icon_hover: #ffffff;
    
            /** Opacity **/
            --opacity_notfocus: 0.75;
            --opacity_blured: 0.6;
    
            /**Transition **/
            --regular_transition: 0.4s;
        }
    </style>
    `;
}

export function notFoundTemplate() {
    return `
    <style id="CSSVars">
        :root {
            /** BackGrounds **/
            --main_background: #f1f1f1;
            --content_background: #ffffff;
            --accent_background: #ededed;
            --second_accent_background: #9d56a2;
            --sub_bacground: #EAEAEA;
            --accent_sub_background: #BCBCBC;
        
            /** Borders and Dividers **/
            --divider_color: #E1E1E1;
            --accent_border_color: #9d56a2;
            --accent_hover_border_color: #9d56a2;
        
            /** Fields **/
            --field_border: #9d56a2;
            --field_background: #ffffff;
            --field_placeholder: #B9B9B9;
            --field_font_color: #9D56A2;
            --field_focus_color: #3784DC;
            --field_validate_error: #E00000;
            --field_validate_success: #1AC119;
            --field_comment: #666666;

            /** Select Fields **/
            --field_select_divider: #BDBDBD;
            
            --field_select_background: #ffffff;
            --field_select_background_hover: #D5E6FB;
            --field_select_background_remove: #D5E6FB88;
            --field_select_background_checked: #2F80ED;
            --field_select_background_blocked: #E0E0E088;
            --field_select_background_blocked_hover: #E0E0E0;
        
            --field_select_icon: #4F4F4F;
            --field_select_icon_hover: #2F80ED;
            --field_select_icon_remove: #2F80ED88;
            --field_select_icon_checked: #ffffff;
            --field_select_icon_blocked: #BDBDBD;
            --field_select_icon_blocked_hover: #4F4F4F;
        
            --field_select_text: #4F4F4F;
            --field_select_text_hover: #2F80ED;
            --field_select_text_remove: #2F80ED88;
            --field_select_text_checked: #ffffff;
            --field_select_text_blocked: #BDBDBD;
            --field_select_text_blocked_hover: #4F4F4F;
        
            --field_select_box_background: transparent;
            --field_select_box_background_hover: transparent;
            --field_select_box_background_remove: #BDBDBD;
            --field_select_box_background_checked: #27AE60;
            --field_select_box_background_blocked: transparent;
            --field_select_box_background_blocked_hover: transparent;
        
            --field_select_box_border: #BDBDBD;
            --field_select_box_border_hover: #BDBDBD;
            --field_select_box_border_remove: #BDBDBD;
            --field_select_box_border_checked: #27AE60;
            --field_select_box_border_blocked: #EB575788;
            --field_select_box_border_blocked_hover: #EB5757;
        
            --field_select_box_icon: transparent;
            --field_select_box_icon_hover: #BDBDBD;
            --field_select_box_icon_checked: #ffffff;
            --field_select_box_icon_remove: #ffffff;
            --field_select_box_icon_blocked: #EB575788;
            --field_select_box_icon_blocked_hover: #EB5757;
        
            /** Buttons **/
            --accent_button_color: #9d56a2;
            --accent_second_button_color: #9d56a2;
            --button_submit_color: #ffffff;
            --disabled_button_color: #888888;
            --bad_button: #E00000;
        
            /** Notifications **/
            --success: #1AC119;
            --info: #2790E8;
            --warning: #EFB81F;
            --error: #FB6875;
        
            /** Font **/
            --regular_font_family:'manrope', sans-serif;
            --default_font_color: #101010;
            --regular_font_color: #828282;
            --second_font_color: #000000;
            --accent_font_color: #ffffff;
            --sub_font_color: #333333;
            --support_font_color: #9D56A2;
            --accent_hover_font_color: #58c5c7;
            --font_reverce_accent_color: #ffffff;
            --font_title_color: #9D56A2;
        
            /** Icons **/
            --unactive_icon_color: #D1CFCF;
            --icon_color: #BDBDBD;
            --icon_hover_color: #9D56A2;
            --accent_icon_color: #58c5c7;
            --accent_hover_icon_color: #58c5c7;
            --icon_reverce_accent_color: #ffffff;
            --icon_close_delete: #E00000;
            
            /** LightBox **/
            --lightbox_background: #000000cc;
            --close_lightbox_icon: #ffffff;
            --close_lightbox_icon_hover: #ffffff;
        
            /** Opacity **/
            --opacity_notfocus: 0.75;
            --opacity_blured: 0.6;
        
            /**Transition **/
            --regular_transition: 0.4s;
        }
    </style>
    `;
}

export function insertCssVars( template = null) {
    if ( !template ) { template = 'default'; }
    jQuery(document.body).prepend( Nice['CSSTemplates'][template] );
}

export function replaceCssVars( template = null ) {

    if ( !template ) { template = defaultTempalte; }
    let vars_styles = jQuery('#CSSVars');
    if ( vars_styles.length > 0 ) {
        vars_styles.replaceWith( Nice['CSSTemplates'][template] )
    }

}
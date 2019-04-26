export function switchTabs( current, Tabs ) {

    let Tab = jQuery(current);

    let TabName = Tab.attr('data-tab');                                           // Get name of tab on which we will switch
    if ( !TabName ) {
        return                                                                    // If no name in data attribute - stop working
    }

    let TabArea = Tab.parents( Tabs.container );                                  // Get area of tab on which we will switch
    if ( !TabArea ) {
        TabArea = document                                                        // If no such area, try to find elements in document
    }

    TabArea.find(Tabs.cont).removeClass('current');                               // Remove active class from all tabs content wrappers
    TabArea.find(Tabs.nav).removeClass('current');                                // Remove active class from all tabs buttons
    Tab.addClass('current');                                                      // Add active class to clicked tab
    TabArea.find( Tabs.cont + '[data-tab='+TabName+']').addClass('current');      // Add active class to needed tab
    if (Tabs.callback){
        Tabs.callback();
    }
}

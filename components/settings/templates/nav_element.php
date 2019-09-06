<?php ?>

<div class="menu_item MenuTab <?php if ( $current ) { echo 'current'; } ?>"
     data-tab="<?php echo $slug; ?>"
     onclick="Nice.switchTabs( this, {
        'container': '.SettingsContainer',
        'cont': '.TabsContent',
        'nav': '.MenuTab'
     })">


    <nice-svg svg-id="<?php echo $icon; ?>" svg-size="medium" ></nice-svg>
    <span class="item_name">
         <?php echo $title; ?>
    </span>

</div>

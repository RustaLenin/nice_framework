<?php ?>

<div class="menu_item MenuTab <?php if ( $current ) { echo 'current'; } ?>"
     data-tab="<?php echo $slug; ?>"
     onclick="Nice.switchTabs( this, {
        'container': '.SettingsContainer',
        'cont': '.TabsContent',
        'nav': '.MenuTab'
     })">


    <?php echo nice_svg([
        'size' => 'medium',
        'id'   => $icon
    ]); ?>

    <span class="item_name">
         <?php echo $title; ?>
    </span>

</div>

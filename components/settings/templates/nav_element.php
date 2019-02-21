<?php ?>

<div class="menu_item MenuTab <?php if ( $current ) { echo 'current'; } ?>"
     data-tab="<?php echo $slug; ?>"
     onclick="SwitchSettingsTab(this)">

    <span class="nice_svg medium">
        <svg><use href="#<?php echo $icon; ?>"></use></svg>
    </span>
    <span class="item_name">
         <?php echo $title; ?>
    </span>

</div>

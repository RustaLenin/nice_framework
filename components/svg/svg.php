<?php

if ( !function_exists( 'nice_svg' ) ) {
    function nice_svg( $icon, $class = '' ) {
        return NiceSvg::render( $icon, $class );
    }
}

Class NiceSvg {

    public static function render( $icon = [] ) {

        if ( is_string( $icon ) ) {
            $id = $icon;
            $icon = [
                'id' => $id
            ];
        }

        else if ( is_bool( $icon ) ) {
            return '';
        }

        if ( !isset ( $icon['id'] ) )               { $icon['id']               = 'cog'; }
        if ( !isset ( $icon['class'] ) )            { $icon['class']            = ''; }
        if ( !isset ( $icon['size'] ) )             { $icon['size']             = 'medium'; }
        if ( !isset ( $icon['onclick'] ) )          { $icon['onclick']          = ''; }
        if ( !isset ( $icon['click_able'] ) )       { $icon['click_able']       = false; }
        if ( !isset ( $icon['rotate'] ) )           { $icon['rotate']           = false;}

        if ( is_array( $icon['class'] ) ) {
            $temp_string = '';
            foreach ( $icon['class'] as $key => $value ) {
                $temp_string .= $value . ',';
            }
            $temp_string = mb_substr( $temp_string, 0, -1 );
            $icon['class'] = $temp_string;
        }

        ob_start(); ?>

        <nice-svg
            svg-id="<?php echo $icon['id']; ?>"
            svg-class="<?php echo $icon['class']; ?>"
            svg-size="<?php echo $icon['size']; ?>"
            onclick="<?php echo $icon['onclick']; ?>"
            svg-pointer="<?php echo $icon['click_able']; ?>"
            svg-rotate="<?php echo $icon['rotate']; ?>">
        </nice-svg>

        <?php return ob_get_clean();

    }

}
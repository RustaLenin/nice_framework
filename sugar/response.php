<?php

Class NiceResponse {

    public static function update_answer( $answer, $new_data ) {
        return array_merge( $answer, $new_data );
    }

    public static function default_answer() {
        return [
            'result'  => 'error',
            'message' => _t('Nothing happens') . ' ¯\_(ツ)_/¯',
            'source'  => __METHOD__
        ];
    }

}
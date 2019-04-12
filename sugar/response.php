<?php

Class NiceResponse {

    static $answer = [
        'result'  => 'error',
        'message' => 'Nothing happens ¯\_(ツ)_/¯',
        'source'  => __METHOD__
    ];

    public static function update_answer( $answer, $new_data ) {
        return array_merge( $answer, $new_data );
    }

}
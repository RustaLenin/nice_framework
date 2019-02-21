<?php

Class NiceCustomPost {

    static $post_type = 'nice_post';

    static $post_name = 'Nice post';

    static $def_post_status = 'publish';

    static $model = [
        'post_title' => [
            'name'          => 'post_title',
            'data_type'     => 'text',
            'required'      => true,
            'in_form'       => true,
            'field_type'    => 'regular',
            'validation'    => 'isNotEmpty',
            'placeholder'   => 'Nice post',
            'label'         => 'Nice title',
            'is_basic'      => true
        ],
        'post_content' => [
            'name'          => 'post_content',
            'data_type'     => 'text',
            'required'      => false,
            'in_form'       => true,
            'field_type'    => 'regular',
            'validation'    => 'isNotEmpty',
            'placeholder'   => 'Nice post',
            'label'         => 'Nice content',
            'is_basic'      => true
        ],
        'cost' => [
            'name'          => 'cost',
            'data_type'     => 'int',
            'required'      => false,
            'in_form'       => true,
            'field_type'    => 'regular',
            'validation'    => 'isInt',
            'placeholder'   => '100500',
            'label'         => 'How much it cost',
            'error_message' => 'Only numerals',
            'is_basic'      => false
        ],
    ];

    static $default_answer = [
        'result'  => 'error',
        'message' => 'Nothing Happens ¯\_(ツ)_/¯',
        'source'  => __METHOD__
    ];

    public static function add( $post_data ) {

        $answer = self::$default_answer;

        if( !$post_data ) {                                      //Checking we received any data
            $answer['message'] = 'post_data is not received';
        } else {
            if ( $post_data['ID'] ) {                            //Checking is it existing post need to updating
                $answer = self::update( $post_data );            // If so - update existing
            } else {

                foreach ( self::$model as $field => $args ) {    // Check all required field received
                    if ( $args['required'] ) {
                        if ( !$post_data[$field] ) {
                            $answer['message'] = 'Field ' .  $field . ' is required';
                            return $answer;
                        }
                    }
                }

                if ( !$post_data['post_type'] )   { $post_data['post_type']   = self::$post_type; }
                if ( !$post_data['post_status'] ) { $post_data['post_status'] = self::$def_post_status; }

                $ID = wp_insert_post( $post_data, true ); // Insert post in database return id or error

                if ( is_wp_error( $ID ) ) {
                    $answer['message'] = $ID->get_error_message();
                } else {

                    $failed_to_update = [];                            // Creating empty array to collect not updated fields
                    $updated_success = [];
                    foreach ( $post_data as $field => $value ) {
                        if ( self::$model[$field] ) {                       // Checking field is in model
                            if ( !self::$model[$field]['is_basic'] ) {      // Is not basic, update it in db
                                $update_result = update_post_meta( $ID, $field, $value );
                                if ( !$update_result ) {                    // Id update failed store it
                                    $failed_update[$field] = $value;
                                } else {
                                    $updated_success[$field] = $update_result;
                                }
                            }
                        }
                    }

                    $answer = [
                        'result'  => 'success',
                        'message' => self::$post_name . ' was added',
                        'source'  => __METHOD__,
                        'payload' => [
                            'ID'               => $ID,
                            'service_data'     => $post_data,
                            'failed_to_update' => $failed_to_update,
                            'updated_success'  => $updated_success,
                        ]
                    ];
                }
            }
        }

        return $answer;
    }

    public static function update( $post_data ) {

        $answer = self::$default_answer;

        if( !$post_data ) { //Checking we received any data
            $answer['message'] = 'post_data is not received';
        } else {
            if ( !$post_data['ID'] ) {
                $answer['message'] = 'No ID received which to update';
            } else {

                $ID = wp_update_post( $post_data );                         // Return same ID if success or 0 if false
                if ( $ID != $post_data['ID'] ) {                            // That's why it looks so strange
                    $answer['message'] = 'Failed to update';
                } else {

                    $failed_to_update = [];                            // Creating empty array to collect not updated fields'
                    $updated_success = [];
                    foreach ( $post_data as $field => $value ) {
                        if ( self::$model[$field] ) {                       // Checking field is in model
                            if ( !self::$model[$field]['is_basic'] ) {      // Is not basic, update it in db
                                $update_result = update_post_meta( $ID, $field, $value );
                                if ( !$update_result ) {                    // Id update failed store it
                                    $failed_update[$field] = $update_result;
                                } else {
                                    $updated_success[$field] = $update_result;
                                }
                            }
                        }
                    }

                    $answer = [
                        'result'  => 'success',
                        'message' => 'Service was updated',
                        'source'  => __METHOD__,
                        'payload' => [
                            'ID'               => $ID,
                            'post_data'        => $post_data,
                            'failed_to_update' => $failed_to_update,
                            'updated_success'  => $updated_success,
                        ]
                    ];

                }

            }
        }

        return $answer;

    }

    public static function get_data ( $post_data ) {

        $answer = self::$default_answer;

        if( !$post_data ) {
            $answer['message'] = 'post_data is not received';
        } else {
            if ( !$post_data['ID'] ) {
                $answer['message'] = 'No ID received to get a post';
            } else {

                $service = get_post( $post_data['ID'] );
                if ( !$service ) {
                    $answer['message'] = 'Failed to get service with such ID';
                } else {

                    $payload = array();
                    foreach ( self::$model as $key => $data ) {
                        $payload[$key] = $service->$key;
                    }
                    $payload['ID'] = $post_data['ID'];

                    $answer = array(
                        'result'  => 'success',
                        'message' => 'Here you go',
                        'source'  => __METHOD__,
                        'payload' => $payload
                    );

                }

            }
        }

        return $answer;

    }

    public static function get_model( $post_data ) {

        $answer = self::$default_answer;

        if( !$post_data ) {
            $answer['message'] = 'post_data is not received';
        } else {

            $answer = array(
                'result'  => 'success',
                'message' => 'Here you go',
                'source'  => __METHOD__,
                'payload' => self::$model
            );

        }

        return $answer;

    }

    public static function ajax_handler() {

        $answer = self::$default_answer;

        if ( !$_POST ) {
            $answer['message'] = 'No request received';
        } else {
            if ( !$_POST['command'] ) {
                $answer['message'] = 'No command received';
            } else {
                if ( !$_POST['payload'] ) {
                    $answer['message'] = 'No payload received';
                } else {

                    if ( method_exists( __CLASS__, $_POST['command'] ) ) {
                        $command = $_POST['command'];
                        $answer = self::$command( $_POST['payload'] );
                    } else {
                        $answer['message'] = 'Unknown command ¯\_(ツ)_/¯';
                    }

                }
            }
        }

        echo json_encode( $answer );
        wp_die();

    }

}
<?php

Class NICE_SETTINGS_POSTS {

    static $post_type = 'nice_settings';
    static $post_status = 'publish';

    static $model = array(
        'name' => 'string',
        'tabs' => 'array',
        'blocks' => 'array',
        'fields' => 'array',
    );

    public static function register() {

        if ( post_type_exists( self::$post_type ) ) {
            // do_nothing
        } else {
            register_post_type( self::$post_type, array(
                'label'               => null,
                'labels'              => array(
                    'name'               => 'Settings',
                    'singular_name'      => 'Setting page',
                    'add_new'            => 'Add Setting Page',
                    'add_new_item'       => 'Adding new Setting Page',
                    'edit_item'          => 'Edit Setting Page',
                    'new_item'           => 'New Setting Page',
                    'view_item'          => 'View Setting Page',
                    'search_items'       => 'Search Setting Page',
                    'not_found'          => 'Settings Page Not Found',
                    'not_found_in_trash' => 'No one Setting Page in trash',
                    'parent_item_colon'  => '',
                    'menu_name'          => 'Settings Page',
                ),
                'description'         => 'Posts with models of settings pages', // Custom post type description
                'public'              => true, // define may we work with this type publicy
                'publicly_queryable'  => true, // if false, theme query will not work with this type
                'exclude_from_search' => true, // if true, this post type will be exclude from query
                'show_ui'             => false, // if false, this post type will exclude from user interfase
                'show_in_menu'        => false, // if false, this post type will exclude from user menu
                'show_in_admin_bar'   => false, // if false, this post type will exclude from admin bar
                'show_in_nav_menus'   => false, // if false, this post type will exclude from nav menus
                'show_in_rest'        => true, // add to WP REST API. From WP 4.7
                'rest_base'           => self::$post_type, 	// $post_type. From WP 4.7
                'menu_position'       => 33, 3,
                'menu_icon'           => null,
                //'capability_type'   => 'post',
                //'capabilities'      => 'post', // array of user capabilities to interact with post type массив
                //'map_meta_cap'      => null, // If true standart capabilities handler will be used
                'hierarchical'        => false, // Doese this post type will have hierarch (like pages) or haven't (like posts)
                'supports'            => array( 'title', 'excerpt', 'fields', 'comments', 'custom-fields', 'editor' ),
                // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
                'taxonomies'          => array( 'category', 'post_tag' ),
                'has_archive'         => true,
                'rewrite'             => true,
                'query_var'           => true,
            ) );

        }

    }

    public static function add( $post_data ) {

        $answer = null;

        if( !$post_data ) { //Checking we received any data
            $answer = array(
                'result'  => 'error',
                'message' => 'Data is not received',
                'source'  => __METHOD__
            );
        } else {
            if ( $post_data['ID'] ) {                         //Checking is it existing post need to updating
                $answer = self::update( $post_data );         // If so - update existing
            } else {

                if ( !$post_data['post_type'] )   { $post_data['post_type']   = self::$post_type; }
                if ( !$post_data['post_status'] ) { $post_data['post_status'] = self::$post_status; }

                $ID = wp_insert_post( $post_data, true ); // Insert post in database return id or error

                if ( is_wp_error( $ID ) ) {
                    $answer = array(
                        'result'  => 'error',
                        'message' => $ID->get_error_message(),
                        'source'  => __METHOD__
                    );
                } else {

                    $failed_to_update = array();                            // Creating empty array to collect not updated fields

                    foreach ( $post_data as $field => $value ) {
                        if ( self::$model[$field] ) {                       // Checking field is in model
                            $update_result = update_post_meta( $ID, $field, $value );
                            if ( !$update_result ) {                    // Id update failed store it
                                $failed_update[$field] = $value;
                            }
                        }
                    }

                    $answer = array(
                        'result'  => 'success',
                        'message' => 'Service was added',
                        'source'  => __METHOD__,
                        'payload' => array(
                            'ID'               => $ID,
                            'service_data'     => $post_data,
                            'failed_to_update' => $failed_to_update,
                        )
                    );
                }
            }
        }

        if ( !$answer ) {
            $answer = array(
                'result'  => 'error',
                'message' => 'Nothing Happens ¯\_(ツ)_/¯',
                'source'  => __METHOD__
            );
        }
        return $answer;
    }

    public static function update( $post_data ) {

        $answer = null;

        if( !$post_data ) { //Checking we received any data
            $answer = array(
                'result'  => 'error',
                'message' => 'service_data is not received',
                'source'  => __METHOD__
            );
        } else {
            if ( !$post_data['ID'] ) {
                $answer = array(
                    'result'  => 'error',
                    'message' => 'No ID received which to update',
                    'source'  => __METHOD__
                );
            } else {

                $ID = wp_update_post( $post_data );    // Return same ID if success or 0 if false
                if ( $ID != $post_data['ID'] ) {       // That's why it looks so strange
                    $answer = array(
                        'result'  => 'error',
                        'message' => 'Failed to update',
                        'source'  => __METHOD__
                    );
                } else {

                    $failed_to_update = array();                            // Creating empty array to collect not updated fields'
                    $updated_success = array();
                    foreach ( $post_data as $field => $value ) {
                        if ( self::$model[$field] ) {                       // Checking field is in model
                            $update_result = update_post_meta( $ID, $field, $value );
                            if ( !$update_result ) {                    // Id update failed store it
                                $failed_update[$field] = $update_result;
                            } else {
                                $updated_success[$field] = $update_result;
                            }
                        }
                    }

                    $answer = array(
                        'result'  => 'success',
                        'message' => 'Service was updated',
                        'source'  => __METHOD__,
                        'payload' => array(
                            'ID'               => $ID,
                            'service_data'     => $post_data,
                            'failed_to_update' => $failed_to_update,
                            'updated_success'  => $updated_success,
                        )
                    );

                }

            }
        }

        return $answer;

    }

    public static function get_data ( $post_data ) {

        $answer = null;

        if( !$post_data ) {
            $answer = array(
                'result'  => 'error',
                'message' => 'service_data is not received',
                'source'  => __METHOD__
            );
        } else {
            if ( !$post_data['ID'] ) {
                $answer = array(
                    'result' => 'error',
                    'message' => 'No ID received to get a post',
                    'source' => __METHOD__
                );
            } else {

                $post = get_post( $post_data['ID'] );
                if ( !$post ) {
                    $answer = array(
                        'result' => 'error',
                        'message' => 'Failed to get service with such ID',
                        'source' => __METHOD__
                    );
                } else {

                    $payload = array();
                    foreach ( self::$model as $key => $data ) {
                        $payload[$key] = $post->$key;
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

        if ( !$answer ) {
            $answer = array(
                'result'  => 'error',
                'message' => 'Nothing Happens ¯\_(ツ)_/¯',
                'source'  => __METHOD__
            );
        }
        return $answer;

    }

    public static function ajax_handler() {

        $answer = null;

        if ( !$_POST ) {
            $answer = array(
                'result'  => 'error',
                'message' => 'No request received',
                'source'  => __METHOD__
            );
        } else {
            if ( !$_POST['command'] ) {
                $answer = array(
                    'result'  => 'error',
                    'message' => 'No command received',
                    'source'  => __METHOD__
                );
            } else {
                if ( !$_POST['payload'] ) {
                    $answer = array(
                        'result'  => 'error',
                        'message' => 'No payload received',
                        'source'  => __METHOD__
                    );
                } else {

                    if ( method_exists( __CLASS__, $_POST['command'] ) ) {
                        $command = $_POST['command'];
                        $answer = self::$command( $_POST['payload'] );
                    } else {
                        $answer = array(
                            'result'  => 'error',
                            'message' => 'Unknown command ¯\_(ツ)_/¯',
                            'source'  => __METHOD__
                        );
                    }

                }
            }
        }

        if ( !$answer ) {
            $answer = array(
                'result'  => 'error',
                'message' => 'Nothing Happens ¯\_(ツ)_/¯',
                'source'  => __METHOD__
            );
        }
        echo json_encode( $answer );
        wp_die();

    }

}

add_action( 'wp_ajax_nopriv_bo_services', array( 'NICE_SETTINGS_POSTS', 'ajax_handler') );
add_action( 'wp_ajax_bo_services', array( 'NICE_SETTINGS_POSTS', 'ajax_handler') );
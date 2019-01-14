<?php

Class NICE_FRAMEWORK_SETUP_PAGE {

    static $model = array(
        'slug'  => 'nice_framework_setup',
        'title' => 'Nice FrameWork Setup',
        'tabs' => array(
            'components' => array(
                'slug'       => 'components',
                'title'      => 'Components',
                'icon'       => 'calendar',
                'current'    => true,
                'capability' => 8,
                'blocks'     => array(),
                'fields'     => array( 'post_title'),
            ),
            'templates' => array(
                'slug'       => 'templates',
                'title'      => 'Templates',
                'icon'       => 'link',
                'current'    => false,
                'capability' => 8,
                'blocks'     => array('templates_1', 'templates_2'),
                'fields'     => array(),
            ),
            'icons' => array(
                'slug'       => 'icons',
                'title'      => 'Icons',
                'icon'       => 'link',
                'current'    => false,
                'capability' => 8,
                'blocks'     => array(),
                'fields'     => array(),
                'content'    => 'Some things here'
            ),
            'svg' => array(
                'slug'       => 'svg',
                'title'      => 'SVG',
                'icon'       => 'link',
                'current'    => false,
                'capability' => 8,
                'blocks'     => array(),
                'fields'     => array(),
            ),
        ),
        'blocks' => array(
            'components_1' => array(
                'slug'       => 'components_1',
                'title'      => 'Title 1',
                'icon'       => 'edit',
                'collapsed'  => false,
                'capability' => 8,
                'fields'     => array()
            ),
            'components_2' => array(
                'slug'       => 'components_2',
                'title'      => 'Title 2',
                'icon'       => 'edit',
                'collapsed'  => false,
                'capability' => 8,
                'fields'     => array()
            ),
            'templates_1' => array(
                'slug'       => 'templates_1',
                'title'      => 'Title 1',
                'icon'       => 'edit',
                'collapsed'  => false,
                'capability' => 8,
                'fields'     => array( 'post_title', 'cost' )
            ),
            'templates_2' => array(
                'slug'       => 'templates_2',
                'title'      => 'Title 2',
                'icon'       => 'edit',
                'collapsed'  => false,
                'capability' => 8,
                'fields'     => array( 'deadline', 'url' )
            ),
        ),
        'fields' => array(
            'post_title' => array(
                'name'          => 'post_title',
                'data_type'     => 'text',
                'required'      => true,
                'in_form'       => true,
                'field_type'    => 'regular',
                'validation'    => 'isNotEmpty',
                'placeholder'   => 'Gmail',
                'label'         => 'Service title',
                'is_basic'      => true
            ),
            'cost' => array(
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
            ),
            'deadline' => array(
                'name'          => 'deadline',
                'data_type'     => 'date',
                'required'      => false,
                'in_form'       => true,
                'field_type'    => 'vanilla',
                'field_class'   => 'DatePicker',
                'icon'          => 'calendar',
                'validation'    => 'isDate',
                'placeholder'   => '10.12.1993',
                'label'         => 'Date deadline',
                'error_message' => 'Need valid data',
                'is_basic'      => false
            ),
            'url' => array(
                'name'          => 'url',
                'data_type'     => 'url',
                'required'      => false,
                'in_form'       => true,
                'field_type'    => 'regular',
                'icon'          => 'link',
                'validation'    => 'isUrl',
                'placeholder'   => 'http://example.com/',
                'label'         => 'Service url',
                'error_message' => 'Need valid url',
                'is_basic'      => false
            ),
            'icon' => array(
                'name'          => 'icon',
                'data_type'     => 'url',
                'required'      => false,
                'in_form'       => true,
                'field_type'    => 'media',
                'validation'    => 'isImgUrl',
                'placeholder'   => 'image.jpg',
                'label'         => 'Icon image',
                'error_message' => 'Need a valid icon',
                'is_basic'      => false
            ),
            'currency' => array(
                'name'      => 'currency',
                'data_type'     => 'currency',
                'required'      => false,
                'in_form'       => true,
                'field_type'    => 'regular',
                'validation'    => 'isCurrency',
                'placeholder'   => 'USD',
                'label'         => 'Currency',
                'error_message' => 'Enter a valid currency',
                'is_basic'      => false
            ),
        )
    );

    public static function construct() {
        echo nice_settings( self::$model );
    }

}
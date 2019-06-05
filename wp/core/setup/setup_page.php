<?php

Class NICE_FRAMEWORK_SETUP_PAGE {

    public static function construct() {

        wp_enqueue_media();

        $model = [
            'slug'  => 'nice_framework_setup',
            'title' => 'Nice FrameWork Setup',
            'tabs' => [
                'components' => [
                    'slug'       => 'components',
                    'title'      => 'Components',
                    'icon'       => 'calendar',
                    'current'    => true,
                    'capability' => 8,
                    'blocks'     => [],
                    'fields'     => [ 'currency', 'post_title', 'description', 'cost', 'deadline', 'url', 'icon' ],
                ],
                'templates' => [
                    'slug'       => 'templates',
                    'title'      => 'Templates',
                    'icon'       => 'link',
                    'current'    => false,
                    'capability' => 8,
                    'blocks'     => [ 'templates_1', 'templates_2' ],
                    'fields'     => [],
                ],
                'icons' => [
                    'slug'       => 'icons',
                    'title'      => 'Icons',
                    'icon'       => 'link',
                    'current'    => false,
                    'capability' => 8,
                    'blocks'     => [],
                    'fields'     => [],
                    'content'    => nice_button([])
                ],
                'svg' => [
                    'slug'       => 'svg',
                    'title'      => 'SVG',
                    'icon'       => 'link',
                    'current'    => false,
                    'capability' => 8,
                    'blocks'     => [],
                    'fields'     => [],
                    'callback'   => 'nice_button',
                    'callback_args' => []
                ],
            ],
            'blocks' => [
                'components_1' => [
                    'slug'       => 'components_1',
                    'title'      => 'Title 1',
                    'icon'       => 'edit',
                    'collapsed'  => false,
                    'capability' => 8,
                    'fields'     => []
                ],
                'components_2' => [
                    'slug'       => 'components_2',
                    'title'      => 'Title 2',
                    'icon'       => 'edit',
                    'collapsed'  => false,
                    'capability' => 8,
                    'fields'     => []
                ],
                'templates_1' => [
                    'slug'       => 'templates_1',
                    'title'      => 'Title 1',
                    'icon'       => 'edit',
                    'collapsed'  => false,
                    'capability' => 8,
                    'fields'     => [ 'post_title', 'cost' ]
                ],
                'templates_2' => [
                    'slug'       => 'templates_2',
                    'title'      => 'Title 2',
                    'icon'       => 'edit',
                    'collapsed'  => false,
                    'capability' => 8,
                    'fields'     => [ 'deadline', 'url' ]
                ],
            ],
            'fields' => [
                'post_title' => [
                    'name'          => 'post_title',
                    'data_type'     => 'text',
                    'required'      => true,
                    'in_form'       => true,
                    'field_type'    => 'regular',
                    'validation'    => 'isNotEmpty',
                    'placeholder'   => 'Gmail',
                    'label'         => 'Service title',
                    'is_basic'      => true,
                    'border_type'   => 'only_bottom_border',
                    'no_min_width'  => true,
                ],
                'cost' => [
                    'name'          => 'cost',
                    'data_type'     => 'int',
                    'required'      => true,
                    'in_form'       => true,
                    'field_type'    => 'regular',
                    'validation'    => 'isInt',
                    'placeholder'   => '100500',
                    'label'         => 'How much it cost',
                    'error_message' => 'Only numerals',
                    'success_message' => 'Ok!',
                    'comment_message' => 'Enter valid cost',
                    'is_basic'      => false,
                    'no_min_width'  => true,
                    'label_type'    => 'over_border',
                ],
                'deadline' => [
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
                    'is_basic'      => false,
                    'success_message' => 'Ok!',
                    'comment_message' => 'Enter valid data please'
                ],
                'url' => [
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
                    'is_basic'      => false,
                    'success_message' => 'Ok!',
                    'comment_message' => 'Enter valid url please'
                ],
                'icon' => [
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
                ],
                'description' => [
                    'name'          => 'description',
                    'data_type'     => 'text',
                    'required'      => false,
                    'in_form'       => true,
                    'field_type'    => 'textarea',
                    'icon'          => 'article',
                    'validation'    => false,
                    'placeholder'   => 'Some text about you',
                    'label'         => 'Description',
                    'error_message' => 'WTF',
                    'is_basic'      => false,
                ],
                'currency' => [
                    'name'          => 'currency',
                    'data_type'     => 'select',
                    'field_type'    => 'select_list',
                    'select_type'   => 'multiple',
                    'required'      => false,
                    'checkboxes'    => true,
                    'validation'    => false,
                    'label'         => 'Choose currency',
                    'show_label'    => false,
                    'size'          => 'medium',
                    'value'         => '',
                    'content'       => '',
                    'icon'          => '',
                    'data_format'   => 'map',
                    'selections'       => [
                        'RUB' => [
                            'name'       => 'currency_1',
                            'value'      => 'RUB',
                            'text'       => 'Rubles',
                            'default'    => true,
                            'permission' => 'all',
                            'icon'       => 'ruble',
                            'color'      => false,
                            'block'      => true,
                        ],
                        'USD' => [
                            'name'       => 'currency_2',
                            'value'      => 'USD',
                            'text'       => 'Dollars',
                            'default'    => true,
                            'permission' => 'all',
                            'icon'       => 'dollar',
                            'color'      => false,
                            'block'      => false
                        ],
                        'EUR' => [
                            'name'       => 'currency_3',
                            'value'      => 'EUR',
                            'text'       => 'Euro',
                            'default'    => true,
                            'permission' => 'all',
                            'icon'       => 'euro',
                            'color'      => false,
                            'block'      => false
                        ]
                    ]
                ],
            ]
        ];

        echo nice_settings( $model );
    }

    public static function js() {?>
        <script src="<?php echo  plugin_dir_url( __FILE__ ) . 'setup_page_script.js'; ?>" type="module"></script>
        <?php
    }

}
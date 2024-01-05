<?php
/**
* Plugin Name: login
*/


//Exit if accessed directly
if( !defined( 'ABSPATH' ) ){
	return;
}


define( 'XOO_EL', true);
define( 'XOO_EL_PLUGIN_FILE', __FILE__ );


if ( ! class_exists( 'Xoo_El_Core' ) ) {
	require_once 'includes/class-xoo-el-core.php';
}

if( !function_exists( 'xoo_el' ) ){
	function xoo_el(){
		
		do_action('xoo_el_before_plugin_activation');

		return Xoo_El_Core::get_instance();
		
	}
}
add_action( 'plugins_loaded', 'xoo_el', 8 );
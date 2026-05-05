<?php
/**
 * Plugin Name:       WP Atlas
 * Description:       A collection of reusable WordPress blocks.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            Rares Mateizer
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-atlas
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WP_ATLAS_VERSION', '0.1.0' );
define( 'WP_ATLAS_DIR', plugin_dir_path( __FILE__ ) );
define( 'WP_ATLAS_URL', plugin_dir_url( __FILE__ ) );

function wp_atlas_register_blocks() {
	$build_dir = WP_ATLAS_DIR . 'build/blocks/';

	if ( ! is_dir( $build_dir ) ) {
		return;
	}

	$block_dirs = glob( $build_dir . '*', GLOB_ONLYDIR );

	foreach ( $block_dirs as $block_dir ) {
		register_block_type( $block_dir );
	}
}
add_action( 'init', 'wp_atlas_register_blocks' );

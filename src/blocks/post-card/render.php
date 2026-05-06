<?php
$post_id = isset( $attributes['postId'] ) ? intval( $attributes['postId'] ) : 0;

if ( ! $post_id ) {
	return;
}

$inner_html = wp_atlas_render_post_card_inner( $post_id, $attributes );

if ( ! $inner_html ) {
	return;
}

$classes = '';
if ( ! empty( $attributes['elevateOnHover'] ) ) {
	$classes = 'has-elevate-on-hover';
}

printf(
	'<div %s>%s</div>',
	get_block_wrapper_attributes( array( 'class' => $classes ) ),
	$inner_html
);

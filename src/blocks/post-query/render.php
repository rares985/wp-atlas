<?php
$query_args = array(
	'posts_per_page' => intval( $attributes['postsToShow'] ?? 3 ),
	'order'          => sanitize_sql_orderby( $attributes['order'] ?? 'desc' ) ? ( $attributes['order'] ?? 'desc' ) : 'desc',
	'orderby'        => sanitize_sql_orderby( $attributes['orderBy'] ?? 'date' ) ? ( $attributes['orderBy'] ?? 'date' ) : 'date',
	'offset'         => intval( $attributes['offset'] ?? 0 ),
	'post_status'    => 'publish',
);

if ( ! empty( $attributes['categories'] ) && is_array( $attributes['categories'] ) ) {
	$query_args['category__in'] = array_map( 'intval', $attributes['categories'] );
}

$posts = get_posts( $query_args );

if ( empty( $posts ) ) {
	return;
}

$columns = intval( $attributes['columns'] ?? 3 );
$elevate = ! empty( $attributes['elevateOnHover'] );

$wrapper_attrs = get_block_wrapper_attributes( array(
	'style' => '--wp-atlas-post-query-columns:' . $columns . ';',
) );

$output = '<div ' . $wrapper_attrs . '>';

foreach ( $posts as $p ) {
	$inner   = wp_atlas_render_post_card_inner( $p->ID, $attributes );
	$classes = 'wp-block-wp-atlas-post-card';
	if ( $elevate ) {
		$classes .= ' has-elevate-on-hover';
	}
	$output .= '<div class="' . esc_attr( $classes ) . '">' . $inner . '</div>';
}

$output .= '</div>';

echo $output;

<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function wp_atlas_render_post_card_inner( $post_id, $attributes = array() ) {
	$post = get_post( $post_id );
	if ( ! $post ) {
		return '';
	}

	$defaults = array(
		'showFeaturedImage' => true,
		'showExcerpt'       => true,
		'showDate'          => true,
		'showAuthor'        => false,
		'showCategory'      => false,
		'excerptLength'     => 20,
		'titleLevel'        => 3,
		'buttonText'        => 'Read More',
		'elevateOnHover'    => false,
	);
	$atts = wp_parse_args( $attributes, $defaults );

	$permalink = get_permalink( $post );
	$title     = get_the_title( $post );
	$tag       = 'h' . intval( $atts['titleLevel'] );

	$html = '';

	if ( $atts['showFeaturedImage'] && has_post_thumbnail( $post ) ) {
		$image_url = get_the_post_thumbnail_url( $post, 'large' );
		$html     .= '<div class="wp-block-wp-atlas-post-card__image">';
		$html     .= '<a href="' . esc_url( $permalink ) . '" tabindex="-1" aria-hidden="true">';
		$html     .= '<img src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $title ) . '" />';
		$html     .= '</a>';
		$html     .= '</div>';
	}

	$html .= '<div class="wp-block-wp-atlas-post-card__content">';

	$html .= '<' . $tag . ' class="wp-block-wp-atlas-post-card__title">';
	$html .= '<a href="' . esc_url( $permalink ) . '">' . esc_html( $title ) . '</a>';
	$html .= '</' . $tag . '>';

	$meta_parts = array();
	if ( $atts['showDate'] ) {
		$meta_parts[] = '<time datetime="' . esc_attr( get_the_date( 'c', $post ) ) . '">' . esc_html( get_the_date( '', $post ) ) . '</time>';
	}
	if ( $atts['showAuthor'] ) {
		$meta_parts[] = '<span>' . esc_html( get_the_author_meta( 'display_name', $post->post_author ) ) . '</span>';
	}
	if ( $atts['showCategory'] ) {
		$categories = get_the_category( $post->ID );
		if ( ! empty( $categories ) ) {
			$meta_parts[] = '<span>' . esc_html( $categories[0]->name ) . '</span>';
		}
	}
	if ( ! empty( $meta_parts ) ) {
		$html .= '<div class="wp-block-wp-atlas-post-card__meta">' . implode( '<span class="wp-block-wp-atlas-post-card__meta-sep">&middot;</span>', $meta_parts ) . '</div>';
	}

	if ( $atts['showExcerpt'] ) {
		$excerpt = has_excerpt( $post )
			? get_the_excerpt( $post )
			: wp_trim_words( wp_strip_all_tags( $post->post_content ), intval( $atts['excerptLength'] ), '&hellip;' );
		$html .= '<p class="wp-block-wp-atlas-post-card__excerpt">' . esc_html( $excerpt ) . '</p>';
	}

	if ( ! empty( $atts['buttonText'] ) ) {
		$html .= '<a class="wp-block-wp-atlas-post-card__button" href="' . esc_url( $permalink ) . '">' . esc_html( $atts['buttonText'] ) . '</a>';
	}

	$html .= '</div>';

	return $html;
}

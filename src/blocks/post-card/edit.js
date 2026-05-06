import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	HeadingLevelDropdown,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	TextControl,
	Placeholder,
	ComboboxControl,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState, useMemo } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import './editor.scss';

function PostCardPreview( { post, media, attributes } ) {
	const {
		showFeaturedImage,
		showExcerpt,
		showDate,
		showAuthor,
		showCategory,
		excerptLength,
		titleLevel,
		buttonText,
	} = attributes;

	const TitleTag = `h${ titleLevel }`;
	const imageUrl = media?.source_url;
	const excerpt = post.excerpt?.rendered
		? decodeEntities( post.excerpt.rendered.replace( /<[^>]+>/g, '' ) )
		: '';
	const trimmedExcerpt =
		excerpt.split( /\s+/ ).slice( 0, excerptLength ).join( ' ' ) +
		( excerpt.split( /\s+/ ).length > excerptLength ? '…' : '' );

	return (
		<>
			{ showFeaturedImage && imageUrl && (
				<div className="wp-block-wp-atlas-post-card__image">
					<img
						src={ imageUrl }
						alt={ decodeEntities( post.title.rendered ) }
					/>
				</div>
			) }
			<div className="wp-block-wp-atlas-post-card__content">
				<TitleTag className="wp-block-wp-atlas-post-card__title">
					{ decodeEntities( post.title.rendered ) }
				</TitleTag>
				{ ( showDate || showAuthor || showCategory ) && (
					<div className="wp-block-wp-atlas-post-card__meta">
						{ showDate && (
							<time dateTime={ post.date }>
								{ new Date( post.date ).toLocaleDateString() }
							</time>
						) }
						{ showDate && ( showAuthor || showCategory ) && (
							<span className="wp-block-wp-atlas-post-card__meta-sep">
								&middot;
							</span>
						) }
						{ showAuthor && post._embedded?.author?.[ 0 ] && (
							<span>{ post._embedded.author[ 0 ].name }</span>
						) }
						{ showAuthor && showCategory && (
							<span className="wp-block-wp-atlas-post-card__meta-sep">
								&middot;
							</span>
						) }
						{ showCategory &&
							post._embedded?.[ 'wp:term' ]?.[ 0 ]?.[ 0 ] && (
								<span>
									{
										post._embedded[ 'wp:term' ][ 0 ][ 0 ]
											.name
									}
								</span>
							) }
					</div>
				) }
				{ showExcerpt && trimmedExcerpt && (
					<p className="wp-block-wp-atlas-post-card__excerpt">
						{ trimmedExcerpt }
					</p>
				) }
				{ buttonText && (
					<span className="wp-block-wp-atlas-post-card__button">
						{ buttonText }
					</span>
				) }
			</div>
		</>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const { postId, elevateOnHover } = attributes;
	const [ searchInput, setSearchInput ] = useState( '' );

	const { searchResults, isSearching } = useSelect(
		( select ) => {
			if ( searchInput.length < 2 ) {
				return { searchResults: [], isSearching: false };
			}
			const query = { search: searchInput, per_page: 10, _embed: true };
			const store = select( 'core' );
			return {
				searchResults:
					store.getEntityRecords( 'postType', 'post', query ) || [],
				isSearching: store.isResolving( 'getEntityRecords', [
					'postType',
					'post',
					query,
				] ),
			};
		},
		[ searchInput ]
	);

	const { post, media, isLoading } = useSelect(
		( select ) => {
			if ( ! postId ) {
				return { post: null, media: null, isLoading: false };
			}
			const store = select( 'core' );
			const p = store.getEntityRecord( 'postType', 'post', postId, {
				_embed: true,
			} );
			let m = null;
			if ( p?.featured_media ) {
				m = store.getMedia( p.featured_media );
			}
			return {
				post: p,
				media: m,
				isLoading: ! p,
			};
		},
		[ postId ]
	);

	const searchOptions = useMemo(
		() =>
			searchResults.map( ( result ) => ( {
				value: result.id,
				label: decodeEntities( result.title.rendered ),
			} ) ),
		[ searchResults ]
	);

	const blockProps = useBlockProps( {
		className: elevateOnHover ? 'has-elevate-on-hover' : '',
	} );

	if ( ! postId ) {
		return (
			<div { ...blockProps }>
				<Placeholder
					icon="admin-post"
					label={ __( 'Post Card', 'wp-atlas' ) }
					instructions={ __(
						'Search for a post to display.',
						'wp-atlas'
					) }
					className="wp-block-wp-atlas-post-card__placeholder"
				>
					<ComboboxControl
						label={ __( 'Search posts', 'wp-atlas' ) }
						hideLabelFromVision
						value={ postId }
						options={ searchOptions }
						onFilterValueChange={ setSearchInput }
						onChange={ ( value ) =>
							setAttributes( { postId: value } )
						}
					/>
					{ isSearching && <Spinner /> }
				</Placeholder>
			</div>
		);
	}

	if ( isLoading ) {
		return (
			<div { ...blockProps }>
				<Placeholder>
					<Spinner />
				</Placeholder>
			</div>
		);
	}

	if ( ! post ) {
		return (
			<div { ...blockProps }>
				<Placeholder
					icon="warning"
					label={ __( 'Post not found', 'wp-atlas' ) }
					instructions={ __(
						'The selected post may have been deleted.',
						'wp-atlas'
					) }
				/>
			</div>
		);
	}

	return (
		<>
			<BlockControls group="block">
				<HeadingLevelDropdown
					value={ attributes.titleLevel }
					onChange={ ( value ) =>
						setAttributes( { titleLevel: value } )
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Post', 'wp-atlas' ) }>
					<ComboboxControl
						label={ __( 'Search posts', 'wp-atlas' ) }
						value={ postId }
						options={ searchOptions }
						onFilterValueChange={ setSearchInput }
						onChange={ ( value ) =>
							setAttributes( { postId: value } )
						}
					/>
					{ isSearching && <Spinner /> }
				</PanelBody>
				<PanelBody title={ __( 'Display', 'wp-atlas' ) }>
					<ToggleControl
						label={ __( 'Featured image', 'wp-atlas' ) }
						checked={ attributes.showFeaturedImage }
						onChange={ ( value ) =>
							setAttributes( { showFeaturedImage: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Excerpt', 'wp-atlas' ) }
						checked={ attributes.showExcerpt }
						onChange={ ( value ) =>
							setAttributes( { showExcerpt: value } )
						}
					/>
					{ attributes.showExcerpt && (
						<RangeControl
							label={ __( 'Excerpt length (words)', 'wp-atlas' ) }
							value={ attributes.excerptLength }
							onChange={ ( value ) =>
								setAttributes( { excerptLength: value } )
							}
							min={ 5 }
							max={ 100 }
						/>
					) }
					<ToggleControl
						label={ __( 'Date', 'wp-atlas' ) }
						checked={ attributes.showDate }
						onChange={ ( value ) =>
							setAttributes( { showDate: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Author', 'wp-atlas' ) }
						checked={ attributes.showAuthor }
						onChange={ ( value ) =>
							setAttributes( { showAuthor: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Category', 'wp-atlas' ) }
						checked={ attributes.showCategory }
						onChange={ ( value ) =>
							setAttributes( { showCategory: value } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Button', 'wp-atlas' ) }>
					<TextControl
						label={ __( 'Button text', 'wp-atlas' ) }
						value={ attributes.buttonText }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Effects', 'wp-atlas' ) }>
					<ToggleControl
						label={ __( 'Elevate on hover', 'wp-atlas' ) }
						checked={ elevateOnHover }
						onChange={ ( value ) =>
							setAttributes( { elevateOnHover: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<PostCardPreview
					post={ post }
					media={ media }
					attributes={ attributes }
				/>
			</div>
		</>
	);
}

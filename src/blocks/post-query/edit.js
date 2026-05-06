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
	SelectControl,
	FormTokenField,
	Placeholder,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import './editor.scss';

function PostCardPreview( { post, attributes } ) {
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
	const imageUrl = post._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ]?.source_url;
	const excerpt = post.excerpt?.rendered
		? decodeEntities( post.excerpt.rendered.replace( /<[^>]+>/g, '' ) )
		: '';
	const trimmedExcerpt =
		excerpt.split( /\s+/ ).slice( 0, excerptLength ).join( ' ' ) +
		( excerpt.split( /\s+/ ).length > excerptLength ? '…' : '' );

	return (
		<div
			className={ `wp-block-wp-atlas-post-card${
				attributes.elevateOnHover ? ' has-elevate-on-hover' : ''
			}` }
		>
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
		</div>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		postsToShow,
		categories: selectedCategoryIds,
		order,
		orderBy,
		columns,
		offset,
	} = attributes;

	const query = useMemo( () => {
		const q = {
			per_page: postsToShow,
			order,
			orderby: orderBy,
			offset,
			_embed: true,
		};
		if ( selectedCategoryIds.length > 0 ) {
			q.categories = selectedCategoryIds;
		}
		return q;
	}, [ postsToShow, selectedCategoryIds, order, orderBy, offset ] );

	const { posts, isLoading, allCategories } = useSelect(
		( select ) => {
			const store = select( 'core' );
			return {
				posts:
					store.getEntityRecords( 'postType', 'post', query ) || [],
				isLoading: store.isResolving( 'getEntityRecords', [
					'postType',
					'post',
					query,
				] ),
				allCategories:
					store.getEntityRecords( 'taxonomy', 'category', {
						per_page: -1,
					} ) || [],
			};
		},
		[ query ]
	);

	const categoryMap = useMemo( () => {
		const byName = {};
		const byId = {};
		allCategories.forEach( ( cat ) => {
			const name = decodeEntities( cat.name );
			byName[ name ] = cat.id;
			byId[ cat.id ] = name;
		} );
		return { byName, byId };
	}, [ allCategories ] );

	const categorySuggestions = useMemo(
		() => allCategories.map( ( cat ) => decodeEntities( cat.name ) ),
		[ allCategories ]
	);

	const selectedCategoryNames = useMemo(
		() =>
			selectedCategoryIds
				.map( ( id ) => categoryMap.byId[ id ] )
				.filter( Boolean ),
		[ selectedCategoryIds, categoryMap.byId ]
	);

	const blockProps = useBlockProps( {
		style: { '--wp-atlas-post-query-columns': columns },
	} );

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
				<PanelBody title={ __( 'Query', 'wp-atlas' ) }>
					<RangeControl
						label={ __( 'Number of posts', 'wp-atlas' ) }
						value={ postsToShow }
						onChange={ ( value ) =>
							setAttributes( { postsToShow: value } )
						}
						min={ 1 }
						max={ 24 }
					/>
					<RangeControl
						label={ __( 'Offset', 'wp-atlas' ) }
						value={ offset }
						onChange={ ( value ) =>
							setAttributes( { offset: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Order by', 'wp-atlas' ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Date', 'wp-atlas' ), value: 'date' },
							{
								label: __( 'Title', 'wp-atlas' ),
								value: 'title',
							},
							{
								label: __( 'Modified', 'wp-atlas' ),
								value: 'modified',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { orderBy: value } )
						}
					/>
					<SelectControl
						label={ __( 'Order', 'wp-atlas' ) }
						value={ order }
						options={ [
							{
								label: __( 'Descending', 'wp-atlas' ),
								value: 'desc',
							},
							{
								label: __( 'Ascending', 'wp-atlas' ),
								value: 'asc',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { order: value } )
						}
					/>
					<FormTokenField
						label={ __( 'Categories', 'wp-atlas' ) }
						value={ selectedCategoryNames }
						suggestions={ categorySuggestions }
						onChange={ ( tokens ) => {
							const ids = tokens
								.map( ( token ) => categoryMap.byName[ token ] )
								.filter( Boolean );
							setAttributes( { categories: ids } );
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Layout', 'wp-atlas' ) }>
					<RangeControl
						label={ __( 'Columns', 'wp-atlas' ) }
						value={ columns }
						onChange={ ( value ) =>
							setAttributes( { columns: value } )
						}
						min={ 1 }
						max={ 6 }
					/>
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
						checked={ attributes.elevateOnHover }
						onChange={ ( value ) =>
							setAttributes( { elevateOnHover: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ isLoading && (
					<div className="wp-block-wp-atlas-post-query__spinner">
						<Spinner />
					</div>
				) }
				{ ! isLoading && posts.length === 0 && (
					<Placeholder
						icon="grid-view"
						label={ __( 'Post Query', 'wp-atlas' ) }
						instructions={ __(
							'No posts found matching your query.',
							'wp-atlas'
						) }
						className="wp-block-wp-atlas-post-query__empty"
					/>
				) }
				{ ! isLoading &&
					posts.map( ( post ) => (
						<PostCardPreview
							key={ post.id }
							post={ post }
							attributes={ attributes }
						/>
					) ) }
			</div>
		</>
	);
}

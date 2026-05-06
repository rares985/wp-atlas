import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { heading, description, mediaUrl, mediaAlt, imagePosition, imageHeight, contentPadding, separatorColor, anchor, elevateOnHover } =
		attributes;

	const style = {};
	if ( contentPadding ) {
		style[ '--wp-atlas-pricing-list-padding' ] = `${ contentPadding }px`;
	}
	if ( separatorColor ) {
		style[ '--wp-atlas-pricing-list-separator-color' ] = separatorColor;
	}
	const blockProps = useBlockProps.save( {
		style: Object.keys( style ).length ? style : undefined,
		className: elevateOnHover ? 'has-elevate-on-hover' : '',
	} );

	const imageElement = mediaUrl ? (
		<img
			className="wp-block-wp-atlas-pricing-list__image"
			src={ mediaUrl }
			alt={ mediaAlt }
			style={ { height: `${ imageHeight }px` } }
		/>
	) : null;

	return (
		<div { ...blockProps }>
			{ imagePosition === 'before-title' && imageElement }
			{ heading && (
				<RichText.Content
					tagName="h3"
					className="wp-block-wp-atlas-pricing-list__heading"
					value={ heading }
					id={ anchor }
				/>
			) }
			{ imagePosition === 'after-title' && imageElement }
			{ description && (
				<RichText.Content
					tagName="p"
					className="wp-block-wp-atlas-pricing-list__description"
					value={ description }
				/>
			) }
			{ imagePosition === 'after-description' && imageElement }
			<div className="wp-block-wp-atlas-pricing-list__items">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

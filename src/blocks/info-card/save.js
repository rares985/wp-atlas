import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		mediaUrl,
		mediaAlt,
		contentAlign,
		titleLevel,
		title,
		text,
		buttonText,
		buttonUrl,
		buttonOpenInNewTab,
		elevateOnHover,
	} = attributes;

	const titleTag = `h${ titleLevel }`;

	return (
		<div { ...useBlockProps.save( {
			className: elevateOnHover
				? 'has-elevate-on-hover'
				: '',
		} ) }>
			{ mediaUrl && (
				<div className="wp-block-wp-atlas-info-card__image">
					<img src={ mediaUrl } alt={ mediaAlt } />
				</div>
			) }

			<div
				className="wp-block-wp-atlas-info-card__content"
				style={ { textAlign: contentAlign } }
			>
				<RichText.Content
					tagName={ titleTag }
					className="wp-block-wp-atlas-info-card__title"
					value={ title }
				/>
				<RichText.Content
					tagName="p"
					className="wp-block-wp-atlas-info-card__text"
					value={ text }
				/>
				{ buttonText && (
					<a
						className="wp-block-wp-atlas-info-card__button wp-element-button"
						href={ buttonUrl || '#' }
						{ ...( buttonOpenInNewTab
							? { target: '_blank', rel: 'noopener noreferrer' }
							: {} ) }
					>
						<RichText.Content value={ buttonText } />
					</a>
				) }
			</div>
		</div>
	);
}

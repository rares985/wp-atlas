import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		mediaUrl,
		mediaAlt,
		title,
		text,
		buttonText,
		buttonUrl,
		buttonOpenInNewTab,
	} = attributes;

	return (
		<div { ...useBlockProps.save() }>
			{ mediaUrl && (
				<div className="wp-block-wp-atlas-info-card__image">
					<img src={ mediaUrl } alt={ mediaAlt } />
				</div>
			) }

			<div className="wp-block-wp-atlas-info-card__content">
				<RichText.Content
					tagName="h3"
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
						className="wp-block-wp-atlas-info-card__button"
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

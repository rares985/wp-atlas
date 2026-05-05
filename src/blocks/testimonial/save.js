import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		mediaUrl,
		mediaAlt,
		clientName,
		clientRole,
		testimonialText,
		rating,
		contentAlign,
		elevateOnHover,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: elevateOnHover ? 'has-elevate-on-hover' : '',
	} );

	const stars = [];
	for ( let i = 1; i <= 5; i++ ) {
		stars.push(
			<span
				key={ i }
				className={ `wp-block-wp-atlas-testimonial__star ${
					i <= rating ? 'is-filled' : ''
				}` }
				aria-hidden="true"
			>
				{ i <= rating ? '★' : '☆' }
			</span>
		);
	}

	return (
		<div { ...blockProps }>
			<div className="wp-block-wp-atlas-testimonial__header">
				{ mediaUrl && (
					<img
						className="wp-block-wp-atlas-testimonial__avatar"
						src={ mediaUrl }
						alt={ mediaAlt }
					/>
				) }
				<div className="wp-block-wp-atlas-testimonial__client-info">
					<RichText.Content
						tagName="span"
						className="wp-block-wp-atlas-testimonial__name"
						value={ clientName }
					/>
					<RichText.Content
						tagName="span"
						className="wp-block-wp-atlas-testimonial__role"
						value={ clientRole }
					/>
				</div>
			</div>

			<div
				className="wp-block-wp-atlas-testimonial__content"
				style={ { textAlign: contentAlign } }
			>
				<RichText.Content
					tagName="p"
					className="wp-block-wp-atlas-testimonial__text"
					value={ testimonialText }
				/>
			</div>

			<div
				className="wp-block-wp-atlas-testimonial__rating"
				role="img"
				aria-label={ `${ rating } out of 5 stars` }
			>
				{ stars }
			</div>
		</div>
	);
}

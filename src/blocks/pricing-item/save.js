import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, description, price } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="span"
				className="wp-block-wp-atlas-pricing-item__price"
				value={ price }
			/>
			<RichText.Content
				tagName="h3"
				className="wp-block-wp-atlas-pricing-item__title"
				value={ title }
			/>
			<RichText.Content
				tagName="p"
				className="wp-block-wp-atlas-pricing-item__description"
				value={ description }
			/>
		</div>
	);
}

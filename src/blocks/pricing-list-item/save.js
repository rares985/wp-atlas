import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { service, price, description } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div className="wp-block-wp-atlas-pricing-list-item__row">
				<RichText.Content
					tagName="span"
					className="wp-block-wp-atlas-pricing-list-item__service"
					value={ service }
				/>
				<span className="wp-block-wp-atlas-pricing-list-item__separator" />
				<RichText.Content
					tagName="span"
					className="wp-block-wp-atlas-pricing-list-item__price"
					value={ price }
				/>
			</div>
			{ description && (
				<RichText.Content
					tagName="p"
					className="wp-block-wp-atlas-pricing-list-item__description"
					value={ description }
				/>
			) }
		</div>
	);
}

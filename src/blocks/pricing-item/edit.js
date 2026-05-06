import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title, description, price } = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<RichText
				tagName="span"
				className="wp-block-wp-atlas-pricing-item__price"
				value={ price }
				onChange={ ( value ) => setAttributes( { price: value } ) }
				placeholder={ __( '$0' ) }
				allowedFormats={ [] }
			/>
			<RichText
				tagName="h3"
				className="wp-block-wp-atlas-pricing-item__title"
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				placeholder={ __( 'Plan name…' ) }
				allowedFormats={ [] }
			/>
			<RichText
				tagName="p"
				className="wp-block-wp-atlas-pricing-item__description"
				value={ description }
				onChange={ ( value ) =>
					setAttributes( { description: value } )
				}
				placeholder={ __( 'Plan description…' ) }
			/>
		</div>
	);
}

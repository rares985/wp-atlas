import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { service, price, description } = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<div className="wp-block-wp-atlas-pricing-list-item__row">
				<RichText
					tagName="span"
					className="wp-block-wp-atlas-pricing-list-item__service"
					value={ service }
					onChange={ ( value ) =>
						setAttributes( { service: value } )
					}
					placeholder={ __( 'Service name…' ) }
					allowedFormats={ [] }
				/>
				<span className="wp-block-wp-atlas-pricing-list-item__separator" />
				<RichText
					tagName="span"
					className="wp-block-wp-atlas-pricing-list-item__price"
					value={ price }
					onChange={ ( value ) =>
						setAttributes( { price: value } )
					}
					placeholder={ __( '$0' ) }
					allowedFormats={ [] }
				/>
			</div>
			<RichText
				tagName="p"
				className="wp-block-wp-atlas-pricing-list-item__description"
				value={ description }
				onChange={ ( value ) =>
					setAttributes( { description: value } )
				}
				placeholder={ __( 'Optional details…' ) }
			/>
		</div>
	);
}

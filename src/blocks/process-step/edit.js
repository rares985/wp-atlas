import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title, description } = attributes;
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<div className="wp-block-wp-atlas-process-step__content">
				<RichText
					tagName="h4"
					className="wp-block-wp-atlas-process-step__title"
					value={ title }
					onChange={ ( value ) =>
						setAttributes( { title: value } )
					}
					placeholder={ __( 'Step title…' ) }
					allowedFormats={ [] }
				/>
				<RichText
					tagName="p"
					className="wp-block-wp-atlas-process-step__description"
					value={ description }
					onChange={ ( value ) =>
						setAttributes( { description: value } )
					}
					placeholder={ __( 'Step description…' ) }
				/>
			</div>
		</div>
	);
}

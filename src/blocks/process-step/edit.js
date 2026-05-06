import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( { attributes, setAttributes, context } ) {
	const { title, description } = attributes;
	const headingLevel = context[ 'wp-atlas/headingLevel' ] || 4;
	const TagName = `h${ headingLevel }`;

	useEffect( () => {
		if ( attributes.headingLevel !== headingLevel ) {
			setAttributes( { headingLevel } );
		}
	}, [ headingLevel ] );
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<div className="wp-block-wp-atlas-process-step__content">
				<RichText
					tagName={ TagName }
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

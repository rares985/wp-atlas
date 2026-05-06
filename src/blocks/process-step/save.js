import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { headingLevel, title, description } = attributes;
	const TagName = `h${ headingLevel || 4 }`;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div className="wp-block-wp-atlas-process-step__content">
				<RichText.Content
					tagName={ TagName }
					className="wp-block-wp-atlas-process-step__title"
					value={ title }
				/>
				<RichText.Content
					tagName="p"
					className="wp-block-wp-atlas-process-step__description"
					value={ description }
				/>
			</div>
		</div>
	);
}

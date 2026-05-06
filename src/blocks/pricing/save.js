import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { columns, accentColor } = attributes;

	const style = {
		'--wp-atlas-pricing-columns': columns,
		'--wp-atlas-pricing-accent-color': accentColor,
	};

	const blockProps = useBlockProps.save( { style } );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}

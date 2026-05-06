import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { circleColor, circleTextColor, lineColor } = attributes;

	const style = {
		'--wp-atlas-process-circle-color': circleColor,
		'--wp-atlas-process-circle-text-color': circleTextColor,
		'--wp-atlas-process-line-color': lineColor,
	};

	const blockProps = useBlockProps.save( { style } );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}

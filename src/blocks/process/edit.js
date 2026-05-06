import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';

import './editor.scss';

const TEMPLATE = [
	[ 'wp-atlas/process-step', { title: __( 'Step one' ), description: __( 'Describe this step.' ) } ],
	[ 'wp-atlas/process-step', { title: __( 'Step two' ), description: __( 'Describe this step.' ) } ],
	[ 'wp-atlas/process-step', { title: __( 'Step three' ), description: __( 'Describe this step.' ) } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const { circleColor, circleTextColor, lineColor } = attributes;

	const style = {
		'--wp-atlas-process-circle-color': circleColor,
		'--wp-atlas-process-circle-text-color': circleTextColor,
		'--wp-atlas-process-line-color': lineColor,
	};

	const blockProps = useBlockProps( { style } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'wp-atlas/process-step' ],
		template: TEMPLATE,
		orientation: 'vertical',
	} );

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Timeline colors' ) }
					colorSettings={ [
						{
							value: circleColor,
							onChange: ( value ) =>
								setAttributes( { circleColor: value } ),
							label: __( 'Circle' ),
						},
						{
							value: circleTextColor,
							onChange: ( value ) =>
								setAttributes( {
									circleTextColor: value,
								} ),
							label: __( 'Circle text' ),
						},
						{
							value: lineColor,
							onChange: ( value ) =>
								setAttributes( { lineColor: value } ),
							label: __( 'Line' ),
						},
					] }
				/>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
} from '@wordpress/components';

import './editor.scss';

const TEMPLATE = [
	[ 'wp-atlas/process-step', { title: __( 'Step one' ), description: __( 'Describe this step.' ) } ],
	[ 'wp-atlas/process-step', { title: __( 'Step two' ), description: __( 'Describe this step.' ) } ],
	[ 'wp-atlas/process-step', { title: __( 'Step three' ), description: __( 'Describe this step.' ) } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const { headingLevel, circleColor, circleTextColor, lineColor } = attributes;

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
				<PanelBody title={ __( 'Step title' ) }>
					<SelectControl
						label={ __( 'Heading level' ) }
						value={ headingLevel }
						options={ [
							{ label: __( 'H2' ), value: 2 },
							{ label: __( 'H3' ), value: 3 },
							{ label: __( 'H4' ), value: 4 },
							{ label: __( 'H5' ), value: 5 },
							{ label: __( 'H6' ), value: 6 },
						] }
						onChange={ ( value ) =>
							setAttributes( {
								headingLevel: Number( value ),
							} )
						}
					/>
				</PanelBody>
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

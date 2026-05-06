import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
} from '@wordpress/components';

import './editor.scss';

const TEMPLATE = [
	[ 'wp-atlas/pricing-item', { title: __( 'Basic' ), description: __( 'Great for individuals.' ), price: __( '$9' ) } ],
	[ 'wp-atlas/pricing-item', { title: __( 'Pro' ), description: __( 'Best for small teams.' ), price: __( '$29' ) } ],
	[ 'wp-atlas/pricing-item', { title: __( 'Enterprise' ), description: __( 'For large organizations.' ), price: __( '$99' ) } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const { columns, accentColor } = attributes;

	const style = {
		'--wp-atlas-pricing-columns': columns,
		'--wp-atlas-pricing-accent-color': accentColor,
	};

	const blockProps = useBlockProps( { style } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'wp-atlas/pricing-item' ],
		template: TEMPLATE,
		orientation: 'horizontal',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout' ) }>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ columns }
						onChange={ ( value ) =>
							setAttributes( { columns: value } )
						}
						min={ 1 }
						max={ 6 }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Pricing colors' ) }
					colorSettings={ [
						{
							value: accentColor,
							onChange: ( value ) =>
								setAttributes( { accentColor: value } ),
							label: __( 'Accent' ),
						},
					] }
				/>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}

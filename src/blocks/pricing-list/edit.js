import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	RangeControl,
} from '@wordpress/components';

import './editor.scss';

const TEMPLATE = [
	[ 'wp-atlas/pricing-list-item', { service: __( 'General consultation' ), price: __( '$50' ) } ],
	[ 'wp-atlas/pricing-list-item', { service: __( 'Vaccination' ), price: __( '$30' ) } ],
	[ 'wp-atlas/pricing-list-item', { service: __( 'Dental cleaning' ), price: __( '$120' ) } ],
];

const IMAGE_POSITION_OPTIONS = [
	{ label: __( 'Before title' ), value: 'before-title' },
	{ label: __( 'Between title and description' ), value: 'after-title' },
	{ label: __( 'Between description and list' ), value: 'after-description' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { heading, description, mediaId, mediaUrl, mediaAlt, imagePosition, imageHeight, contentPadding, separatorColor, anchor } =
		attributes;

	const style = {};
	if ( contentPadding ) {
		style[ '--wp-atlas-pricing-list-padding' ] = `${ contentPadding }px`;
	}
	if ( separatorColor ) {
		style[ '--wp-atlas-pricing-list-separator-color' ] = separatorColor;
	}
	const blockProps = useBlockProps( {
		style: Object.keys( style ).length ? style : undefined,
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-wp-atlas-pricing-list__items' },
		{
			allowedBlocks: [ 'wp-atlas/pricing-list-item' ],
			template: TEMPLATE,
			orientation: 'vertical',
		}
	);

	const onSelectMedia = ( media ) => {
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url,
			mediaAlt: media.alt,
		} );
	};

	const onRemoveMedia = () => {
		setAttributes( {
			mediaId: undefined,
			mediaUrl: '',
			mediaAlt: '',
		} );
	};

	const imageElement = (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ onSelectMedia }
				allowedTypes={ [ 'image' ] }
				value={ mediaId }
				render={ ( { open } ) => (
					<div className="wp-block-wp-atlas-pricing-list__image-wrapper">
						{ mediaUrl ? (
							<>
								<img
									className="wp-block-wp-atlas-pricing-list__image"
									src={ mediaUrl }
									alt={ mediaAlt }
									style={ { height: `${ imageHeight }px` } }
									onClick={ open }
								/>
								<Button
									className="wp-block-wp-atlas-pricing-list__image-remove"
									onClick={ onRemoveMedia }
									variant="secondary"
									size="small"
								>
									{ __( '×' ) }
								</Button>
							</>
						) : (
							<Button
								className="wp-block-wp-atlas-pricing-list__image-upload"
								onClick={ open }
								variant="secondary"
							>
								{ __( 'Add image' ) }
							</Button>
						) }
					</div>
				) }
			/>
		</MediaUploadCheck>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout' ) }>
					<RangeControl
						label={ __( 'Content padding' ) }
						value={ contentPadding }
						onChange={ ( value ) =>
							setAttributes( { contentPadding: value } )
						}
						min={ 0 }
						max={ 60 }
						step={ 4 }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'List colors' ) }
					colorSettings={ [
						{
							value: separatorColor,
							onChange: ( value ) =>
								setAttributes( { separatorColor: value } ),
							label: __( 'Separator dots' ),
						},
					] }
				/>
				<PanelBody title={ __( 'Image' ) }>
					<SelectControl
						label={ __( 'Image position' ) }
						value={ imagePosition }
						options={ IMAGE_POSITION_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { imagePosition: value } )
						}
					/>
					<RangeControl
						label={ __( 'Image height' ) }
						value={ imageHeight }
						onChange={ ( value ) =>
							setAttributes( { imageHeight: value } )
						}
						min={ 80 }
						max={ 600 }
						step={ 10 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ imagePosition === 'before-title' && imageElement }
				<RichText
					tagName="h3"
					className="wp-block-wp-atlas-pricing-list__heading"
					value={ heading }
					onChange={ ( value ) =>
						setAttributes( { heading: value } )
					}
					placeholder={ __( 'Category heading…' ) }
					allowedFormats={ [] }
					id={ anchor }
				/>
				{ imagePosition === 'after-title' && imageElement }
				<RichText
					tagName="p"
					className="wp-block-wp-atlas-pricing-list__description"
					value={ description }
					onChange={ ( value ) =>
						setAttributes( { description: value } )
					}
					placeholder={ __( 'Category description…' ) }
				/>
				{ imagePosition === 'after-description' && imageElement }
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

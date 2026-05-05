import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	InspectorControls,
	HeadingLevelDropdown,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		mediaId,
		mediaUrl,
		mediaAlt,
		contentAlign,
		titleLevel,
		title,
		text,
		buttonText,
		buttonUrl,
		buttonOpenInNewTab,
	} = attributes;

	const titleTag = `h${ titleLevel }`;

	const onSelectMedia = ( media ) => {
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url,
			mediaAlt: media.alt || '',
		} );
	};

	const onRemoveMedia = () => {
		setAttributes( {
			mediaId: undefined,
			mediaUrl: undefined,
			mediaAlt: '',
		} );
	};

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					label={ __( 'Align content', 'wp-atlas' ) }
					value={ contentAlign }
					onChange={ ( value ) =>
						setAttributes( { contentAlign: value } )
					}
				/>
				<HeadingLevelDropdown
					value={ titleLevel }
					onChange={ ( value ) =>
						setAttributes( { titleLevel: value } )
					}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Button Settings', 'wp-atlas' ) }>
					<TextControl
						label={ __( 'Button URL', 'wp-atlas' ) }
						value={ buttonUrl }
						onChange={ ( value ) =>
							setAttributes( { buttonUrl: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'wp-atlas' ) }
						checked={ buttonOpenInNewTab }
						onChange={ ( value ) =>
							setAttributes( { buttonOpenInNewTab: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<div className="wp-block-wp-atlas-info-card__image">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectMedia }
							allowedTypes={ [ 'image' ] }
							value={ mediaId }
							render={ ( { open } ) =>
								mediaUrl ? (
									<div className="wp-block-wp-atlas-info-card__image-wrapper">
										<img
											src={ mediaUrl }
											alt={ mediaAlt }
											onClick={ open }
										/>
										<Button
											className="wp-block-wp-atlas-info-card__image-remove"
											onClick={ onRemoveMedia }
											variant="secondary"
											isSmall
											isDestructive
										>
											{ __( 'Remove', 'wp-atlas' ) }
										</Button>
									</div>
								) : (
									<Button
										className="wp-block-wp-atlas-info-card__image-upload"
										onClick={ open }
										variant="secondary"
									>
										{ __( 'Select Image', 'wp-atlas' ) }
									</Button>
								)
							}
						/>
					</MediaUploadCheck>
				</div>

				<div
					className="wp-block-wp-atlas-info-card__content"
					style={ { textAlign: contentAlign } }
				>
					<RichText
						tagName={ titleTag }
						className="wp-block-wp-atlas-info-card__title"
						placeholder={ __( 'Card title…', 'wp-atlas' ) }
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
					/>
					<RichText
						tagName="p"
						className="wp-block-wp-atlas-info-card__text"
						placeholder={ __(
							'Card description…',
							'wp-atlas'
						) }
						value={ text }
						onChange={ ( value ) =>
							setAttributes( { text: value } )
						}
					/>
					<RichText
						tagName="span"
						className="wp-block-wp-atlas-info-card__button wp-element-button"
						placeholder={ __( 'Button text…', 'wp-atlas' ) }
						value={ buttonText }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
						allowedFormats={ [] }
					/>
				</div>
			</div>
		</>
	);
}
